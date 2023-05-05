import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  providers: [JwtStrategy,AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JSON_WEB_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ] 
})
export class AuthModule {}
