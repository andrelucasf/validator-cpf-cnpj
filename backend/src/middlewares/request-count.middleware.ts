import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestCountInterceptor implements NestInterceptor {
  static queryCount = 0;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    RequestCountInterceptor.queryCount++;

    return next.handle();
  }
}
