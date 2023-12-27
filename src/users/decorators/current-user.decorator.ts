import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //data would be whatever we provide as argument to custom-decorator
    //The type annotation of never means this value is never going to be used accessed in any way, shape or form

    //to get the underlying request coming to our application
    const request = context.switchToHttp().getRequest();

    //To get access to userService, we cant just import it or pass as an argument, it would only work with dependency injection
    //To deal with issue we will use interceptor(create a new interceptor), bcs all interceptors we make are gonna part of dependency injection
    //in that interceptor we are going to mutate the request by adding currentUser to request
    return request.CurrentUser;
  },
);
