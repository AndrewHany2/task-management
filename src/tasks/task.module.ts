import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  exports: [TypeOrmModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TasksModule {}
