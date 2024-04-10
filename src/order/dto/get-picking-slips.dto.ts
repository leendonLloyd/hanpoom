import { BadRequestException } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { PaginateDto } from "../../common/dto/paginate.dto";
import { PickingSlipStatusEnum } from "../enum/picking-slips.enum";

export class GetPickingSlipsDto extends PaginateDto {
  @IsOptional()
  @Type(() => String)
  @Transform((value) => {
    if (value != null) {
      const acceptedValues = Object.values(PickingSlipStatusEnum);
      const values = value.value.toString().split(",");

      for (const val of values) {
        if (!acceptedValues.includes(val)) {
          throw new BadRequestException([
            { message: `Invalid enum value for ${value.key}: ${val}`, enums: acceptedValues.join(", ") },
          ]);
        }
      }

      return values;
    }
  })
  status?: PickingSlipStatusEnum[];

  @IsOptional()
  @Type(() => String)
  @Transform((value) => {
    if (value != null) {
      console.log('~', value);
      
      const values = value.value.toString().split(",");

      for (const val of values) {
        if (!["true", "false"].includes(val)) {
          throw new BadRequestException([{ message: `Invalid boolean value for ${value.key}: ${val}` }]);
        }
      }

      return values;
    }
  })
  isPreOrder?: boolean = true;
}
