import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  private signup(@Body() dto: any) {
    console.log('inside');
    console.log(dto);
    return 'i am signed up.';
  }
}
