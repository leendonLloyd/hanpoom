import { PickingSlipStatusEnum } from '../enum/picking-slips.enum';

export class PickingSlipsDto {
  order_id: number;
  picking_slip_id: number;
  picking_slip_status: PickingSlipStatusEnum;
  has_pre_order_item: boolean;
}
