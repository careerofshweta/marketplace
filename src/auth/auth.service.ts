import {
  Injectable,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

async signup(dto: SignupDto) {

  if (dto.password !== dto.confirmPassword) {
    throw new BadRequestException("Passwords do not match");
  }

  const existing = await this.userModel.findOne({ email: dto.email });
  if (existing) {
    throw new BadRequestException("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  await this.userModel.create({
    fullName: dto.fullName,
    email: dto.email,
    password: hashedPassword,
  });

  return { message: "Account created successfully" };
}


async login(dto: LoginDto) {
  const user = await this.userModel.findOne({ email: dto.email });
  if (!user) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(dto.password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const token = this.jwtService.sign({ userId: user._id });

  return {
    message: "Login successful",
    accessToken: token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  };
}

}
