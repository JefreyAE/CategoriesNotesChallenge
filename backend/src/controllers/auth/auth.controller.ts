import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SignUpDto } from 'src/dtos/auth/signUp.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @Get('check-auth')
  @UseGuards(AuthGuard)
  async isAuthenticated(@Req() req): Promise<any> {
    return { is_valid: true, user: req.user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<any> {
    return await this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  //$ curl -X POST http://localhost:3000/auth/signup -d '{"email": "jefariasj@gmail.com", "password": "123456"}' -H "Content-Type: application/json"
}
