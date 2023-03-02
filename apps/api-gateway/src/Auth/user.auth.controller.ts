import { USER_SERVICE } from '@app/common';
import {
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Request,
} from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from './role.decorator';
import { Role } from './role.enum';
import { RoleGuard } from './role.guard';

@Controller('user')
@UseGuards(RoleGuard)
export class UserUserController {
  constructor(@Inject(USER_SERVICE) readonly client: ClientProxy) {}

  @Get()
  @Roles(Role.USER)
  async findAll() {
    return { message: 'Hello World!' };
  }

  @Post('change-avatar')
  @Roles(Role.USER)
  async changeAvatar(@Body() body: any) {
    console.log(body);
    const user = await this.client
      .send({ cmd: 'changeAvatar' }, {})
      .toPromise();
    return user;
  }

  @Post('update-profile')
  @Roles(Role.USER, Role.ADMIN)
  async updateProfile(@Body() body: any, @Request() req: any) {
    const userId = req.user._id;
    const user = await this.client
      .send({ cmd: 'updateProfile' }, { userId, body })
      .toPromise();
    return user;
  }

  // add Delivery Address
  @Post('delivery-address')
  @Roles(Role.USER, Role.ADMIN)
  async addDeliveryAddress(@Body() body: any, @Request() req: any) {
    const userId = req.user._id;
    const user = await this.client
      .send({ cmd: 'addDeliveryAddress' }, { userId, address: body })
      .toPromise();
    return user;
  }

  // update Delivery Address
  @Put('delivery-address')
  @Roles(Role.USER, Role.ADMIN)
  async updateDeliveryAddress(@Body() body: any, @Request() req: any) {
    const userId = req.user._id;
    const addressId = body.id;
    const user = await this.client
      .send(
        { cmd: 'updateDeliveryAddress' },
        { userId, addressId, address: body },
      )
      .toPromise();
    return user;
  }

  // delete Delivery Address
  @Delete('delivery-address')
  @Roles(Role.USER, Role.ADMIN)
  async deleteDeliveryAddress(@Body() body: any, @Request() req: any) {
    const userId = req.user._id;
    const addressId = body.addressId;
    const user = await this.client
      .send({ cmd: 'removeDeliveryAddress' }, { userId, addressId })
      .toPromise();
    return user;
  }

  @Put('change-password')
  @Roles(Role.USER, Role.ADMIN)
  async changePassword(@Request() req: any, @Body() body: any) {
    const userId = req.user._id;
    const { oldPassword, newPassword } = body;
    try {
      const response = await this.client
        .send(
          { cmd: 'changePassword' },
          { userId, oldPassword, password: newPassword },
        )
        .toPromise();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
