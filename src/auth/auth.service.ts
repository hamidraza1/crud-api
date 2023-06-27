import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositiory: Repository<User>,
  ) {}

  public signup(authDto: AuthDto): Promise<User> {
    // newUser is a kind of object, that ready to be saved
    const newUser = this.userRepositiory.create(authDto);
    return this.userRepositiory.save(newUser);
  }
}
