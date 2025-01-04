import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'MARKETING';
export const IsPublic = () => SetMetadata(ROLE_KEY, true);
