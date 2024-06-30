import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRegisterDto, AuthLoginDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import * as edge from 'selenium-webdriver/edge';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(authRegisterDto: AuthRegisterDto) {
    const { email, password, linkedInUrl } = authRegisterDto;
    const hashedPassword = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          linkedInUrl,
        },
      });

      // Scrape profile data
      const profileData = await this.scrapeProfile(linkedInUrl);

      // Update user with scraped profile data
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: profileData.name,
          imageUrl: profileData.imageURL,
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

  async scrapeProfile(profileURL: string): Promise<any> {
    const driver: WebDriver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(
        new edge.Options().addArguments(
          '--headless',
          '--disable-extensions',
          '--enable-chrome-browser-cloud-management',
          '--remote-debugging-port=0',
        ),
      )
      .build();

    try {
      await driver.get('https://www.linkedin.com/login');
      const emailInput = await driver.findElement(By.id('username'));
      const passwordInput = await driver.findElement(By.id('password'));
      const loginButton = await driver.findElement(
        By.css('button[type="submit"]'),
      );
      await emailInput.sendKeys('m65858752@gmail.com');
      await passwordInput.sendKeys('123456mM');
      await driver.sleep(3000);
      await loginButton.click();
      await driver.sleep(1500);
      await driver.get(profileURL);
      await driver.sleep(5000);
      const nameElement = await driver.wait(
        until.elementLocated(By.css('h1.text-heading-xlarge')),
        20000,
      );
      const name = await nameElement.getText();
      const photoElement = await driver.findElement(
        By.css(
          'img.pv-top-card-profile-picture__image--show.evi-image.ember-view',
        ),
      );
      const imageURL = await photoElement.getAttribute('src');
      return { name, imageURL };
    } finally {
      await driver.quit();
    }
  }

  async signin(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
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
