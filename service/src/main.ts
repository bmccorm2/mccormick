import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import cors from "@fastify/cors";
import "dotenv/config";

(async () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: process.env.FASTIFY_LOGGER === "true" })
  );
  app.register(cors, { origin: process.env.CORS?.split("|") });

  await app.listen(process.env.PORT, "0.0.0.0");
  console.log(`Server is running on: ${await app.getUrl()}/graphiql`);
})();
