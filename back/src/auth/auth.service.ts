import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) throw new Error('유저를 찾을 수 없스무니다.');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) throw new Error('비번 틀림 ㅋ');

    return '로그인 성공ㅋ';
  }
}
