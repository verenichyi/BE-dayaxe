import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PublicUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            const { _id, email, username, favoriteHotelPasses } = user;
            return { _id, email, username, favoriteHotelPasses };
          });
        }

        const { _id, email, username, favoriteHotelPasses } = data;
        return { _id, email, username, favoriteHotelPasses };
      }),
    );
  }
}
