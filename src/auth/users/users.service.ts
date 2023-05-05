import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  private handlerDbErro(error: any): never {
    this.logger.error(error);
    if (error.code === 11000) {
      throw new BadRequestException('Email already exists');
    }
    throw new InternalServerErrorException('Internal server error');
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public comparePassword(newPassword: string, passwordHash: string): boolean {
    return bcrypt.compareSync(newPassword, passwordHash);
  }

  public async createUser(user: CreateUserDto) {
    try {
      const newUser = new this.userModel({
        ...user,
        password: this.hashPassword(user.password),
      });
      return await newUser.save();
    } catch (error) {
      this.handlerDbErro(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      this.handlerDbErro(error);
    }
  }
}
