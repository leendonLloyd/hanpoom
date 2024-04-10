import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { mapPickingSlipsToResponse } from '../common/utils/mapper';
import { populate } from '../common/utils/utils';
import { GetPickingSlipsResponseDto } from './dto/get-picking-slips-response.dto';
import { GetPickingSlipsDto } from './dto/get-picking-slips.dto';
import { PickingSlipStatusEnum } from './enum/picking-slips.enum';
import { PickingSlips } from './models/picking-slips.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(PickingSlips)
    private readonly pickingSlipsRepo: Repository<PickingSlips>,
  ) {}
  async getPickingSlips(
    dto: GetPickingSlipsDto,
  ): Promise<GetPickingSlipsResponseDto> {
    const {
      status,
      isPreOrder,
      page,
      perPage,
      order,
      orderBy,
      startDate,
      endDate,
    } = dto;
    // not yet used to typeorm query builder so currently using raw query
    const query = readFileSync('./queries/get_query.sql');

    let whereStatement = `psi.is_pre_order = ${isPreOrder ? 1 : 0}`;

    // time ranges
    if (startDate && endDate) {
      whereStatement += ` AND ps.created_at >= '${startDate}' AND ps.created_at <= '${endDate}'`;
    } else if (startDate) {
      whereStatement += ` AND ps.created_at >= '${startDate}'`;
    } else if (endDate) {
      whereStatement += ` AND ps.created_at <= '${endDate}'`;
    }

    // get all non-null picking_slip_values if no filter specified
    const statuses = status ?? Object.values(PickingSlipStatusEnum);

    const finalQuery = populate(query.toString(), {
      whereStatement,
      status: statuses.map((x) => `'${x}'`).join(', '),
      page: page ?? 0,
      perPage: perPage ?? 3,
      order: order.toUpperCase(),
      orderBy,
    });

    const res = await this.pickingSlipsRepo.query(finalQuery);

    return {
      pickingSlips: res.map((pickingSlips) => mapPickingSlipsToResponse(pickingSlips)),
      count: res.length,
    };
  }
}
