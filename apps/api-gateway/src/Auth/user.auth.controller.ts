import { USER_SERVICE } from '@app/common';
import { Request } from '@nestjs/common';
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
}
