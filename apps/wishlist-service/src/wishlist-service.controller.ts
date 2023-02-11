import { Controller, Get } from '@nestjs/common';
import { WishlistServiceService } from './wishlist-service.service';

@Controller()
export class WishlistServiceController {
  constructor(private readonly wishlistServiceService: WishlistServiceService) {}

  @Get()
  getHello(): string {
    return this.wishlistServiceService.getHello();
  }
}
