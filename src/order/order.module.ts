import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlipDates } from './models/picking-slip-dates.model';
import { PickingSlipItems } from './models/picking-slip-items.model';
import { PickingSlips } from './models/picking-slips.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickingSlips,
      PickingSlipItems,
      PickingSlipDates,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
