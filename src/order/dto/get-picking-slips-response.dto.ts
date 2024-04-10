import { PickingSlipsDto } from './picking-slips.dto';

export class GetPickingSlipsResponseDto {
  pickingSlips: PickingSlipsDto[];

  count: number;
}
