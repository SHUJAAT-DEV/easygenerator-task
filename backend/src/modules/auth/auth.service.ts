import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password, name } = signUpDto;
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(email, hashedPassword, name);
  }

  async signIn(validateUser: UserDocument){
    const payload = { email: validateUser.email, sub: validateUser._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      user: { email: validateUser.email, id: validateUser._id },
      token: accessToken,
    };
  }

  async validateUser(email: string, password: string) {

    const user = await this.userService.findOneByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("isPasswordValid", isPasswordValid, user)
    if (user && isPasswordValid) {
      return user;
    }

 
    throw new UnauthorizedException('Invalid credentials');
  }
}
