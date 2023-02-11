import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist } from './wishlist.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private wishlistModel: Model<Wishlist>,
  ) {}

  async create(wishlist: Wishlist): Promise<Wishlist> {
    const createdWishlist = new this.wishlistModel(wishlist);
    return createdWishlist.save();
  }

  async delete(wishlistId: string): Promise<Wishlist> {
    return this.wishlistModel.findByIdAndDelete(wishlistId).exec();
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Wishlist[]> {
    return this.wishlistModel.find({ userId }).exec();
  }

  async findByBookId(bookId: string): Promise<Wishlist[]> {
    return this.wishlistModel.find({ bookId }).exec();
  }

  async findByUserIdAndBookId(
    userId: string,
    bookId: string,
  ): Promise<Wishlist> {
    return this.wishlistModel.findOne({ userId, bookId }).exec();
  }
}
