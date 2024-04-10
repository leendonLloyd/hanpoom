import { PickingSlipsDto } from '../../order/dto/picking-slips.dto';

export const mapPickingSlipsToResponse = (
  pickingSlips: any,
): PickingSlipsDto => {
  const { order_id, id, picking_slip_status, count_of_pre_order_items } =
    pickingSlips;

  return {
    order_id,
    picking_slip_id: id,
    picking_slip_status,
    has_pre_order_item: count_of_pre_order_items >= 1,
  };
};
