import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { readFileSync } from "fs";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exception-filter";
import { PickingSlipDates } from "./picking-slip/models/picking-slip-dates.model";
import { PickingSlipItems } from "./picking-slip/models/picking-slip-items.model";
import { PickingSlips } from "./picking-slip/models/picking-slips.model";

async function bootstrap() {
  const datasource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [PickingSlips, PickingSlipItems, PickingSlipDates],
    logging: false,
    multipleStatements: true,
  });

  datasource
    .initialize()
    .then(async (res) => {
      console.log("MYSQL Version:", (await res.query("SELECT VERSION()"))[0]);

      //create tables
      const createTableQuery = readFileSync("./queries/create_table.sql");
      await res.query(createTableQuery.toString());

      // seed sample data to db for each entity model
      for (const entity of res.entityMetadatas) {
        const repo = res.getRepository(entity.target);

        const count = await repo.count();

        console.log(`\n${entity.targetName} record count:`, count);
        if (count === 0) {
          let query: Buffer;
          switch (entity.targetName) {
            case PickingSlips.name:
              query = readFileSync("./seed/insert_hanpoom_picking_slips.sql");
              break;
            case PickingSlipDates.name:
              query = readFileSync("./seed/insert_hanpoom_picking_slip_dates.sql");
              break;
            case PickingSlipItems.name:
              query = readFileSync("./seed/insert_hanpoom_picking_slip_items.sql");
              break;
          }

          try {
            console.log("\nSeeding sample data for:", entity.targetName);
            query ? await res.query(query.toString()) : null;
            console.log(`Added records:`, await repo.count());
          } catch (error) {
            console.log("Query Error:", error);
          }
        }
      }
    })
    .then(() => {
      console.log("\n========== Initialization Done ==========\n");
    })
    .catch((err) => {
      console.log("ERR:", err);
    });

  const app = await NestFactory.create(AppModule, {
    logger: ["verbose", "error", "warn", "debug"],
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3001);
}
bootstrap();
