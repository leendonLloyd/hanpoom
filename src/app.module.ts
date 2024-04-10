import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PickingSlipDates } from './order/models/picking-slip-dates.model';
import { PickingSlipItems } from './order/models/picking-slip-items.model';
import { PickingSlips } from './order/models/picking-slips.model';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootadmin',
      database: 'e_commerce',
      entities: [PickingSlips, PickingSlipItems, PickingSlipDates],
      // synchronize: true,
      logging: false,
      multipleStatements: true,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
