<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Sample NestJS e_commerce service using TypeORM + MySQL.

Note: DB configuration should be updated in both `main.ts` and `app.module.ts`. See below for reference.


`main.ts`
```bash
const datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rootadmin',
    database: 'e_commerce',
    entities: [PickingSlips, PickingSlipItems, PickingSlipDates],
    logging: false,
    multipleStatements: true,
  });
```
`app.module.ts`
```bash
imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootadmin',
      database: 'e_commerce',
      entities: [PickingSlips, PickingSlipItems, PickingSlipDates],
      logging: false,
      multipleStatements: true,
    }),
    PickingSlipModule,
  ]
```

Sample data is automatically seeded to the database based on the generated sql files in `/seed` directory.

_Note: values in `/seed` directory was generated from sample data given. Bad data are ignored during insertion._

When successfully seeded, console will output the following:

```bash
[4:32:59 PM] Found 0 errors. Watching for file changes.

MYSQL Version: RowDataPacket { 'VERSION()': '8.3.0' }

PickingSlipItems record count: 5206

PickingSlips record count: 2597

PickingSlipDates record count: 2853

========== Initialization Done ==========
```


## Installation



* Install dependencies with: 
```bash
$ npm install
```
* Next create an empty schema in your local MySQL DB named `e_commerce` and you're good to go! Make sure to specify correct root credentials.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Specs

```
GET /picking-slip?
```
| Parameter | Data Type | Values | Description |
| --- | --- | --- | --- |
| status | comma-delimited string | printed, not printed, held | filter by picking slip status |
| hasPreOrder | boolean string | |  filter picking slips with pre_order items
| page | number | | page count (offsets the results) |
| perPage | number | | record count per page |
| order | string | asc, desc | sort order |
| orderBy | string | id, created_at | reference property for sorting |
| startDate | date string | YYYY-MM-DD HH:MM:SS | time range start (if passed without endDate, will fetch all records after the value) |
| endDate | date string | YYYY-MM-DD HH:MM:SS | time range end (if passed without startDate, will fetch all records before the value)|

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
