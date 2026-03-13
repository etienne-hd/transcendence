import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodAny, ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: any) {
    const parsed = this.schema.safeParse(value);

    if (!parsed.success) {
      const issues = parsed.error.issues;

      const message =
        issues.length > 0
          ? `${issues[0].path.join('.')}: ${issues[0].message}`
          : 'Invalid body';

      throw new BadRequestException({
        message: message,
        error: 'Bad Request',
        statusCode: 400,
        validationError: parsed.error.issues,
      });
    }
    return parsed.data;
  }
}
