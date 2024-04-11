import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderByEnum, OrderEnum } from "../enum/paginate.enum";
export class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage: number;

  @IsString()
  @IsOptional()
  searchKey: string;

  @IsOptional()
  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum = OrderByEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(OrderEnum)
  order: OrderEnum = OrderEnum.DESC;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;
}
