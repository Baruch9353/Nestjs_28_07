import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';

// Represents a user in memory
export type User = {
  id: number;
  username: string;
  password: string;
  role: 'soldier' | 'commander';
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'bar',
      password: '12',
      role: 'commander',
    },
    {
      id: 2,
      username: 'avi',
      password: 'ab',
      role: 'soldier',
    },
  ];
  
  // Finds a user by their username
  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  // Adds a new user to the array
  create(dto: RegisterDto) {
    const newUser = {
        id: this.users.length + 1,
        username: dto.username,
        password: dto.password,
        role: dto.role,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Returns all users 
  findAll(): User[] {
     return this.users;
  }

  // Finds a user by their ID
  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
