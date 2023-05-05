import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user && this.usersService.comparePassword(password, user.password)) {
      const { email, filmsIds, name, _id } = user;
      return {
        _id,
        email,
        filmsIds,
        name,
      };
    }
  }

  public async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      email: user.email,
      id: user._id,
      name: user.name,
      filmsIds: user.filmsIds,
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JSON_WEB_TOKEN_SECRET,
      }),
    };
  }

  public async registerUser(email: string, password: string, name: string) {
    const { _id, filmsIds } = await this.usersService.createUser({
      email,
      password,
      name,
    });
    const payload = { email, _id, name, filmsIds };
    return {
      _id,
      email,
      filmsIds,
      name,
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JSON_WEB_TOKEN_SECRET,
      }),
    };
  }

  public async validateToken(token: string) {
    if (!token) throw new UnauthorizedException('Token not found');
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JSON_WEB_TOKEN_SECRET,
      });
      const { email, id, name, filmsIds } = decoded;
      return { email, id, name, filmsIds };
    } catch (error) {
      return null;
    }
  }
}
