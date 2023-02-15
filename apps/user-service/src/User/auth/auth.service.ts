import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@app/common';

@Injectable()
export class AuthService {
  private saltRounds = 10;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const newUser = new this.userModel({
      password: hashedPassword,
      ...userData,
    });
    return newUser.save();
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { _id: user._id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: any): Promise<string> {
    const payload = { _id: user._id };
    return this.jwtService.sign(payload);
  }

  async verifyAccessToken(token: string): Promise<User | undefined> {
    try {
      const { _id } = this.jwtService.verify(token);
      return this.userModel.findById(_id);
    } catch (error) {
      return undefined;
    }
  }
}
