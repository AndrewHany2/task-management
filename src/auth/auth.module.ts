import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      global: true,
      secret: 'HelloFromTesting',
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy
    ]
})
export class AuthModule {}
