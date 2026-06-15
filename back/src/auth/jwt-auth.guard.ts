import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // 헤더에서 토큰 꺼내서 해당 토큰이 유효한 토큰인지 검증로직이 필요함.
    // 게시글 상세 기능 사용시 해당 유저 정보를 보기 위해서는 userid가 필요한 상황
    const token = request.headers['authorization'].split(' ')[1];

    try {
      const userInfo = this.jwtService.verify(token);
      request.user = userInfo; // { id, email } 저장

      return true;
    } catch (error) {
      return false;
    }
  }
}

// 프론트가 토큰을 헤더에 보냄
// Guard가 토큰 검증 → request.user = { id, email } 저장
// Controller에서 req.user로 꺼냄
