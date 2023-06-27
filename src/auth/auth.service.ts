import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as argon from 'argon2';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositiory: Repository<User>,
  ) {}

  public async signup(authDto: AuthDto): Promise<User> {
    const hashedPassword = await argon.hash(authDto.password);
    // newUser is a kind of object, that ready to be saved
    const newUser = this.userRepositiory.create({
      ...authDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepositiory.save(newUser);
    return instanceToPlain(savedUser) as User;
  }
}
