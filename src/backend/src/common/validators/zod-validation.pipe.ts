import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodAny, ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: any) {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Invalid body',
        error: 'Bad Request',
        statusCode: 400,
        validationError: parsed.error.issues,
      });
    }
    return parsed.data;
  }
}
