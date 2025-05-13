import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const IsAdmUser = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const role = request.role;
    if (role === 'MARKETING' || role === 'EVALUATION_COMMITTEE') {
      return true;
    }

    throw new UnauthorizedException('Usuário não autorizado!');
  },
);
