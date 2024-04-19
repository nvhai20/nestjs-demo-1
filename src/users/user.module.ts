import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'hai123',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
