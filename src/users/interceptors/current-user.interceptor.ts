import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

//to make use of Dependency Injection for using UserService
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    //to get the underlying request coming to our application
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);

      //we have to communicate the user that we found down into the decorator
      //we are going to assign user to the request object, because the request object can be retrieved or we can get access to that object inside of our decorator.
      request.CurrentUser = user;
    }

    //go ahead and run the actual route handler
    return handler.handle();
  }
}
