import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){
    }
    
    // Handles user registration
    @Post('register')
    async register(@Body() body: RegisterDto){
        return this.authService.register(body);
    }

    // Handles user login and returns JWT
    @Post('login')
    async login(@Body() body: LoginDto){
        return this.authService.login(body)
    }
}
