import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { CreateInfoBoardDto } from './dto/create-info-board.dto';
import { InfoBoardQueryDto } from './dto/info-board-query.dto';

/**
 * 정보 게시판 서비스 — 외국인 생활 가이드 CRUD
 * Info board service — foreign worker life guide CRUD
 */
@Injectable()
export class InfoBoardService implements OnModuleInit {
  private readonly logger = new Logger(InfoBoardService.name);

  constructor(private readonly authPrisma: AuthPrismaService) {}

  /**
   * 모듈 초기화 시 시드 데이터 삽입 / Seed data on module init
   */
  async onModuleInit() {
    try {
      const count = await this.authPrisma.infoBoard.count();
      if (count === 0) {
        await this.seedData();
        this.logger.log('Info board seeded with 8 guide posts');
      }
    } catch (e) {
      this.logger.warn(
        'Info board table may not exist yet. Run prisma db push.',
        (e as Error).message,
      );
    }
  }

  /**
   * 목록 조회 (필터+검색+페이징) / List with filter, search, pagination
   */
  async findAll(query: InfoBoardQueryDto) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(query.limit || '10', 10)));
    const skip = (page - 1) * limit;

    // where 조건 / where clause
    const where: Record<string, unknown> = {};
    if (query.category) where.category = query.category;
    if (query.search)
      where.title = { contains: query.search, mode: 'insensitive' };

    const [items, total] = await Promise.all([
      this.authPrisma.infoBoard.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          category: true,
          thumbnail: true,
          createdAt: true,
        },
      }),
      this.authPrisma.infoBoard.count({ where }),
    ]);

    return {
      items: items.map((i) => ({ ...i, id: Number(i.id) })),
      total,
    };
  }

  /**
   * 단건 조회 / Find one by ID
   */
  async findOne(id: number) {
    const post = await this.authPrisma.infoBoard.findUnique({
      where: { id: BigInt(id) },
    });
    if (!post)
      throw new NotFoundException(
        `게시글을 찾을 수 없습니다 (id: ${id}) / Post not found`,
      );
    return { ...post, id: Number(post.id) };
  }

  /**
   * 생성 (어드민 전용) / Create (admin only)
   */
  async create(dto: CreateInfoBoardDto) {
    const post = await this.authPrisma.infoBoard.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
        thumbnail: dto.thumbnail,
      },
    });
    return { ...post, id: Number(post.id) };
  }

  /**
   * 삭제 (어드민 전용) / Delete (admin only)
   */
  async remove(id: number) {
    await this.authPrisma.infoBoard
      .delete({ where: { id: BigInt(id) } })
      .catch(() => {
        throw new NotFoundException(
          `게시글을 찾을 수 없습니다 (id: ${id}) / Post not found`,
        );
      });
    return { deleted: true };
  }

  /**
   * 시드 데이터 — 외국인 생활 가이드 8개 / Seed data — 8 guide posts
   */
  private async seedData() {
    const posts = [
      {
        title: '외국인 등록증(ARC) 발급 완벽 가이드',
        category: 'VISA_INFO' as const,
        content: `■ 외국인 등록증이란?\n한국에 90일 이상 체류하는 모든 외국인은 반드시 외국인 등록증(Alien Registration Card, ARC)을 발급받아야 합니다.\n\n■ 신청 기한\n입국일로부터 90일 이내에 반드시 신청. 기한 초과 시 과태료 부과.\n\n■ 신청 장소\n거주지 관할 출입국·외국인관서\n하이코리아(hikorea.go.kr)에서 사전 예약 가능\n\n■ 필요 서류\n1. 여권 원본\n2. 컬러 사진 1매 (3.5×4.5cm)\n3. 수수료 3만원\n4. 체류지 증명서류 (임대차계약서 등)\n5. 재직증명서 (취업 비자)\n\n■ 발급 소요: 약 2~3주\n■ 주소 변경 시 14일 이내 전입 신고 필요\n■ 분실 시 즉시 재발급 신청 (수수료 3만원)`,
      },
      {
        title: '한국 은행 계좌 개설 방법 (외국인)',
        category: 'LIVING_TIPS' as const,
        content: `■ 필요 서류\n1. 여권 원본\n2. 외국인 등록증 (ARC)\n3. 재직증명서 (급여 계좌 시)\n\n■ 추천 은행\n- 하나은행: 다국어 앱, 외국인 전용 창구\n- 우리은행: 외국인 근로자 특화 서비스\n- 신한은행: 영어/중국어/베트남어 지원\n- IBK기업은행: 수수료 우대\n\n■ 개설 절차\n1. 은행 영업시간(09:00~16:00) 방문\n2. 서류 제출 + 본인 확인\n3. 체크카드 발급\n4. 모바일 뱅킹 앱 설치\n\n■ 해외 송금: 센디, 웨스턴유니온 등 별도 신청`,
      },
      {
        title: '외국인 핸드폰 개통 가이드 (선불/후불)',
        category: 'LIVING_TIPS' as const,
        content: `■ 선불폰 (Prepaid SIM)\n- 여권만으로 개통 가능\n- 편의점·공항에서 구매\n- 추천: 한국선불폰, 에브리폰\n\n■ 후불폰 (Postpaid)\n필요: 여권 + 외국인등록증 + 은행계좌\n통신사: SKT, KT, LG U+\n알뜰폰: 월 2~3만원대\n\n■ 개통 장소\n- 통신사 대리점\n- 대형마트 내 통신 코너\n\n■ 팁\n- 약정 없는 요금제 추천\n- 핸드폰 번호는 은행·보험 등 모든 곳에 등록`,
      },
      {
        title: '외국인 건강보험 가입 안내',
        category: 'LIVING_TIPS' as const,
        content: `■ 직장가입자\n- 고용주가 자동 가입\n- 보험료: 월급의 약 3.5% 본인 부담\n\n■ 지역가입자\n- 입국 6개월 경과 시 의무 가입\n- 보험료: 월 약 13만원\n\n■ 병원 이용\n1. 외국인등록증 제시\n2. 본인부담금만 결제 (약 30%)\n3. 처방전 → 약국에서 약 구매\n\n■ 응급: 119 (무료, 통역 가능)\n■ 상담: 1345 외국인종합안내센터`,
      },
      {
        title: '한국어 무료 교육 프로그램 총정리',
        category: 'EDUCATION' as const,
        content: `■ 세종학당\n- 초급~고급, 온라인 가능 (iksi.or.kr)\n\n■ 사회통합프로그램 (KIIP)\n- 법무부 운영, 비자 가점\n- 이수 시 귀화·영주권 시험 면제\n- 신청: socinet.go.kr\n\n■ 고용센터 한국어 교육\n- E-9, H-2 대상 실용 한국어\n\n■ 다문화가족지원센터\n- 전국 230여 개소\n- 한국어·한국문화 교육\n\n■ EPS-TOPIK 준비\n- 고용허가제(E-9) 취업용\n- 무료 교재: eps.hrdkorea.or.kr`,
      },
      {
        title: '비자 연장·변경 절차 안내',
        category: 'VISA_INFO' as const,
        content: `■ 신청 시기: 만료일 4개월 전 ~ 만료일\n\n■ 신청 장소\n- 하이코리아(hikorea.go.kr) 온라인\n- 출입국·외국인관서 방문\n\n■ 공통 서류\n1. 신청서\n2. 여권 + 외국인등록증\n3. 수수료 6만원\n4. 사진 1매\n\n■ 비자별 추가 서류\n- E-9: 표준근로계약서\n- H-2: 취업확인서\n- E-7: 고용계약서 + 학력증명\n\n■ 비자 변경 수수료: 10만원\n■ 오버스테이 시 벌금 + 출국 명령\n■ 상담: 1345`,
      },
      {
        title: '근로계약서 체크리스트 — 서명 전 필독',
        category: 'POLICY_LAW' as const,
        content: `■ 서명 전 확인 7가지\n\n1. 임금: 최저임금 이상? 주휴수당 포함?\n2. 근무시간: 1일 8시간, 주 40시간 기본\n3. 휴일·휴가: 주 1일 유급 휴일, 연차 15일\n4. 계약 기간: 시작일·종료일 명시\n5. 근무 장소·업무 내용: 실제와 일치?\n6. 숙소·식사 공제: 법정 한도 확인\n7. 해고·퇴직: 퇴직금 기준 (1년 이상)\n\n■ 한국어 + 모국어 계약서 필수\n■ 문제 시: 1350 (고용노동부), 1644-0644 (외국인력지원센터)`,
      },
      {
        title: '최저임금 & 급여 계산 가이드 (2025)',
        category: 'POLICY_LAW' as const,
        content: `■ 2025년 최저임금\n시급: 9,860원\n일급 (8h): 78,880원\n월급 (주40h+주휴): 2,060,740원\n\n■ 주휴수당\n주 15시간 이상 + 개근 시 1일분 추가\n\n■ 급여 공제\n- 국민연금: 4.5%\n- 건강보험: 3.545%\n- 고용보험: 0.9%\n- 소득세\n\n■ 급여일: 매월 정해진 날짜\n■ 퇴직 시 14일 이내 정산\n■ 체불 시: 1350 (고용노동부) 신고`,
      },
    ];

    for (const post of posts) {
      await this.authPrisma.infoBoard.create({ data: post });
    }
  }
}
