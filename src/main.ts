import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './config/config.provider';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

const PORT = config.getNumber('SERVER_PORT');
const LOGGING_LEVEL = config.get('SERVER_LOGGING-LEVEL');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações de Logging
  app.use(morgan(LOGGING_LEVEL, { skip: (req) => req.url === '/health' }));

  // Configurações de Segurança
  app.use(helmet.hidePoweredBy());
  app.use(helmet.ieNoOpen());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  // Validação Global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Shutdown Hooks
  app.enableShutdownHooks();

  // Iniciar servidor
  await app.listen(PORT);
  
  console.log(`Servidor rodando na porta: ${PORT}`);
}

bootstrap().catch(console.error);