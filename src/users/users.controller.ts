import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  private async signup(@Body() dto: CreateUserDto, @Session() session: any) {
    //when we get back a user entity, we're going to take the ID of that user entity and then assign it to the session object.
    //And that's going to be our tool for deciding whether or not a user is signed in on follow up requests.
    //this cookie/session storage setup has been done in main.ts
    //now if a user signup, a cookie will be stored in session as 'session-cookie' as header, and if we would signin again with same credentials no new cookie will be stored
    //example in whoAmI Get Req
    const user = await this.authService.signup(dto.email, dto.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  private async signin(@Body() dto: CreateUserDto, @Session() session: any) {
    //now if a user signin, a cookie will be sent back as response for the first time and if we would signin again with same credentials no new cookie will be sent in response
    //example in whoAmI Get Req
    const user = await this.authService.signin(dto.email, dto.password);
    session.userId = user.id;
    return user;
  }

  @Get('whoAmI')
  @UseGuards(AuthGuard)
  private whoAmiI(@CurrentUser() user: User) {
    //this is the example to show the benifit of Session/Cookie Storage
    //if user would already be signedUp/signedIn(which means usersId would already be saved in session)
    //then only sending GET request on localhost300/auth/whoAmI would return that user(without sending any crediantials)

    // To automatically tell a handler who the currently signedin User, we will create the custom-decorator(@CurrentUser) and interceptor
    //interceptor will run at first to update the incoming request,
    //decorators will use that mutated request to send a part of that
    // argument-'user' will be equal to whatever returned by @CurrentUser

    //decorator will be used to actually fetch the current user and then provide that user as an argument to our route handler.
    //So inside of our decorator, here's what we need to put this thing together.
    console.log(user);
    return user;
  }

  @Get('signout')
  private signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  private async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  private findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  private deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  private updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(parseInt(id), user);
  }
}
