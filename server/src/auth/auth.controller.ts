import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.signup(authRegisterDto);
  }

  @Post('scrape')
  async linked(@Body() body: { profileURL: string }) {
    const { profileURL } = body;
    const result = await this.authService.scrapeProfile(profileURL);
    return result;
  }

  @Post('signin')
  signin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.signin(authLoginDto);
  }
}
