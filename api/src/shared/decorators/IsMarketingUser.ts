import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const IsMarketingUser = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const role = request.role;
    if (role !== 'MARKETING') {
      throw new UnauthorizedException('Usuário não autorizado!');
    }
    return true;
  },
);
