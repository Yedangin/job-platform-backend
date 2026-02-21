# 교육기관 데이터 시딩

## 빠른 시작

### 1. CSV 파일 준비
CSV 파일은 이미 `docs/universities_utf8.csv`에 준비되어 있습니다.

### 2. 대학/대학원/전문대학 데이터 삽입
```bash
npx tsx scripts/seed-educational-institutions.ts
```

### 3. 어학당 데이터 삽입
```bash
npx tsx scripts/seed-language-institutes.ts
```

### 4. 데이터 검증
```bash
npx tsx scripts/verify-educational-institutions.ts
```

## 결과

- **총 교육기관**: 2,355개
- **대학교**: 451개
- **전문대학**: 260개
- **대학원**: 1,520개
- **어학당**: 124개

자세한 내용은 `docs/educational-institutions-seeding.md`를 참고하세요.
