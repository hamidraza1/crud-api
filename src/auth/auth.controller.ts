import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  private signup(@Body() dto: AuthDto) {
    console.log('inside');
    console.log(dto);
    return 'i am signed up.';
  }
}
