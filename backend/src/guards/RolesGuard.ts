import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    return requiredRoles.includes(user.role);
  }
}
