import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as argon from 'argon2';
import { instanceToPlain } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositiory: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    // newUser is a kind of object, that ready to be saved
    // if we would save user directly without creating with repository method, it would be saved but it would not trigger hooks in Entity, if used
    const newUser = this.userRepositiory.create({ ...createUserDto });
    const savedUser = await this.userRepositiory.save(newUser);
    return instanceToPlain(savedUser) as User;
  }

  public async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.userRepositiory.findOneBy({ id });
    return instanceToPlain(user) as User;
  }

  public find(email: string) {
    return this.userRepositiory.find({ where: { email } });
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepositiory.save(user);
  }

  public async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    this.userRepositiory.remove(user);
  }
}
