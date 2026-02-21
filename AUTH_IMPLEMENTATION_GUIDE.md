# 회원가입/로그인 기능 구현 완료

## 📋 구현 내용 요약

외국인 채용 플랫폼의 회원가입(Register), 로그인(Login), 소셜 로그인(Social Login) 기능을 **새로운 DB 스키마**에 맞게 완전히 재구현했습니다.

### ✅ 핵심 기능

1. **진입 시점 분리 (Split Entry)**
   - `INDIVIDUAL` (개인 회원) vs `CORPORATE` (기업 회원) 구분
   - 회원가입 시 `role` 파라미터로 사용자 유형 지정

2. **One Account Policy (이메일 중복 방지)**
   - 하나의 이메일로 여러 계정 생성 불가
   - 이미 가입된 이메일로 다시 가입 시도 시 명확한 에러 메시지 반환
   - 예: "이미 개인 회원으로 가입된 이메일입니다."

3. **트랜잭션 처리**
   - `users_auth` + `profiles_individual` (또는 `profiles_corporate`) 동시 생성
   - 하나라도 실패하면 전체 롤백

4. **소셜 로그인 3단계 로직**
   - Step 1: `provider + providerId`로 기존 회원 찾기 → 있으면 로그인
   - Step 2: `email`로 기존 회원 찾기 → 있으면 에러 (계정 통합 방지)
   - Step 3: 신규 회원가입 (트랜잭션)

---

## 📂 수정된 파일 목록

### 1. Prisma Schema
**파일:** `prisma/user/user.schema.prisma`

#### 변경 사항:
- ✅ **User 모델 확장**
  - `socialProvider`, `socialProviderId` 추가 (소셜 로그인 통합)
  - `isActive`, `joinedAt`, `lastLoginAt` 추가
  - `SocialAuth` 테이블 제거 (User 테이블에 통합)

- ✅ **IndividualProfile 대폭 확장**
  - 기본 신원 정보: `realName`, `nationality`, `birthDate`, `gender`, `addressRoad`
  - 비자 정보: `visaType`, `visaExpiryDate` (★ 채용 핵심 필터)
  - 구직 선호 조건: `desiredJobType`, `desiredSalary`, `desiredIndustries`, `isOpenToScout`
  - 역량 요약: `finalEducationLvl`, `koreanFluencyLvl`, `totalCareerMonths`
  - 파일 및 소개: `profileImageUrl`, `resumeFileUrl`, `portfolioUrl`, `selfIntro`
  - 상태: `isProfileCompleted`

- ✅ **CorporateProfile 대폭 확장**
  - 기업 필수 정보: `bizRegNumber`, `companyNameOfficial`, `ceoName`, `foundingDate`
  - 채용 담당자 정보: `managerName`, `managerPhone`, `managerEmail`
  - 검증 상태: `verificationStatus`, `verificationMethod`, `proofDocumentUrl`
  - 브랜딩 정보: `brandName`, `logoImageUrl`, `companyIntro`
  - 업종 및 위치: `ksicCode`, `addressRoad`
  - 전문직 채용 정보: `companySizeType`, `employeeCountKorean`, `employeeCountForeign`, `annualRevenue`

- ✅ **새로운 테이블 추가**
  - `ProfileEducation`: 학력 정보 (E-7 비자 핵심)
  - `ProfileCareer`: 경력 정보
  - `ProfileLanguage`: 어학 및 자격증 (TOPIK 필수)

### 2. Auth Service
**파일:** `apps/job-platform-backend/src/auth/auth.service.ts`

#### 변경 사항:
- ✅ **회원가입 (`register`)**
  ```typescript
  // One Account Policy 체크
  const existingUser = await this.prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new ConflictException(`이미 ${userTypeKorean} 회원으로 가입된 이메일입니다.`);
  }

  // 트랜잭션: User + Profile 동시 생성
  await this.prisma.$transaction(async (prisma) => {
    const newUser = await prisma.user.create({ ... });

    if (finalUserType === UserType.INDIVIDUAL) {
      await prisma.individualProfile.create({ authId: newUser.id, ... });
    } else if (finalUserType === UserType.CORPORATE) {
      await prisma.corporateProfile.create({ authId: newUser.id, ... });
    }
  });
  ```

- ✅ **로그인 (`login`)**
  ```typescript
  // lastLoginAt 업데이트
  await this.prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });
  ```

- ✅ **소셜 로그인 (`findOrCreateOAuthUser`)**
  ```typescript
  // Step 1: provider + providerId로 찾기
  const existingUser = await this.prisma.user.findFirst({
    where: { socialProvider, socialProviderId },
  });
  if (existingUser) { /* 로그인 성공 */ }

  // Step 2: email로 찾기 (계정 통합 방지)
  if (profile.email) {
    const emailUser = await this.prisma.user.findFirst({ where: { email: profile.email } });
    if (emailUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }
  }

  // Step 3: 신규 회원가입 (트랜잭션)
  await this.prisma.$transaction(async (prisma) => { ... });
  ```

### 3. DTO 파일
**파일:** `apps/job-platform-backend/src/auth/dto/register.dto.ts`

#### 변경 사항:
- ✅ **`role` 필드 추가**
  ```typescript
  @ApiProperty({
    example: 'INDIVIDUAL',
    enum: ['INDIVIDUAL', 'CORPORATE'],
    description: 'User type: INDIVIDUAL (개인 회원) or CORPORATE (기업 회원)'
  })
  @IsEnum(['INDIVIDUAL', 'CORPORATE'])
  role: 'INDIVIDUAL' | 'CORPORATE';
  ```

### 4. Proto 파일
**파일:** `proto/auth/auth.proto`

#### 변경 사항:
- ✅ **UserRole enum에 INDIVIDUAL 추가**
  ```protobuf
  enum UserRole {
    USER_ROLE_UNSPECIFIED = 0;
    GUEST = 1;
    MEMBER = 2;
    INDIVIDUAL = 3; // 개인 회원
    CORPORATE = 4;  // 기업 회원
    ADMIN = 5;
    SUPERADMIN = 6;
  }
  ```

- ✅ **LoginSuccessResponse에 필드 추가**
  ```protobuf
  message LoginSuccessResponse {
    bool success = 1;
    string sessionId = 2;
    string message = 3;
    optional string accessToken = 4;
    optional User user = 5;
  }
  ```

---

## 🚀 적용 방법

### 1. 서버 중지
```bash
# 현재 실행 중인 서버 중지 (Prisma 파일 잠금 해제를 위해 필수)
# PM2 사용 시
pm2 stop job-platform-backend

# 또는 직접 실행 중이라면 Ctrl+C로 중지
```

### 2. Prisma Client 재생성
```bash
cd c:\Users\CHANHO\Documents\Jobchaja\Jobchaja_local\job-platform-backend

# User 스키마 클라이언트 생성
npx prisma generate --schema=./prisma/user/user.schema.prisma
```

### 3. DB Migration 생성 및 적용
```bash
# Migration 생성 (스키마 변경사항을 SQL로 변환)
npx prisma migrate dev --name auth_schema_v2 --schema=./prisma/user/user.schema.prisma

# 프로덕션 환경에서는 migrate deploy 사용
npx prisma migrate deploy --schema=./prisma/user/user.schema.prisma
```

### 4. 서버 재시작
```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드 (PM2)
pm2 restart job-platform-backend
```

---

## 🧪 테스트 시나리오

### 1. 개인 회원 가입 테스트
```bash
POST http://localhost:8000/auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123!",
  "fullName": "John Doe",
  "role": "INDIVIDUAL"
}
```

**기대 결과:**
- ✅ `users_auth` 테이블에 레코드 생성 (`userType = INDIVIDUAL`)
- ✅ `profiles_individual` 테이블에 초기 프로필 생성 (필수 필드만)
- ✅ 응답: `{ "success": true, "message": "User registered successfully" }`

### 2. 기업 회원 가입 테스트
```bash
POST http://localhost:8000/auth/register
Content-Type: application/json

{
  "email": "company@example.com",
  "password": "password123!",
  "fullName": "ABC 주식회사",
  "role": "CORPORATE"
}
```

**기대 결과:**
- ✅ `users_auth` 테이블에 레코드 생성 (`userType = CORPORATE`)
- ✅ `profiles_corporate` 테이블에 초기 프로필 생성 (`verificationStatus = PENDING`)

### 3. 이메일 중복 테스트 (One Account Policy)
```bash
# 1) 개인 회원으로 가입
POST /auth/register
{ "email": "test@test.com", "role": "INDIVIDUAL", ... }

# 2) 같은 이메일로 기업 회원 가입 시도
POST /auth/register
{ "email": "test@test.com", "role": "CORPORATE", ... }
```

**기대 결과:**
- ❌ **에러 발생**: `"이미 개인 회원으로 가입된 이메일입니다."`
- ✅ 가입 차단됨

### 4. 소셜 로그인 테스트 (Google)
```bash
# 1) 첫 로그인 (신규 가입)
GET http://localhost:8000/auth/google/callback?code=...

# 2) 두 번째 로그인 (기존 회원)
GET http://localhost:8000/auth/google/callback?code=...
```

**기대 결과:**
- ✅ 첫 로그인: 신규 회원가입 (트랜잭션으로 User + IndividualProfile 생성)
- ✅ 두 번째 로그인: 기존 회원으로 로그인 (`lastLoginAt` 업데이트)

### 5. 소셜 계정 통합 방지 테스트
```bash
# 1) 일반 이메일로 가입
POST /auth/register
{ "email": "user@gmail.com", "role": "INDIVIDUAL", ... }

# 2) 같은 이메일의 Google 계정으로 소셜 로그인 시도
GET /auth/google/callback (Google email = user@gmail.com)
```

**기대 결과:**
- ❌ **에러 발생**: `"이미 일반 이메일로 가입된 이메일입니다."`
- ✅ 소셜 로그인 차단됨

---

## 📊 DB 스키마 요약

### users_auth (사용자 계정)
| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| auth_id | String (cuid) | PK |
| email | String (unique) | 로그인 ID |
| password_hash | String (nullable) | 이메일 가입자용 (소셜은 NULL) |
| social_provider | Enum | NONE, GOOGLE, FACEBOOK, KAKAO, APPLE |
| social_provider_id | String (nullable) | 소셜에서 주는 고유 ID |
| user_type | Enum | INDIVIDUAL, CORPORATE, ADMIN |
| is_active | Boolean | 계정 활성화 여부 (차단 관리) |
| joined_at | DateTime | 가입일 |
| last_login_at | DateTime (nullable) | 마지막 로그인 |

### profiles_individual (개인 회원 프로필)
| 카테고리 | 주요 필드 |
|----------|-----------|
| 기본 신원 | real_name, nationality, birth_date, gender, address_road |
| 비자 정보 | visa_type, visa_expiry_date (★ 채용 핵심) |
| 구직 선호 | desired_job_type, desired_salary, desired_industries, is_open_to_scout |
| 역량 요약 | final_education_lvl, korean_fluency_lvl, total_career_months |
| 파일/소개 | profile_image_url, resume_file_url, portfolio_url, self_intro |
| 상태 관리 | is_profile_completed (필수 정보 입력 완료 여부) |

### profiles_corporate (기업 회원 프로필)
| 카테고리 | 주요 필드 |
|----------|-----------|
| 기업 필수 | biz_reg_number (unique), company_name_official, ceo_name, founding_date |
| 담당자 정보 | manager_name, manager_phone, manager_email |
| 검증 상태 | verification_status (PENDING/APPROVED/REJECTED), verification_method, proof_document_url |
| 브랜딩 | brand_name, logo_image_url, company_intro |
| 업종/위치 | ksic_code, address_road |
| 전문직 채용 | company_size_type, employee_count_korean, employee_count_foreign, annual_revenue |
| 상태 | is_biz_verified (사업자등록번호 검증 여부) |

### 관련 테이블
- **profile_educations**: 학력 정보 (school_name, major_name, degree_level, graduation_status, gpa_score)
- **profile_careers**: 경력 정보 (company_name, duty_role, job_position, start_date, end_date, is_current)
- **profile_languages**: 어학 정보 (language_type, test_type, score_level, obtained_date, expiry_date, is_verified)

---

## ⚠️ 주의사항

### 1. 기존 데이터 마이그레이션
만약 이미 운영 중인 DB에 데이터가 있다면, 마이그레이션 전에 **백업 필수**입니다.

```bash
# PostgreSQL 백업
pg_dump -U postgres -d jobchaja -F c -b -v -f backup_$(date +%Y%m%d).dump
```

### 2. 필수 필드 vs 선택 필드
- **개인 회원**: 회원가입 시 임시값으로 프로필 생성, **나중에 프로필 수정 API**에서 실제 정보 입력
- **기업 회원**: `verificationStatus = PENDING` 상태로 생성, **관리자 승인 후** 공고 등록 가능

### 3. SocialAuth 테이블 제거
기존 `social_auths` 테이블은 **User 테이블에 통합**되었습니다.
- `socialProvider`, `socialProviderId` 컬럼으로 대체
- 기존 소셜 로그인 사용자 데이터가 있다면 **데이터 이관 스크립트 필요**

### 4. 임시값 처리
회원가입 시 필수 필드에 임시값이 들어갑니다:
- 개인: `nationality = 'UNKNOWN'`, `birthDate = '1900-01-01'`, `visaType = 'PENDING'`
- 기업: `bizRegNumber = 'PENDING'`, `managerPhone = 'PENDING'`

→ **프로필 수정 API**를 별도로 구현하여 실제 값으로 교체해야 합니다.

---

## 🔧 다음 단계 (TODO)

### 1. 프로필 수정 API 구현
- [ ] `PATCH /profile/individual` - 개인 프로필 수정
- [ ] `PATCH /profile/corporate` - 기업 프로필 수정
- [ ] 학력/경력/어학 정보 CRUD API

### 2. 사업자 인증 시스템
- [ ] 사업자등록번호 진위확인 API 연동 (공공데이터 포털)
- [ ] 관리자 승인 워크플로우
- [ ] 재직증명서 업로드 및 검증

### 3. 비자 검증 시스템
- [ ] 비자 유효기간 만료 알림
- [ ] 채용 가능 비자 타입 필터링 로직
- [ ] 불법 취업 방지 체크

### 4. 권한 관리
- [ ] `verification_status = PENDING`인 기업은 공고 등록 차단
- [ ] `is_profile_completed = false`인 개인은 지원 차단
- [ ] `is_active = false`인 사용자 접근 차단

---

## 📞 문의 및 지원

구현 과정에서 문제가 발생하거나 추가 기능이 필요하면 언제든지 문의하세요!

- 에러 메시지와 함께 문의 시 빠른 해결 가능
- DB 스키마 추가 확장이 필요하면 요청 가능

---

**구현 완료 일자:** 2026-02-11
**작성자:** Claude Sonnet 4.5
