import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
  }
}
