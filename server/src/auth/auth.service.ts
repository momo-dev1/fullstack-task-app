import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { Builder, By, until, WebDriver } from 'selenium-webdriver';
// import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(authDto: AuthDto) {
    const { email, password } = authDto;
    const hashedPassword = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // duplicate
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  // async scrapeLinkedinName(linkedinUrl: string): Promise<string | null> {
  //   console.log(linkedinUrl);
  //   try {
  //     const options: chrome.Options = new chrome.Options();
  //     options.addArguments('--headless'); // Run Chrome in headless mode
  //     options.addArguments('--disable-gpu'); // Disable GPU for improved performance (optional)

  //     const driver: WebDriver = await new Builder()
  //       .forBrowser('chrome')
  //       .setChromeOptions(options)
  //       .build();

  //     await driver.get(linkedinUrl);

  //     // Wait for the profile name element to be visible
  //     const nameElement = await driver.wait(
  //       until.elementLocated(By.cssSelector('.h1.text-heading-xlarge')),
  //       20000,
  //     );

  //     const name = await nameElement.getText();
  //     await driver.quit();
  //     return name.trim() || null; // Return trimmed name or null if not found
  //   } catch (error) {
  //     console.error('Error scraping LinkedIn name:', error);
  //     return null;
  //   }
  // }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const isPassMatched = await argon.verify(user.password, password);

    if (!isPassMatched) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
