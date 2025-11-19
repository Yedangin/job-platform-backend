import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RoleBasedFilterService {
  /** Product filters */
  getProductFilter(user: any): any {
    if (this.isAdmin(user)) {
      return {}; // admins see all products
    }

    // buyers: read-only
    return { deleted: false };
  }

  /** Order filters */
  getOrderFilter(user: any): any {
    if (this.isAdmin(user)) {
      return {}; // admins see all orders
    }

    // buyers: only their own orders
    return { customerId: user.id };
  }

  /** Category filters */
  getCategoryFilter(user: any): any {
    if (this.isAdmin(user)) {
      return {}; // admins see all categories
    }

    // buyers: only categories that have available products
    return {
      products: {
        some: { deleted: false },
      },
    };
  }

  /** Refer code filters */
  getReferCodeFilter(user: any): any {
    if (this.isAdmin(user)) {
      return {}; // admins see all refer codes
    }

    // buyers: only their own refer code
    return { dealerId: user.id };
  }

  /** Cart filters */
  getCartFilter(user: any): any {
    if (this.isAdmin(user)) {
      return {}; // admins see all carts
    }

    // buyers: only their own cart
    return { userId: user.id };
  }

  /** Utility: check if user is an admin */
  private isAdmin(user: any): boolean {
    return user.role === Role.admin;
  }

  /** Utility: enforce read-only for buyers */
  ensureCanWrite(user: any): void {
    if (!this.isAdmin(user)) {
      throw new ForbiddenException(
        'Buyers are not allowed to modify resources',
      );
    }
  }
}
