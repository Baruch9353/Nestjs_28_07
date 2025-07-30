import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './common/guards/roles.guard';
import { Reflector } from '@nestjs/core';

// Bootstraps the main NestJS application
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable global validation for all incoming requests
    app.useGlobalPipes(new ValidationPipe());

    // Set global guard for roles-based access control
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new RolesGuard(reflector));

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

// Start the bootstrap process
bootstrap();
