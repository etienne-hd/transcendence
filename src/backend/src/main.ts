import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as fs from 'node:fs';

async function bootstrap() {
  //const httpsOptions = {
  //  key: fs.readFileSync('./secrets/private-key.pem'),
  //  cert: fs.readFileSync('./secrets/public-certificate.pem'),
  //};

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    //httpsOptions,
  });

  app.enableCors({
    origin: ['http://localhost:5173', 'https://unicord.fr'],
    exposedHeaders: ['Content-Length'],
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
