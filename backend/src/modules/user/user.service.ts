import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(
    email: string,
    hashedPassword: string,
    name: string
  ): Promise<User> {
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });
    return newUser.save();
  }
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
