import { IsString, Length, Matches } from 'class-validator';

export class CompleteIdentityVerificationDto {
  @IsString()
  @Length(10, 80)
  @Matches(/^[A-Za-z0-9_-]+$/)
  identityVerificationId!: string;

  @IsString()
  @Length(40, 100)
  @Matches(/^[A-Za-z0-9_-]+$/)
  state!: string;
}
