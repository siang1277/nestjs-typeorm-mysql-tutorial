import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Auth Middleware');
    // Web hook secret validate
    // const { authorization } = req.headers;
    // if (!authorization)
    //   throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    next();
  }
}
