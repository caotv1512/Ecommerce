import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    console.log(request.user, 'activated');
    
    console.log('ahiii');
    
    return false;
  }
}