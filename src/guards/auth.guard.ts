import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

//returns Boolean to access a route handler or not
//can be applied globally, on a single Controller or single req-handler
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
