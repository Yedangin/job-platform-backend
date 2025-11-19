import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface successResponse<T> {
  status: string;
  data: T;
}

@Injectable()
export class SuccessTransformInterceptor<T>
  implements NestInterceptor<T, successResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<successResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: HttpStatus[HttpStatus.OK],
        data,
      })),
    );
  }
}
