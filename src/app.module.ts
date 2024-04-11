import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PickingSlipDates } from "./picking-slip/models/picking-slip-dates.model";
import { PickingSlipItems } from "./picking-slip/models/picking-slip-items.model";
import { PickingSlips } from "./picking-slip/models/picking-slips.model";
import { PickingSlipModule } from "./picking-slip/picking-slip.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [PickingSlips, PickingSlipItems, PickingSlipDates],
        logging: true,
        multipleStatements: true,
      }),
      inject: [ConfigService],
    }),
    PickingSlipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
