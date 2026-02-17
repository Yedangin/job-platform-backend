import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';

/**
 * 상품 조회 서비스 / Product query service
 */
@Injectable()
export class ProductService {
  constructor(private readonly paymentPrisma: PaymentPrismaService) {}

  /**
   * 활성 상품 전체 조회 / List all active products
   */
  async findAll() {
    return this.paymentPrisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { price: 'asc' }],
    });
  }

  /**
   * 상품 코드로 조회 / Get product by code
   */
  async findByCode(code: string) {
    const product = await this.paymentPrisma.product.findUnique({
      where: { code },
    });
    if (!product) {
      throw new NotFoundException(
        `상품을 찾을 수 없습니다 / Product not found: ${code}`,
      );
    }
    return product;
  }

  /**
   * 활성 상품 코드로 조회 (비활성 상품 거부)
   * Get active product by code (rejects inactive products)
   */
  async findActiveByCode(code: string) {
    const product = await this.findByCode(code);
    if (!product.isActive) {
      throw new NotFoundException(
        `현재 판매 중이 아닌 상품입니다 / Product is not currently active: ${code}`,
      );
    }
    return product;
  }
}
