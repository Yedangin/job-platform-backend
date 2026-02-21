# Payment Manual Test Guide / 결제 수동 테스트 가이드

> 포트원 sandbox 환경에서 1회만 수동 검증하세요.
> Run these checks once in PortOne sandbox environment.

---

## 사전 준비 / Prerequisites

### 1. 환경 변수 설정 / Environment variables

```env
# .env (backend)
PORTONE_V2_API_SECRET=<포트원 V2 API 시크릿>
PORTONE_WEBHOOK_SECRET=<포트원 웹훅 시크릿>
PORTONE_STORE_ID=<포트원 스토어 ID>
PORTONE_CHANNEL_KEY=<포트원 채널 키>
```

### 2. 서버 실행 / Start servers

```bash
# 백엔드 (port 8000)
cd job-platform-backend
npm run start:dev

# 프론트엔드 (port 3000)
cd job-chaja-website
npm run dev
```

### 3. 포트원 대시보드 설정 / PortOne dashboard setup

1. [PortOne Console](https://admin.portone.io) 로그인
2. **결제 연동** > **채널 관리** > 테스트 채널 활성화
3. **웹훅** > URL 등록: `https://<your-ngrok-or-tunnel>/payments/webhook`
4. 웹훅 시크릿 키를 `.env`에 설정

---

## 테스트 체크리스트 / Test Checklist

### Test 1: 결제창 정상 표시 / Payment window displays correctly

```
1. 로그인: admin / adminpage1!
2. 공고 등록 페이지 → 유료 상품 선택 (프리미엄 공고)
3. "결제하기" 클릭
4. ✅ 포트원 결제창이 정상 표시되는지 확인
5. ✅ 상품명, 금액이 올바르게 표시되는지 확인
```

- [ ] 결제창 정상 표시
- [ ] 상품명/금액 일치

### Test 2: 테스트 카드 결제 / Test card payment

```
1. 결제창에서 "카드 결제" 선택
2. 포트원 제공 테스트 카드 번호 사용:
   - 카드번호: 4580 0000 0000 1234 (테스트)
   - 유효기간: 미래 아무 날짜
   - 비밀번호 앞 2자리: 00
3. 결제 진행
4. ✅ 결제 성공 콜백(paymentId) 수신 확인
5. ✅ /payments/success 페이지로 리다이렉트 확인
```

- [ ] 결제 성공 콜백 수신
- [ ] 성공 페이지 리다이렉트

### Test 3: 서버 결제 확인 / Server confirmPayment

```
1. 결제 성공 후 서버 로그 확인:
   [Payment] 결제 확인 완료: orderId=..., portonePaymentId=...
2. DB 확인 (Payment DB):
   - Order: status=PAID
   - Payment: status=PAID, portonePaymentId 존재
3. ✅ 상품 효과 적용 확인:
   - JOB_PREMIUM: 공고 tier=PREMIUM, expiresAt 갱신
   - VIEW_xx: ViewingCredit 레코드 생성
```

- [ ] 서버 로그에 결제 확인 로그
- [ ] DB Order/Payment 상태 PAID
- [ ] 상품 효과 정상 적용

### Test 4: 웹훅 수신 / Webhook receipt

```
1. 포트원 대시보드 > 웹훅 로그 확인
2. ✅ 웹훅 전송 상태: 성공 (200 응답)
3. 서버 로그 확인:
   [Webhook] 이벤트 수신: type=Transaction.Paid, paymentId=...
4. ✅ 중복 웹훅 무시 확인 (이미 PAID 상태면 스킵)
```

- [ ] 웹훅 정상 수신 (200 응답)
- [ ] 중복 처리 안 함

### Test 5: 결제 취소 / Payment cancellation

```
1. 어드민 페이지: /admin/payments
2. 주문 목록에서 방금 결제한 주문 찾기
3. "환불" 클릭 → 사유 입력 → 확인
4. ✅ 포트원 취소 API 호출 확인 (서버 로그):
   [PortOne] POST .../cancel — reason: ...
5. ✅ DB 상태 확인:
   - Order: status=CANCELLED
   - Payment: status=CANCELLED, cancelledAt 존재
6. ✅ 상품 효과 롤백:
   - JOB_PREMIUM: tier=STANDARD 복원
   - VIEW_xx: ViewingCredit 삭제
```

- [ ] 포트원 취소 API 호출
- [ ] DB 상태 CANCELLED
- [ ] 상품 효과 롤백 완료

---

## 쿠폰 테스트 / Coupon Test

```
1. 새 기업 회원 가입
2. ✅ WELCOME_VIEW_5 자동 발급 확인 (서버 로그)
3. 첫 공고 등록
4. ✅ FIRST_POST_VIEW_5 자동 발급 확인 (서버 로그)
5. /payments/credits 페이지에서 잔고 확인: 10건
6. 인재 검색 → 이력서 열람 → 잔고 차감 확인
```

- [ ] 환영 쿠폰 자동 발급
- [ ] 첫 공고 쿠폰 자동 발급
- [ ] 열람권 잔고 정확

---

## 확인 완료 서명 / Sign-off

| 항목 | 통과 | 날짜 | 담당자 |
|------|------|------|--------|
| 결제창 표시 | | | |
| 카드 결제 | | | |
| 서버 확인 | | | |
| 웹훅 수신 | | | |
| 결제 취소 | | | |
| 쿠폰 발급 | | | |

---

## 트러블슈팅 / Troubleshooting

### 결제창이 안 뜰 때 / Payment window doesn't open
- `PORTONE_STORE_ID`, `PORTONE_CHANNEL_KEY` 확인
- 브라우저 콘솔에서 `@portone/browser-sdk` 에러 확인
- 포트원 대시보드에서 채널 활성화 상태 확인

### 웹훅이 안 올 때 / Webhook not received
- ngrok/tunnel이 백엔드 port 8000으로 연결되어 있는지 확인
- 포트원 웹훅 URL이 정확한지 확인: `https://<tunnel>/payments/webhook`
- `PORTONE_WEBHOOK_SECRET` 값이 포트원 대시보드와 일치하는지 확인

### 결제 취소 실패 / Cancel failed
- 이미 취소된 건인지 확인 (중복 취소 불가)
- 포트원 대시보드에서 취소 상태 직접 확인
- 서버 에러 로그: `[PortOne] Cancel failed: ...` 확인
