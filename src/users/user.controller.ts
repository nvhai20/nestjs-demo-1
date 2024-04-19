import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getByEmail(@Query('email') email: string) {
    console.log(email);
    return this.userService.findByEmail(email);
  }

  @Post('register')
  async createByUser(
    @Body()
    userData: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    },
  ) {
    const { email, firstName, lastName, password } = userData;
    console.log(email, firstName, lastName, password);
    return this.userService.createByUser(email, firstName, lastName, password);
  }

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    console.log(email, password);
    return this.userService.loginByUser(email, password);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@GetUser() user) {
    const userProfile = await this.userService.findByEmail(user.email);
    return {
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    };
  }
}
