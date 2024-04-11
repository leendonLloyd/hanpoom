import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PickingSlipDates } from './picking-slip/models/picking-slip-dates.model';
import { PickingSlipItems } from './picking-slip/models/picking-slip-items.model';
import { PickingSlips } from './picking-slip/models/picking-slips.model';
import { PickingSlipModule } from './picking-slip/picking-slip.module';

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
      logging: true,
      multipleStatements: true
    }),
    PickingSlipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
