import { CreateUserDto, LoginUserDto } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateUserDto) {
    this.logger.log(`Received registration request for ${createUserDto.email}`);
    try {
      const user = await this.authService.create(createUserDto);
      this.logger.log(`Successfully registered user ${user.email}`);
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + 3600);

      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);

      return { accessToken, refreshToken, user };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Received login request for ${loginUserDto.email}`);
    try {
      const user = await this.authService.findByEmail(loginUserDto.email);
      if (!user) {
        return {
          message: 'Email is not registered',
        };
      }
      const isMatch = await this.authService.comparePassword(
        loginUserDto.password,
        user.password,
      );
      if (!isMatch) {
        return {
          message: 'Password is incorrect',
        };
      }

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + 3600);

      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      this.logger.log(`Successfully logged in user ${user.email}`);
      return { accessToken, refreshToken, user };
    } catch (error) {
      return {
        message: 'Email or password is incorrect',
      };
    }
  }

  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(token: string) {
    this.logger.log(`Received authentication request for token ${token}`);
    try {
      const user = await this.authService.verifyAccessToken(token);
      if (!user) {
        return {
          message: 'Invalid token',
        };
      }
      this.logger.log(`Successfully authenticated user ${user.email}`);
      return { user };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'changePassword' })
  async changePassword(data: {
    userId: string;
    password: string;
    oldPassword;
  }) {
    this.logger.log(`Received change password request for user ${data.userId}`);
    try {
      const user = await this.authService.findById(data.userId);
      if (!user) {
        return {
          message: 'User not found',
        };
      }
      const isMatch = await this.authService.comparePassword(
        data.oldPassword,
        user.password,
      );
      if (!isMatch) {
        return {
          message: 'Password is incorrect',
        };
      }
      const updatedUser = await this.authService.changePassword(
        data.userId,
        data.password,
      );
      this.logger.log(`Successfully changed password for user ${data.userId}`);
      return { user: updatedUser };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
