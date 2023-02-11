import { CreateWishlistDto } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  private readonly logger = new Logger(WishlistController.name);

  @MessagePattern({ cmd: 'createWishlist' })
  async createWishlist(data: CreateWishlistDto) {
    const { userId, bookId } = data;
    if (!userId || !bookId) throw new Error('Invalid data');
    const wishlist = await this.wishlistService.findByUserIdAndBookId(
      userId,
      bookId,
    );

    if (wishlist) {
      this.logger.log(`delete-wishlist: ${userId} ${bookId}`);
      return await this.wishlistService.delete(wishlist._id);
    }

    this.logger.log(`create-wishlist: ${userId} ${bookId}`);
    return this.wishlistService.create(data);
  }

  @MessagePattern({ cmd: 'findByUserIdWishlist' })
  async findByUserIdWishlist(userId: string) {
    this.logger.log('find-by-user-id-wishlist');
    return this.wishlistService.findByUserId(userId);
  }

  @MessagePattern({ cmd: 'findByBookIdWishlist' })
  async findByBookIdWishlist(bookId: string) {
    this.logger.log('find-by-book-id-wishlist');
    return this.wishlistService.findByBookId(bookId);
  }
}
