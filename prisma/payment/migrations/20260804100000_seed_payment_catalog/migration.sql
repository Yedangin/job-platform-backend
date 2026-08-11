-- Seed the launch catalog without overwriting prices already managed in an
-- existing deployment. Checkout always reads the authoritative DB price.
INSERT INTO "products" (
    "product_code", "product_name", "product_name_en", "product_category",
    "price", "description", "is_active", "metadata", "created_at", "updated_at"
)
VALUES
    ('JOB_PREMIUM', '프리미엄 공고 (레거시)', 'Premium Job Posting (Legacy)', 'JOB_POSTING', 50000, '레거시 상품', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PREMIUM_7D', '상위노출 7일 (레거시)', 'Premium 7D (Legacy)', 'JOB_POSTING', 19000, '레거시 상품', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PREMIUM_14D', '상위노출 14일 (레거시)', 'Premium 14D (Legacy)', 'JOB_POSTING', 29000, '레거시 상품', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PREMIUM_30D', '상위노출 30일 (레거시)', 'Premium 30D (Legacy)', 'JOB_POSTING', 50000, '레거시 상품', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PREMIUM_60D', '상위노출 60일 (레거시)', 'Premium 60D (Legacy)', 'JOB_POSTING', 79000, '레거시 상품', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ALBA_PREMIUM_7D', '알바채용관 상위노출 7일', 'Part-time Premium 7 Days', 'JOB_POSTING', 19000, '알바채용관 상위 영역 7일 노출', true, '{"durationDays":7,"boardType":"PART_TIME","originalPrice":49000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ALBA_PREMIUM_14D', '알바채용관 상위노출 14일', 'Part-time Premium 14 Days', 'JOB_POSTING', 29000, '알바채용관 상위 영역 14일 노출', true, '{"durationDays":14,"boardType":"PART_TIME","originalPrice":79000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ALBA_PREMIUM_30D', '알바채용관 상위노출 30일', 'Part-time Premium 30 Days', 'JOB_POSTING', 50000, '알바채용관 상위 영역 30일 노출', true, '{"durationDays":30,"boardType":"PART_TIME","originalPrice":130000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ALBA_PREMIUM_60D', '알바채용관 상위노출 60일', 'Part-time Premium 60 Days', 'JOB_POSTING', 79000, '알바채용관 상위 영역 60일 노출', true, '{"durationDays":60,"boardType":"PART_TIME","originalPrice":199000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FULL_PREMIUM_7D', '정규채용관 상위노출 7일', 'Full-time Premium 7 Days', 'JOB_POSTING', 19000, '정규채용관 상위 영역 7일 노출', true, '{"durationDays":7,"boardType":"FULL_TIME","originalPrice":49000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FULL_PREMIUM_14D', '정규채용관 상위노출 14일', 'Full-time Premium 14 Days', 'JOB_POSTING', 29000, '정규채용관 상위 영역 14일 노출', true, '{"durationDays":14,"boardType":"FULL_TIME","originalPrice":79000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FULL_PREMIUM_30D', '정규채용관 상위노출 30일', 'Full-time Premium 30 Days', 'JOB_POSTING', 50000, '정규채용관 상위 영역 30일 노출', true, '{"durationDays":30,"boardType":"FULL_TIME","originalPrice":130000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FULL_PREMIUM_60D', '정규채용관 상위노출 60일', 'Full-time Premium 60 Days', 'JOB_POSTING', 79000, '정규채용관 상위 영역 60일 노출', true, '{"durationDays":60,"boardType":"FULL_TIME","originalPrice":199000}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('JOB_EXTENSION', '공고 연장', 'Job Posting Extension', 'JOB_POSTING', 25000, '공고 노출 기간 연장', true, '{"extensionDays":{"standard":{"partTime":14,"fullTime":30},"premium":{"partTime":30,"fullTime":60}}}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_1', '인재 열람 단건', 'Single Talent View', 'TALENT_VIEW', 1000, '인재 이력서 1건 열람', true, '{"credits":1,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_5', '인재 열람 미니', 'Mini Talent View', 'TALENT_VIEW', 4500, '인재 이력서 5건 열람', true, '{"credits":5,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_10', '인재 열람 라이트', 'Light Talent View', 'TALENT_VIEW', 8000, '인재 이력서 10건 열람', true, '{"credits":10,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_30', '인재 열람 스탠다드', 'Standard Talent View', 'TALENT_VIEW', 21000, '인재 이력서 30건 열람', true, '{"credits":30,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_50', '인재 열람 비즈니스', 'Business Talent View', 'TALENT_VIEW', 30000, '인재 이력서 50건 열람', true, '{"credits":50,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIEW_100', '인재 열람 프로', 'Pro Talent View', 'TALENT_VIEW', 50000, '인재 이력서 100건 열람', true, '{"credits":100,"validDays":90}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('BUMP_UP', '끌어올리기', 'Bump Up', 'ADDON', 10000, '공고 목록 최상단 재노출', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('URGENT_BADGE', '긴급 채용 배지', 'Urgent Badge', 'ADDON', 20000, '긴급 채용 아이콘 표시', false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FEATURED', '홈 추천', 'Featured Posting', 'ADDON', 50000, '메인 페이지 추천 영역 7일 노출', false, '{"durationDays":7}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("product_code") DO NOTHING;
