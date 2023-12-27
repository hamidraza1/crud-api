import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async signup(email: string, password: string) {
    //See if email in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    //Hash the user Password
    // 1) Generat a salt
    const salt = randomBytes(8).toString('hex');

    // 2) Hash the Salt and Password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 3) Join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    //Create a new user and save it
    const user = await this.usersService.create({ email, password: result });

    return user;
  }

  public async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not Found');
    }

    //we will compare encrypted password from stored Database with password from client(after encrypting client password)
    const [salt, storedHash] = user.password.split('.');
    const clientEncryptedHash = (await scrypt(password, salt, 32)) as Buffer;

    const isPasswordCorrect =
      storedHash !== clientEncryptedHash.toString('hex');

    if (isPasswordCorrect) {
      throw new BadRequestException('bad Password');
    }

    return user;
  }
}
