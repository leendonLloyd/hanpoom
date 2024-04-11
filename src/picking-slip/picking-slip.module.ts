import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlipDates } from './models/picking-slip-dates.model';
import { PickingSlipItems } from './models/picking-slip-items.model';
import { PickingSlips } from './models/picking-slips.model';
import { PickingSlipController } from './picking-slip.controller';
import { PickingSlipService } from './picking-slip.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickingSlips,
      PickingSlipItems,
      PickingSlipDates,
    ]),
  ],
  controllers: [PickingSlipController],
  providers: [PickingSlipService],
})
export class PickingSlipModule {}
