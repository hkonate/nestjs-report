import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('THIS IS INTERCEPTING THE REQUEST');
    console.log({ context });

    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.create_at,
        };
        delete response.create_at;
        delete response.update_at;
        return response;
      }),
    );
  }
}
