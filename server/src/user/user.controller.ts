import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req) {
    return req.user;
  }
}
