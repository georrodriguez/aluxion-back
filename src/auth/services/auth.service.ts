import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (user && isMatch) {
      const { password, ...rta } = user.toJSON();
      return rta;
    }
    return null;
  }
}
