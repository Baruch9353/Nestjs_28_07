import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}
bootstrap();
