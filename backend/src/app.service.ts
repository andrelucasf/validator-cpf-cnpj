import { Injectable } from '@nestjs/common';
import { RequestCountInterceptor } from './middlewares/request-count.middleware';

@Injectable()
export class AppService {
  private startTime = new Date();

  getStatus() {
    const uptime = (
      (new Date().getTime() - this.startTime.getTime()) /
      1000
    ).toFixed(2);
    const queries = RequestCountInterceptor.queryCount;

    return {
      uptime: `${uptime}s`,
      queries,
    };
  }
}
