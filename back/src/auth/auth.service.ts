import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) throw new Error('유저를 찾을 수 없스무니다.');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) throw new Error('비번 틀림 ㅋ');

    // return '로그인 성공ㅋ';
    // return this.jwtService.sign({ id: user.id, email: user.email });
    return {
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
