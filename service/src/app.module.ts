import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./ormConfig";
import { CarDetailResolver } from "./resolver/CarDetailResolver";
import { CarResolver } from "./resolver/CarResolver";
import { ConsumptionResolver } from "./resolver/ConsumptionResolver";
import { YieldResolver } from "./resolver/YieldResolver";
import { GenreResolver } from "./resolver/GenreResolver";
import { BookResolver } from "./resolver/BookResolver";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: "schema.gql",
    }),
  ],
  providers: [
    CarDetailResolver,
    CarResolver,
    ConsumptionResolver,
    YieldResolver,
    GenreResolver,
    BookResolver,
  ],
})
export class AppModule {}
