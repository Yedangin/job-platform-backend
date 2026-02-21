# 어학당 데이터 추가 방법

## 1. studyinkorea.go.kr에서 데이터 수집

1. https://www.studyinkorea.go.kr/ko/search_v1.do 접속
2. "어학당" 필터 체크
3. 검색 결과를 복사하여 `language-institutes.json` 파일 생성

## 2. JSON 파일 형식

\`\`\`json
[
  {
    "name": "서울대학교 언어교육원",
    "nameEn": "Seoul National University Language Education Institute",
    "address": "서울특별시 관악구 관악로 1",
    "affiliatedUniversity": "서울대학교",
    "website": "https://lei.snu.ac.kr",
    "phone": "02-880-5000"
  },
  {
    "name": "연세대학교 한국어학당",
    "nameEn": "Yonsei University Korean Language Institute",
    "address": "서울특별시 서대문구 연세로 50",
    "affiliatedUniversity": "연세대학교"
  }
]
\`\`\`

## 3. DB에 삽입

\`\`\`bash
npx tsx scripts/import-language-institutes-from-json.ts
\`\`\`

## 4. 중복 처리

- 이미 존재하는 어학당은 자동으로 업데이트됩니다.
- 새로운 어학당만 삽입됩니다.
