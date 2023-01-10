import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype) {
      return value;
    }
    const obj = plainToInstance(metatype, value);
    if (typeof obj === 'undefined') {
      return value;
    }
    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map((err) => {
        const con = err.constraints;
        if (con) {
          return `${err.property} - ${Object.values(con).join(', ')}`;
        }
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
