/**
 * Language institutes seed script
 * 주요 대학 부설 어학당 데이터 시드
 *
 * Seeds language institutes affiliated with major universities
 */

import { PrismaClient } from '../generated/prisma-user';

const prisma = new PrismaClient();

/**
 * 어학당 데이터 인터페이스 / Language institute data interface
 */
interface LanguageInstitute {
  name: string; // 한글명 / Korean name
  nameEn: string; // 영문명 / English name
  affiliatedUniversity: string; // 소속 대학 / Affiliated university
  address: string; // 주소 / Address
  latitude: number; // 위도 / Latitude
  longitude: number; // Longitude
  isMetroArea: boolean; // 수도권 여부 / Is metro area
}

/**
 * 주요 대학 어학당 목록 / Major university language institutes
 * TODO: 추가 데이터 수집 필요 / Additional data collection needed
 */
const LANGUAGE_INSTITUTES: LanguageInstitute[] = [
  // 서울 지역 / Seoul area
  {
    name: '서울대학교 언어교육원',
    nameEn: 'Seoul National University Language Education Institute',
    affiliatedUniversity: '서울대학교',
    address: '서울특별시 관악구 관악로 1',
    latitude: 37.460123,
    longitude: 126.952012,
    isMetroArea: true,
  },
  {
    name: '연세대학교 한국어학당',
    nameEn: 'Yonsei University Korean Language Institute',
    affiliatedUniversity: '연세대학교',
    address: '서울특별시 서대문구 연세로 50',
    latitude: 37.564214,
    longitude: 126.937934,
    isMetroArea: true,
  },
  {
    name: '고려대학교 한국어센터',
    nameEn: 'Korea University Korean Language Center',
    affiliatedUniversity: '고려대학교',
    address: '서울특별시 성북구 안암로 145',
    latitude: 37.585318,
    longitude: 127.025632,
    isMetroArea: true,
  },
  {
    name: '성균관대학교 성균어학원',
    nameEn: 'Sungkyunkwan University Korean Language Institute',
    affiliatedUniversity: '성균관대학교',
    address: '서울특별시 종로구 성균관로 25-2',
    latitude: 37.588921,
    longitude: 126.993456,
    isMetroArea: true,
  },
  {
    name: '한양대학교 국제교육원',
    nameEn: 'Hanyang University International Education Institute',
    affiliatedUniversity: '한양대학교',
    address: '서울특별시 성동구 왕십리로 222',
    latitude: 37.558123,
    longitude: 127.044567,
    isMetroArea: true,
  },
  {
    name: '이화여자대학교 언어교육원',
    nameEn: 'Ewha Womans University Language Institute',
    affiliatedUniversity: '이화여자대학교',
    address: '서울특별시 서대문구 이화여대길 52',
    latitude: 37.561234,
    longitude: 126.945678,
    isMetroArea: true,
  },
  {
    name: '경희대학교 국제교육원',
    nameEn: 'Kyung Hee University International Education Institute',
    affiliatedUniversity: '경희대학교',
    address: '서울특별시 동대문구 경희대로 26',
    latitude: 37.595678,
    longitude: 127.051234,
    isMetroArea: true,
  },
  {
    name: '한국외국어대학교 한국어문화교육원',
    nameEn: 'Hankuk University of Foreign Studies Korean Language & Culture Education Center',
    affiliatedUniversity: '한국외국어대학교',
    address: '서울특별시 동대문구 이문로 107',
    latitude: 37.597345,
    longitude: 127.059876,
    isMetroArea: true,
  },
  {
    name: '서강대학교 한국어교육원',
    nameEn: 'Sogang University Korean Language Education Center',
    affiliatedUniversity: '서강대학교',
    address: '서울특별시 마포구 백범로 35',
    latitude: 37.551234,
    longitude: 126.941234,
    isMetroArea: true,
  },
  {
    name: '건국대학교 언어교육원',
    nameEn: 'Konkuk University Language Institute',
    affiliatedUniversity: '건국대학교',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.540567,
    longitude: 127.078901,
    isMetroArea: true,
  },
  {
    name: '국민대학교 국제교육원',
    nameEn: 'Kookmin University International Education Center',
    affiliatedUniversity: '국민대학교',
    address: '서울특별시 성북구 정릉로 77',
    latitude: 37.610987,
    longitude: 126.996543,
    isMetroArea: true,
  },
  {
    name: '숙명여자대학교 한국어교육센터',
    nameEn: 'Sookmyung Women\'s University Korean Language Education Center',
    affiliatedUniversity: '숙명여자대학교',
    address: '서울특별시 용산구 청파로47길 100',
    latitude: 37.545678,
    longitude: 126.964321,
    isMetroArea: true,
  },
  {
    name: '동국대학교 한국어교육원',
    nameEn: 'Dongguk University Korean Language Education Center',
    affiliatedUniversity: '동국대학교',
    address: '서울특별시 중구 필동로1길 30',
    latitude: 37.558765,
    longitude: 127.000123,
    isMetroArea: true,
  },

  // 경기 지역 / Gyeonggi area
  {
    name: '아주대학교 한국어교육센터',
    nameEn: 'Ajou University Korean Language Education Center',
    affiliatedUniversity: '아주대학교',
    address: '경기도 수원시 영통구 월드컵로 206',
    latitude: 37.282123,
    longitude: 127.045678,
    isMetroArea: true,
  },
  {
    name: '단국대학교 한국어교육원',
    nameEn: 'Dankook University Korean Language Institute',
    affiliatedUniversity: '단국대학교',
    address: '경기도 용인시 수지구 죽전로 152',
    latitude: 37.322345,
    longitude: 127.126789,
    isMetroArea: true,
  },
  {
    name: '가톨릭대학교 국제교육원',
    nameEn: 'Catholic University of Korea International Education Center',
    affiliatedUniversity: '가톨릭대학교',
    address: '경기도 부천시 원미구 역곡로 43',
    latitude: 37.486543,
    longitude: 126.797654,
    isMetroArea: true,
  },
  {
    name: '수원대학교 한국어교육원',
    nameEn: 'University of Suwon Korean Language Education Center',
    affiliatedUniversity: '수원대학교',
    address: '경기도 화성시 봉담읍 와우안길 17',
    latitude: 37.236789,
    longitude: 126.965432,
    isMetroArea: true,
  },

  // 인천 지역 / Incheon area
  {
    name: '인천대학교 한국어학당',
    nameEn: 'Incheon National University Korean Language Institute',
    affiliatedUniversity: '인천대학교',
    address: '인천광역시 연수구 아카데미로 119',
    latitude: 37.374567,
    longitude: 126.632109,
    isMetroArea: true,
  },

  // 대전 지역 / Daejeon area
  {
    name: '충남대학교 한국어교육원',
    nameEn: 'Chungnam National University Korean Language Education Center',
    affiliatedUniversity: '충남대학교',
    address: '대전광역시 유성구 대학로 99',
    latitude: 36.368765,
    longitude: 127.344321,
    isMetroArea: false,
  },
  {
    name: '한남대학교 한국어교육원',
    nameEn: 'Hannam University Korean Language Education Center',
    affiliatedUniversity: '한남대학교',
    address: '대전광역시 대덕구 한남로 70',
    latitude: 36.356789,
    longitude: 127.422345,
    isMetroArea: false,
  },

  // 광주 지역 / Gwangju area
  {
    name: '전남대학교 한국어교육원',
    nameEn: 'Chonnam National University Korean Language Education Center',
    affiliatedUniversity: '전남대학교',
    address: '광주광역시 북구 용봉로 77',
    latitude: 35.175432,
    longitude: 126.909876,
    isMetroArea: false,
  },

  // 대구 지역 / Daegu area
  {
    name: '경북대학교 언어교육원',
    nameEn: 'Kyungpook National University Language Education Center',
    affiliatedUniversity: '경북대학교',
    address: '대구광역시 북구 대학로 80',
    latitude: 35.891234,
    longitude: 128.612345,
    isMetroArea: false,
  },
  {
    name: '계명대학교 한국어교육센터',
    nameEn: 'Keimyung University Korean Language Education Center',
    affiliatedUniversity: '계명대학교',
    address: '대구광역시 달서구 달구벌대로 1095',
    latitude: 35.855678,
    longitude: 128.489012,
    isMetroArea: false,
  },

  // 부산 지역 / Busan area
  {
    name: '부산대학교 한국어교육원',
    nameEn: 'Pusan National University Korean Language Education Center',
    affiliatedUniversity: '부산대학교',
    address: '부산광역시 금정구 부산대학로63번길 2',
    latitude: 35.231234,
    longitude: 129.083456,
    isMetroArea: false,
  },
  {
    name: '동아대학교 한국어교육센터',
    nameEn: 'Dong-A University Korean Language Education Center',
    affiliatedUniversity: '동아대학교',
    address: '부산광역시 서구 구덕로 225',
    latitude: 35.120987,
    longitude: 129.022345,
    isMetroArea: false,
  },

  // 울산 지역 / Ulsan area
  {
    name: '울산대학교 국제교육원',
    nameEn: 'University of Ulsan International Education Center',
    affiliatedUniversity: '울산대학교',
    address: '울산광역시 남구 대학로 93',
    latitude: 35.541234,
    longitude: 129.254321,
    isMetroArea: false,
  },

  // 강원 지역 / Gangwon area
  {
    name: '강원대학교 한국어교육센터',
    nameEn: 'Kangwon National University Korean Language Education Center',
    affiliatedUniversity: '강원대학교',
    address: '강원특별자치도 춘천시 강원대학길 1',
    latitude: 37.868765,
    longitude: 127.742109,
    isMetroArea: false,
  },

  // 충북 지역 / Chungbuk area
  {
    name: '충북대학교 한국어교육원',
    nameEn: 'Chungbuk National University Korean Language Education Center',
    affiliatedUniversity: '충북대학교',
    address: '충청북도 청주시 서원구 충대로 1',
    latitude: 36.628765,
    longitude: 127.456789,
    isMetroArea: false,
  },

  // 전북 지역 / Jeonbuk area
  {
    name: '전북대학교 한국어교육센터',
    nameEn: 'Jeonbuk National University Korean Language Education Center',
    affiliatedUniversity: '전북대학교',
    address: '전북특별자치도 전주시 덕진구 백제대로 567',
    latitude: 35.846543,
    longitude: 127.128765,
    isMetroArea: false,
  },

  // 제주 지역 / Jeju area
  {
    name: '제주대학교 한국어교육센터',
    nameEn: 'Jeju National University Korean Language Education Center',
    affiliatedUniversity: '제주대학교',
    address: '제주특별자치도 제주시 제주대학로 102',
    latitude: 33.456789,
    longitude: 126.562345,
    isMetroArea: false,
  },
];

/**
 * 메인 실행 함수 / Main execution function
 */
async function main() {
  console.log('🏫 어학당 데이터 시드 시작 / Starting language institutes seed...\n');

  let insertedCount = 0;
  let skippedCount = 0;

  for (const institute of LANGUAGE_INSTITUTES) {
    try {
      await prisma.educationalInstitution.create({
        data: {
          name: institute.name,
          nameEn: institute.nameEn,
          type: 'LANGUAGE_INSTITUTE',
          address: institute.address,
          addressDetail: null,
          latitude: institute.latitude,
          longitude: institute.longitude,
          isMetroArea: institute.isMetroArea,
          affiliatedUniversity: institute.affiliatedUniversity,
          searchKeywords: [
            institute.name,
            institute.nameEn,
            institute.affiliatedUniversity,
            `${institute.affiliatedUniversity} 어학당`,
            `${institute.affiliatedUniversity} 한국어`,
          ],
          isActive: true,
        },
      });

      insertedCount++;
      console.log(`  ✅ ${institute.name}`);
    } catch (error: any) {
      console.error(`  ⚠️  삽입 실패 - ${institute.name}:`, error.message);
      skippedCount++;
    }
  }

  console.log('\n✅ 시드 완료 / Seed completed');
  console.log(`  총 삽입: ${insertedCount}개 / Total inserted: ${insertedCount}`);
  console.log(`  스킵: ${skippedCount}개 / Skipped: ${skippedCount}`);
}

// 실행 / Execute
main()
  .catch((error) => {
    console.error('❌ 시드 실패 / Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
