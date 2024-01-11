import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatues = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase();
    if(!this.isValidStatus(value)){
      throw new BadRequestException(`${value} is an invalid status`)
    }
    return value
  }

  private isValidStatus(status: any){
    const idx = this.allowedStatues.indexOf(status);
    return idx !== -1
  }
}
