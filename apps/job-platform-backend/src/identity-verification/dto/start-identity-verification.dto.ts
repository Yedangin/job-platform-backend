import { Transform } from 'class-transformer';
import { Equals, IsIn, IsString } from 'class-validator';

export class StartIdentityVerificationDto {
  @IsString()
  @IsIn(['CORPORATE_MANAGER'])
  purpose!: 'CORPORATE_MANAGER';

  @IsString()
  @IsIn(['WEB', 'APP'])
  clientPlatform!: 'WEB' | 'APP';

  @Transform(({ value }) => value === true)
  @Equals(true, {
    message:
      '본인인증 개인정보 수집·이용에 동의해야 합니다 / Identity verification consent is required',
  })
  consented!: true;
}
