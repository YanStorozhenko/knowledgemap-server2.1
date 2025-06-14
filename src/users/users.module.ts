import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


import { UserTopicProgress } from './entities/user-topic-progress.entity';
import { UserTopicProgressService } from './user-topic-progress.service';
import { UserTopicProgressController } from './user-topic-progress.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})

@Module({
  imports: [TypeOrmModule.forFeature([UserTopicProgress])],
  providers: [UserTopicProgressService],
  controllers: [UserTopicProgressController],
})

export class UsersModule {}


