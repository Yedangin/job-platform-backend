-- Add certificate fields to profile_educations table
-- 학력 증명서 필드 추가

ALTER TABLE profile_educations
  ADD COLUMN IF NOT EXISTS certificate_file_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS certificate_file_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS certificate_uploaded_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS verified_by VARCHAR(50);

COMMENT ON COLUMN profile_educations.certificate_file_url IS '증명서 파일 URL / Certificate file URL';
COMMENT ON COLUMN profile_educations.certificate_file_name IS '증명서 파일명 / Certificate file name';
COMMENT ON COLUMN profile_educations.certificate_uploaded_at IS '증명서 업로드 시각 / Certificate upload timestamp';
COMMENT ON COLUMN profile_educations.is_verified IS '증명서 인증 여부 / Certificate verified status';
COMMENT ON COLUMN profile_educations.verified_at IS '증명서 인증 시각 / Certificate verification timestamp';
COMMENT ON COLUMN profile_educations.verified_by IS '인증 처리 관리자 ID / Admin ID who verified';
