import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { Roles } from './role.decorator';
import { Role } from './role.enum';

@Controller('auth')
@UseGuards(RoleGuard)
export class AdminUserController {
  constructor(@Inject(USER_SERVICE) readonly client: ClientProxy) {}

  @Post('/users/:page/:limit/all')
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Body() body: any,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    const { query } = body;
    console.log(query);
    const users = await this.client
      .send(
        { cmd: 'getAllUsers' },
        {
          query,
          page,
          limit,
        },
      )
      .toPromise();
    return users;
  }

  @Get('/user/analytics')
  @Roles(Role.ADMIN)
  async getUserAnalytics() {
    const analytics = await this.client
      .send({ cmd: 'getUserAnalytics' }, {})
      .toPromise();
    return analytics;
  }
}
