import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  register(registerDto: RegisterDto) {
    const existingUser = this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
        throw new UnauthorizedException('Username already exists');
    }
    const newUser = this.usersService.addUser(registerDto);
    return {
        message: 'User registered successfully',
        user: newUser,
    };
  }


  login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = this.usersService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);

    return {
      access_token: token,
    };
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
