/**
 * 이력서 수정 DTO (모든 필드 선택적)
 * Resume update DTO (all fields optional)
 */
import { PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {}
