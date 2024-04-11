import { Controller, Get, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ResponseDto } from "../common/response.dto";
import { GetPickingSlipsResponseDto } from "./dto/get-picking-slips-response.dto";
import { GetPickingSlipsDto } from "./dto/get-picking-slips.dto";
import { PickingSlipService } from "./picking-slip.service";

@Controller("picking-slip")
export class PickingSlipController {
  constructor(private readonly orderService: PickingSlipService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )
  async getPickingSlips(@Query() dto: GetPickingSlipsDto) {
    const data = await this.orderService.getPickingSlips(dto);
    return new ResponseDto<GetPickingSlipsResponseDto>("Successfully fetched picking slips", data);
  }
}
