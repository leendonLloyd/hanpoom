import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { mapPickingSlipsToResponse } from "../common/utils/mapper";
import { GetPickingSlipsResponseDto } from "./dto/get-picking-slips-response.dto";
import { GetPickingSlipsDto } from "./dto/get-picking-slips.dto";
import { PickingSlipStatusEnum } from "./enum/picking-slips.enum";
import { PickingSlips } from "./models/picking-slips.model";

@Injectable()
export class PickingSlipService {
  constructor(
    @InjectRepository(PickingSlips)
    private readonly pickingSlipsRepo: Repository<PickingSlips>
  ) {}

  async getPickingSlips(dto: GetPickingSlipsDto): Promise<GetPickingSlipsResponseDto> {
    const { status, hasPreOrder, page, perPage, order, orderBy, startDate, endDate } = dto;

    const queryBuilder = this.pickingSlipsRepo
      .createQueryBuilder("slips")
      .addSelect(
        `CASE WHEN (date.printed_at IS NULL AND date.inspected_at IS NULL AND date.shipped_at IS NULL AND date.held_at IS NULL) THEN 'not printed' ` +
          `WHEN (date.printed_at IS NOT NULL AND date.inspected_at IS NULL AND date.shipped_at IS NULL AND date.held_at IS NULL) THEN 'printed' ` +
          `WHEN (date.held_at IS NOT NULL) THEN 'held' ` +
          `ELSE NULL ` +
          `END`,
        "picking_slip_status"
      )
      .leftJoinAndSelect("slips.picking_slip_dates", "date")
      .innerJoinAndSelect("slips.picking_slip_items", "item")
      .loadRelationCountAndMap("slips.count_of_pre_order_items", "slips.picking_slip_items", "item")
      .where("item.is_pre_order = :isPreOrder", { isPreOrder: hasPreOrder ? 1 : 0 });

    if (startDate && endDate) {
      queryBuilder
        .andWhere("slips.created_at >= :startDate", { startDate })
        .andWhere("slips.created_at <= :endDate", { endDate });
    } else if (startDate) {
      queryBuilder.where("slips.created_at >= :startDate", { startDate });
    } else if (endDate) {
      queryBuilder.where("slips.created_at <= :endDate", { endDate });
    }

    if (perPage) {
      queryBuilder.limit(perPage);
      if (page) {
        queryBuilder.offset((page - 1) * perPage);
      }
    }

    const res = await queryBuilder.orderBy(`slips.${orderBy}`, order).getRawAndEntities();

    const statuses = status ?? Object.values(PickingSlipStatusEnum);
    const finalData = res?.raw.filter((slip) => statuses.includes(slip?.picking_slip_status));

    return {
      pickingSlips: finalData.map((pickingSlips, index) => mapPickingSlipsToResponse(pickingSlips, res.entities[index])),
      count: finalData.length,
    };
  }
}
