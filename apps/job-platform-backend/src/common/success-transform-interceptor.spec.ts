import { CallHandler, ExecutionContext, StreamableFile } from '@nestjs/common';
import { lastValueFrom, of } from 'rxjs';
import { SuccessTransformInterceptor } from '../../../../libs/common/src/common/interceptor/success-transform-interceptor';

describe('SuccessTransformInterceptor', () => {
  const context = {} as ExecutionContext;

  it('wraps ordinary response data', async () => {
    const interceptor = new SuccessTransformInterceptor();
    const next = { handle: () => of({ value: 1 }) } as CallHandler;

    await expect(
      lastValueFrom(interceptor.intercept(context, next)),
    ).resolves.toEqual({
      status: 'OK',
      data: { value: 1 },
    });
  });

  it('passes StreamableFile through without JSON wrapping', async () => {
    const interceptor = new SuccessTransformInterceptor();
    const file = new StreamableFile(Buffer.from('image'), {
      type: 'image/png',
    });
    const next = { handle: () => of(file) } as CallHandler;

    await expect(
      lastValueFrom(interceptor.intercept(context, next)),
    ).resolves.toBe(file);
  });
});
