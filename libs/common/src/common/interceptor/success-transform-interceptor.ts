import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface successResponse<T> {
  status: string;
  data: T;
}

@Injectable()
export class SuccessTransformInterceptor<T>
  implements NestInterceptor<T, successResponse<T> | T | StreamableFile>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<successResponse<T> | T | StreamableFile> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) return data;

        return {
          status: HttpStatus[HttpStatus.OK],
          data,
        };
      }),
    );
  }
}
