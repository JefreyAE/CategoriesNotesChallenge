import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { email: user.email },
    };
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const newUser = await this.usersService.createOne(email, password);
      const payload = { sub: newUser.id, email: newUser.email };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(`Sign up failed`);
    }
  }
}
