import { PickingSlipsDto } from "../../picking-slip/dto/picking-slips.dto";

export const mapPickingSlipsToResponse = (raw: any, entity: any): PickingSlipsDto => {
  const { order_id, id, count_of_pre_order_items } = entity;
  const { picking_slip_status } = raw;

  return {
    order_id,
    picking_slip_id: id,
    picking_slip_status,
    has_pre_order_item: count_of_pre_order_items >= 1,
  };
};
