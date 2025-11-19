import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  SUPPORT = 'SUPPORT',
  WAREHOUSE_STAFF = 'WAREHOUSE_STAFF',
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

// Convenience decorators for common role combinations
export const AdminOnly = () => Roles(UserRole.ADMIN);
export const StaffOnly = () =>
  Roles(
    UserRole.ADMIN,
    UserRole.SELLER,
    UserRole.SUPPORT,
    UserRole.WAREHOUSE_STAFF,
  );
export const AdminOrSeller = () => Roles(UserRole.ADMIN, UserRole.SELLER);
export const AdminOrSupport = () => Roles(UserRole.ADMIN, UserRole.SUPPORT);
export const WarehouseAccess = () =>
  Roles(UserRole.ADMIN, UserRole.WAREHOUSE_STAFF);
