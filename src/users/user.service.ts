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

  async loginByUser(
    email: string,
    password: string,
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new HttpException('Không tìm thấy người dùng', 400);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException('Mật khẩu không đúng', 400);
      }

      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });

      return { user, token };
    } catch (error) {
      throw new HttpException('Đăng nhập không thành công', 500);
    }
  }
}
