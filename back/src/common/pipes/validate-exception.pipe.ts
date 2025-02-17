import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
// dto文件装饰器抛出的异常
export default class ValidateException extends ValidationPipe {
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const message = {};
    console.log(validationErrors)
    validationErrors.forEach((error) => {
      message[error.property] = Object.values(error.constraints)[0];
    });
    throw new HttpException(
      {
        statusCode: 422,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
