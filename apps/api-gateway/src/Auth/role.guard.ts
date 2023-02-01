import { USER_SERVICE } from '@app/common';
import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(USER_SERVICE) private client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false; // <--- This is the problem (I think
    const accessToken = request.headers.authorization.split(' ')[1];
    const response = await this.client
      .send({ cmd: 'authenticate' }, accessToken)
      .toPromise();
    if (!roles) {
      return false;
    }

    const hasRole = this.matchRoles(roles, response.user.role);
    return hasRole;
  }

  matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
