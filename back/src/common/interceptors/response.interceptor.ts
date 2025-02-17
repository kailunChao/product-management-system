import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import formatDate from '../utils/formatDate';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((value) => {
        // console.log({ ...value, data: formatDate(value.data) })
        return value.meta || value.message
          ? { ...value, data: formatDate(value.data) }
          : { data: formatDate(value) };
      }),
    );
  }
}
