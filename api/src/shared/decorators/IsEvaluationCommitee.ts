import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const IsEvaulationCommitee = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const role = request.role;
    if (role !== 'EVALUATION_COMMITTEE') {
      throw new UnauthorizedException('Usuário não autorizado!');
    }
    return true;
  },
);
