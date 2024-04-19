import { UserEntity } from './user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email) {
    const emailDetail = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!emailDetail) {
      throw new HttpException('Khong tim thay email', 400);
    }
    console.log(emailDetail);
    return emailDetail;
  }

  async createByUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('Email đã tồn tại');
    }

    const newUser = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
}
