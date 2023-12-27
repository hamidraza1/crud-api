import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  //This is a signature for a constructor function.
  //It specifies that any class constructor (function) conforming to this interface must be able to take
  //any number of arguments of any type (...args: any[]) and return an object ({}).
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

// Interceptors can be used to intercept outgoing responses and or incoming requests.
// Interceptors as being very similar to Middlewares in many other frameworks or languages.

// We can apply that interceptor either to individual root handlers.
// Or we can apply the interceptor to the entire controller. i.e for every request or response that comes into or goes out of our project.

// 'intercept' method is called automatically
// 'context' => information on the incoming req
// 'next' => kind of reference to the request handler in our controller

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //Here anything before the req is handled by requestHandler(in Controller)

    //---------------
    // we are going to take Entity instance, and we will convert it into dto instance with plainToInstance method(e.g user.dto.ts)
    // that dto instance would have all the serialization rules(e.g show id, email and not the password)
    // then we are going to directly return that instance
    // nestjs is gonna take that instance, turn it into Json automatically and send that back in response
    return next.handle().pipe(
      map((data) => {
        // run before something is sent as response
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
