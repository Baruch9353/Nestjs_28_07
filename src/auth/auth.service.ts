import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  // Registers a new user with hashed password
  async register(registerDto: RegisterDto) {
    const existingUser = this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const newUser = this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user: newUser,
    };
  }

  // Logs in a user by verifying credentials and returns JWT token
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = this.usersService.findByUsername(username);

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user);

    return {
      access_token: token,
    };
  }

  // Generates a JWT token for the authenticated user
  private async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload);
  }
}
