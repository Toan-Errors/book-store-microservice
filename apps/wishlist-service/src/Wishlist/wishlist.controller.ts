import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  private readonly logger = new Logger(WishlistController.name);

  @MessagePattern({ cmd: 'createWishlist' })
  async createWishlist(data: any) {
    this.logger.log('create-wishlist');
    return this.wishlistService.create(data);
  }

  @MessagePattern({ cmd: 'deleteWishlist' })
  async deleteWishlist(data: any) {
    this.logger.log('delete-wishlist');
    return this.wishlistService.delete(data);
  }

  @MessagePattern({ cmd: 'findAllWishlist' })
  async findAllWishlist() {
    this.logger.log('find-all-wishlist');
    return this.wishlistService.findAll();
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

  @MessagePattern({ cmd: 'findByUserIdAndBookIdWishlist' })
  async findByUserIdAndBookIdWishlist(data: any) {
    this.logger.log('find-by-user-id-and-book-id-wishlist');
    return this.wishlistService.findByUserIdAndBookId(data.userId, data.bookId);
  }
}
