import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;

  const origins = process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3001', 'http://localhost:3002' , 'https://cisc474-codecollab.momocsgo2003.workers.dev'];
    
  app.enableCors(
    {
    origin: ['http://localhost:3001', 'http://localhost:3002' , 'https://cisc474-codecollab.momocsgo2003.workers.dev'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    }
  )
  await app.listen(port, host);
}

void bootstrap();
