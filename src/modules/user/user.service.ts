import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  async findAll() {
    return 'This action returns all users';
  }
  create(data: any) {
    return 'This action adds a new user';
  }
}
