import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { PickingSlipStatusEnum } from '../enum/picking-slips.enum';

export class GetPickingSlipsDto extends PaginateDto {
  @IsOptional()
  @Type(() => String)
  @Transform((value) => {
    if (value != null) {
      return value.value.toString().split(',');
    }
  })
  status?: PickingSlipStatusEnum[];

  @IsOptional()
  @Type(() => String)
  @Transform((value) => {
    if (value != null) {
      return value.value.toString() === 'true';
    }
  })
  isPreOrder?: boolean = true;
}
