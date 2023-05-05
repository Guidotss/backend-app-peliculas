import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    
  ) {
    return this.authService.registerUser(email, password, name);
    
  }

  @Post('validateToken')
  validateToken(@Body('token') token: string) {
    return this.authService.validateToken(token);
  }
}
