import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Admin() {
  return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard));
}
