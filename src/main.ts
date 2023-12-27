import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // it will contain array of string anything we want
  // this stirng is going to use to encrypt the information that is stored inside the cookie
  // the purpose is that, we can take some information, store in a cookie, and retrieve that information in a later followup request
  // used as @Session decorator in user.controller.ts
  app.use(cookieSession({ keys: ['some random'] }));

  //ValidationPipe are global-scoped, so that it is applied to every route handler across the entire application.
  //whitelist: true will stripout the key:value from client if thats not defined in dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
