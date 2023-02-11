import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.schema';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const newUser = new this.userModel({
      password: hashedPassword,
      ...userData,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async changeAvatar(
    userId: string,
    avatar: string,
  ): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(userId, { avatar }, { new: true });
  }

  async updateProfile(userId: string, profile: any): Promise<User | undefined> {
    // update profile
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: profile },
      { new: true },
    );
    return user;
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

  async addDeliveryAddress(
    userId: string,
    address: any,
  ): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { deliveryAddresses: address } },
      { new: true },
    );
  }

  async updateDeliveryAddress(
    userId: string,
    addressId: string,
    address: any,
  ): Promise<User | undefined> {
    console.log(userId, addressId, address);
    return this.userModel.findOneAndUpdate(
      { _id: userId, 'deliveryAddresses.id': addressId },
      { $set: { 'deliveryAddresses.$': address } },
      { new: true },
    );
  }

  async removeDeliveryAddress(
    userId: string,
    addressId: string,
  ): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { deliveryAddresses: { id: addressId } } },
      { new: true },
    );
  }
}
