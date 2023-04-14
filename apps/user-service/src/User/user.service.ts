import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  async getAllUsers(
    query: any,
    page: number,
    limit: number,
  ): Promise<User[] | undefined> {
    const users = await this.userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return users;
  }

  async getUserAnalytics(): Promise<any> {
    const count = await this.userModel.countDocuments();
    const newUser = await this.userModel.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    });

    return { totalUsers: count, newUser };
  }
}
