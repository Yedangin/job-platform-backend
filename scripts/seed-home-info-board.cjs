const fs = require('node:fs/promises');
const path = require('node:path');
const puppeteer = require('puppeteer');
const { PrismaClient } = require('../generated/prisma-user');

const prisma = new PrismaClient();
const ACTOR_ID = 'local-home-content-seed';
const LOCALES = ['ko', 'en', 'vi', 'th', 'fil'];

const gradientStyles = [
  ['#063B8C', '#0066FF', '#33A1FD'],
  ['#17324D', '#087A55', '#42B883'],
  ['#4C1D3D', '#B4232A', '#F06D6D'],
  ['#3E2A00', '#9A5B00', '#F2B544'],
  ['#19213A', '#4055B5', '#7296F5'],
  ['#2D164C', '#7048A8', '#C277D2'],
  ['#063D46', '#007A8A', '#44B7C2'],
  ['#3B2546', '#9A3F73', '#DF7EA7'],
];

function localized(title, summary, detail) {
  return { title, summary, content: `${summary}\n\n${detail}` };
}

const posts = [
  {
    existingId: 1,
    seedKey: 'arc-guide',
    category: 'VISA_INFO',
    translations: {
      ko: localized('외국인등록증(ARC) 신청 가이드', '한국에서 90일을 초과해 체류할 예정이라면 입국 후 정해진 기간 안에 외국인등록을 신청해야 합니다.', '하이코리아에서 방문 예약 여부와 체류자격별 준비서류를 확인하고, 관할 출입국·외국인관서를 방문하세요.'),
      en: localized('Alien Registration Card (ARC) application guide', 'If you plan to stay in Korea for more than 90 days, you generally need to apply for foreign resident registration within the required period.', 'Check the documents for your status of stay and whether an appointment is required on Hi Korea before visiting the immigration office responsible for your address.'),
      vi: localized('Hướng dẫn đăng ký thẻ cư trú người nước ngoài (ARC)', 'Nếu dự định ở Hàn Quốc quá 90 ngày, bạn thường phải đăng ký cư trú người nước ngoài trong thời hạn quy định.', 'Hãy kiểm tra giấy tờ theo tư cách lưu trú và lịch hẹn trên Hi Korea trước khi đến cơ quan xuất nhập cảnh phụ trách nơi ở.'),
      th: localized('คู่มือสมัครบัตรประจำตัวคนต่างชาติ (ARC)', 'หากวางแผนพำนักในเกาหลีเกิน 90 วัน โดยทั่วไปต้องยื่นจดทะเบียนคนต่างชาติภายในระยะเวลาที่กำหนด', 'ตรวจสอบเอกสารตามสถานะการพำนักและการนัดหมายใน Hi Korea ก่อนเดินทางไปสำนักงานตรวจคนเข้าเมืองที่รับผิดชอบพื้นที่พักอาศัย'),
      fil: localized('Gabay sa pag-apply ng Alien Registration Card (ARC)', 'Kung plano mong manatili sa Korea nang mahigit 90 araw, karaniwang kailangan mong magparehistro bilang dayuhan sa itinakdang panahon.', 'Tingnan sa Hi Korea ang mga dokumento para sa iyong status of stay at kung kailangan ng appointment bago pumunta sa immigration office na sakop ng iyong tirahan.'),
    },
  },
  {
    existingId: 2,
    seedKey: 'bank-account',
    category: 'LIVING_TIPS',
    translations: {
      ko: localized('외국인 한국 은행계좌 개설 안내', '은행과 체류상태에 따라 여권, 외국인등록증, 재직·거주 증빙 등을 요청받을 수 있습니다.', '방문 전에 선택한 지점에 필요한 서류와 해외송금·모바일뱅킹 이용 조건을 문의하세요.'),
      en: localized('Opening a Korean bank account as a foreign resident', 'Required documents vary by bank and residence status, and may include your passport, ARC, and proof of employment or address.', 'Call your chosen branch before visiting to confirm its document, overseas remittance, and mobile banking requirements.'),
      vi: localized('Mở tài khoản ngân hàng Hàn Quốc cho người nước ngoài', 'Giấy tờ cần thiết tùy ngân hàng và tình trạng cư trú, có thể gồm hộ chiếu, ARC và giấy tờ chứng minh việc làm hoặc địa chỉ.', 'Hãy gọi chi nhánh trước khi đến để xác nhận giấy tờ và điều kiện chuyển tiền quốc tế, ngân hàng di động.'),
      th: localized('การเปิดบัญชีธนาคารเกาหลีสำหรับชาวต่างชาติ', 'เอกสารที่ต้องใช้แตกต่างกันตามธนาคารและสถานะการพำนัก อาจรวมถึงหนังสือเดินทาง ARC และหลักฐานการทำงานหรือที่อยู่', 'ติดต่อสาขาก่อนเข้ารับบริการเพื่อยืนยันเอกสาร เงื่อนไขการโอนเงินต่างประเทศ และโมบายแบงก์กิ้ง'),
      fil: localized('Pagbubukas ng Korean bank account bilang dayuhan', 'Nag-iiba ang mga dokumento ayon sa bangko at residence status, at maaaring kailangan ang passport, ARC, at patunay ng trabaho o tirahan.', 'Tawagan ang napiling branch bago pumunta upang kumpirmahin ang requirements para sa dokumento, overseas remittance, at mobile banking.'),
    },
  },
  {
    existingId: 3,
    seedKey: 'mobile-phone',
    category: 'LIVING_TIPS',
    translations: {
      ko: localized('외국인 휴대전화 개통 가이드', '선불 SIM은 여권만으로 가능한 경우가 많고, 후불 요금제는 외국인등록증과 결제수단을 추가로 요구할 수 있습니다.', '통신사 매장에서 본인 명의 개통 여부, 약정기간, 해지비용, 해외 단말 호환성을 확인하세요.'),
      en: localized('Mobile phone service guide for foreign residents', 'Prepaid SIMs often accept a passport, while postpaid plans may also require an ARC and a Korean payment method.', 'At the carrier store, confirm identity registration, contract length, cancellation charges, and compatibility with your phone.'),
      vi: localized('Hướng dẫn đăng ký điện thoại cho người nước ngoài', 'SIM trả trước thường chỉ cần hộ chiếu, còn gói trả sau có thể cần thêm ARC và phương thức thanh toán tại Hàn Quốc.', 'Tại cửa hàng, hãy xác nhận đăng ký chính chủ, thời hạn hợp đồng, phí hủy và khả năng tương thích của điện thoại.'),
      th: localized('คู่มือเปิดใช้โทรศัพท์สำหรับชาวต่างชาติ', 'ซิมเติมเงินมักใช้หนังสือเดินทางได้ ส่วนแพ็กเกจรายเดือนอาจต้องใช้ ARC และช่องทางชำระเงินในเกาหลี', 'สอบถามร้านเครือข่ายเรื่องการลงทะเบียนชื่อผู้ใช้ ระยะสัญญา ค่ายกเลิก และความเข้ากันได้ของโทรศัพท์'),
      fil: localized('Gabay sa mobile phone service para sa foreign residents', 'Madalas passport lang ang kailangan sa prepaid SIM, habang maaaring kailangan din ng ARC at Korean payment method sa postpaid plan.', 'Kumpirmahin sa carrier store ang identity registration, haba ng kontrata, cancellation fee, at compatibility ng iyong phone.'),
    },
  },
  {
    existingId: 5,
    seedKey: 'korean-education',
    category: 'EDUCATION',
    translations: {
      ko: localized('무료·공공 한국어 교육 찾기', '세종학당, 사회통합프로그램(KIIP), 지역 가족센터 등에서 수준별 한국어 과정을 찾을 수 있습니다.', '모집기간, 수업 방식, 수료 인정 범위가 기관마다 다르므로 공식 사이트의 최신 공고를 확인하세요.'),
      en: localized('Finding free and public Korean language courses', 'Korean courses are available through King Sejong Institute, KIIP, and local family or resident support centers.', 'Enrollment periods, class formats, and recognized completion benefits vary, so check each provider’s latest official notice.'),
      vi: localized('Tìm khóa học tiếng Hàn miễn phí và công lập', 'Bạn có thể tìm khóa học tiếng Hàn tại Học viện Sejong, KIIP và các trung tâm hỗ trợ gia đình hoặc cư dân địa phương.', 'Thời gian tuyển sinh, hình thức học và quyền lợi khi hoàn thành khác nhau; hãy xem thông báo chính thức mới nhất.'),
      th: localized('ค้นหาหลักสูตรภาษาเกาหลีฟรีและของภาครัฐ', 'มีหลักสูตรภาษาเกาหลีจากสถาบันเซจง KIIP และศูนย์ช่วยเหลือครอบครัวหรือผู้อยู่อาศัยในท้องถิ่น', 'ช่วงสมัคร รูปแบบชั้นเรียน และสิทธิจากการจบหลักสูตรแตกต่างกัน ควรตรวจสอบประกาศล่าสุดของแต่ละหน่วยงาน'),
      fil: localized('Paghahanap ng libre at pampublikong Korean classes', 'May Korean courses sa King Sejong Institute, KIIP, at mga lokal na family o resident support center.', 'Magkakaiba ang enrollment period, class format, at completion benefits, kaya tingnan ang pinakabagong opisyal na abiso ng provider.'),
    },
  },
  {
    existingId: 6,
    seedKey: 'visa-extension',
    category: 'VISA_INFO',
    translations: {
      ko: localized('체류기간 연장·체류자격 변경 준비', '신청 가능 시기와 준비서류는 현재 체류자격과 변경하려는 체류자격에 따라 달라집니다.', '만료일 전에 하이코리아 또는 1345에서 최신 요건을 확인하고, 필요한 경우 행정사 등 자격 있는 전문가에게 검토를 받으세요.'),
      en: localized('Preparing to extend or change your status of stay', 'Application timing and supporting documents depend on your current status and the status you want to obtain.', 'Before expiry, verify the latest requirements through Hi Korea or 1345 and seek review from a qualified professional when needed.'),
      vi: localized('Chuẩn bị gia hạn hoặc thay đổi tư cách lưu trú', 'Thời điểm nộp đơn và giấy tờ phụ thuộc vào tư cách hiện tại và tư cách bạn muốn chuyển sang.', 'Trước ngày hết hạn, hãy xác nhận yêu cầu mới nhất qua Hi Korea hoặc 1345 và nhờ chuyên gia đủ điều kiện kiểm tra khi cần.'),
      th: localized('การเตรียมต่ออายุหรือเปลี่ยนสถานะการพำนัก', 'ช่วงเวลายื่นคำขอและเอกสารขึ้นอยู่กับสถานะปัจจุบันและสถานะที่ต้องการเปลี่ยน', 'ตรวจสอบข้อกำหนดล่าสุดผ่าน Hi Korea หรือ 1345 ก่อนวันหมดอายุ และขอคำแนะนำจากผู้เชี่ยวชาญที่มีคุณสมบัติเมื่อจำเป็น'),
      fil: localized('Paghahanda sa extension o change of status of stay', 'Nakadepende ang panahon ng aplikasyon at mga dokumento sa kasalukuyan at target mong status of stay.', 'Bago ang expiry, i-check ang pinakabagong requirements sa Hi Korea o 1345 at magpa-review sa kwalipikadong propesyonal kung kailangan.'),
    },
  },
  {
    seedKey: 'exam-guide',
    category: 'EXAM',
    translations: {
      ko: localized('TOPIK·EPS-TOPIK 시험 정보 확인법', 'TOPIK과 EPS-TOPIK은 목적, 응시대상, 접수처가 서로 다른 시험입니다.', '시험일정과 접수자격은 반드시 TOPIK 또는 고용허가제 공식 사이트의 최신 공고에서 확인하세요.'),
      en: localized('How to check TOPIK and EPS-TOPIK exam information', 'TOPIK and EPS-TOPIK have different purposes, eligibility rules, and registration channels.', 'Always verify schedules and eligibility in the latest notice on the official TOPIK or Employment Permit System website.'),
      vi: localized('Cách kiểm tra thông tin thi TOPIK và EPS-TOPIK', 'TOPIK và EPS-TOPIK có mục đích, điều kiện dự thi và kênh đăng ký khác nhau.', 'Luôn kiểm tra lịch thi và điều kiện trong thông báo mới nhất trên trang chính thức của TOPIK hoặc EPS.'),
      th: localized('วิธีตรวจสอบข้อมูลสอบ TOPIK และ EPS-TOPIK', 'TOPIK และ EPS-TOPIK มีวัตถุประสงค์ คุณสมบัติ และช่องทางสมัครที่แตกต่างกัน', 'ตรวจสอบกำหนดการและคุณสมบัติจากประกาศล่าสุดในเว็บไซต์ทางการของ TOPIK หรือระบบอนุญาตจ้างงาน'),
      fil: localized('Paano tingnan ang TOPIK at EPS-TOPIK exam information', 'Magkaiba ang layunin, eligibility, at registration channel ng TOPIK at EPS-TOPIK.', 'Palaging kumpirmahin ang schedule at eligibility sa pinakabagong notice ng opisyal na TOPIK o Employment Permit System website.'),
    },
  },
  {
    seedKey: 'training-guide',
    category: 'TRAINING',
    translations: {
      ko: localized('외국인 대상 직업훈련 찾기', '고용센터, HRD-Net, 지역 외국인주민센터에서 취업역량과 한국 생활에 필요한 훈련을 확인할 수 있습니다.', '과정별 체류자격 제한, 비용, 출석기준, 수료혜택을 신청 전에 확인하세요.'),
      en: localized('Finding vocational training for foreign residents', 'Employment centers, HRD-Net, and local foreign resident centers list training for work skills and life in Korea.', 'Before applying, confirm visa eligibility, fees, attendance requirements, and completion benefits for each course.'),
      vi: localized('Tìm chương trình đào tạo nghề cho người nước ngoài', 'Trung tâm việc làm, HRD-Net và trung tâm cư dân nước ngoài địa phương cung cấp khóa kỹ năng nghề và đời sống Hàn Quốc.', 'Trước khi đăng ký, hãy kiểm tra điều kiện visa, học phí, yêu cầu chuyên cần và quyền lợi khi hoàn thành.'),
      th: localized('ค้นหาการฝึกอาชีพสำหรับชาวต่างชาติ', 'ศูนย์จัดหางาน HRD-Net และศูนย์ผู้อยู่อาศัยต่างชาติในพื้นที่มีหลักสูตรทักษะงานและการใช้ชีวิตในเกาหลี', 'ก่อนสมัครให้ตรวจสอบสิทธิด้านวีซ่า ค่าใช้จ่าย เกณฑ์การเข้าเรียน และประโยชน์เมื่อจบหลักสูตร'),
      fil: localized('Paghahanap ng vocational training para sa foreign residents', 'May work-skill at Korea life training sa employment centers, HRD-Net, at mga lokal na foreign resident center.', 'Bago mag-apply, kumpirmahin ang visa eligibility, bayad, attendance requirements, at completion benefits ng kurso.'),
    },
  },
  {
    seedKey: 'support-events',
    category: 'EVENTS',
    translations: {
      ko: localized('외국인 주민 상담·설명회 일정 찾기', '지자체와 외국인주민센터는 생활, 노무, 체류 관련 무료 상담과 설명회를 수시로 운영합니다.', '거주 지역 공식 홈페이지에서 날짜, 지원 언어, 예약 여부를 확인한 뒤 참여하세요.'),
      en: localized('Finding consultation sessions and events for foreign residents', 'Local governments and foreign resident centers regularly offer free sessions on daily life, labor, and immigration topics.', 'Check your local authority’s official website for dates, supported languages, and reservation requirements.'),
      vi: localized('Tìm lịch tư vấn và sự kiện cho cư dân nước ngoài', 'Chính quyền và trung tâm cư dân nước ngoài thường tổ chức tư vấn miễn phí về đời sống, lao động và lưu trú.', 'Hãy xem trang chính thức của địa phương để biết ngày, ngôn ngữ hỗ trợ và yêu cầu đặt chỗ.'),
      th: localized('ค้นหากิจกรรมและการให้คำปรึกษาสำหรับชาวต่างชาติ', 'หน่วยงานท้องถิ่นและศูนย์ผู้อยู่อาศัยต่างชาติจัดคำปรึกษาฟรีเรื่องชีวิต แรงงาน และการพำนักเป็นประจำ', 'ตรวจสอบวัน ภาษา และการจองจากเว็บไซต์ทางการของหน่วยงานในพื้นที่ก่อนเข้าร่วม'),
      fil: localized('Paghahanap ng consultation at events para sa foreign residents', 'Regular na nag-aalok ang local governments at foreign resident centers ng libreng session tungkol sa daily life, labor, at immigration.', 'Tingnan ang opisyal na website ng iyong lokal na awtoridad para sa petsa, wika, at reservation requirements.'),
    },
  },
];

async function renderGradient(filePath, colors, index) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 700, deviceScaleFactor: 1 });
    await page.setContent(`<!doctype html><html><style>
      html,body{margin:0;width:100%;height:100%;overflow:hidden}
      body{position:relative;background:linear-gradient(118deg,${colors[0]} 0%,${colors[1]} 58%,${colors[2]} 100%)}
      body:before{content:'';position:absolute;width:760px;height:760px;right:-180px;top:-330px;border:2px solid rgba(255,255,255,.22);border-radius:50%;box-shadow:0 0 0 100px rgba(255,255,255,.04),0 0 0 220px rgba(255,255,255,.03)}
      body:after{content:'${String(index + 1).padStart(2, '0')}';position:absolute;right:70px;bottom:-70px;color:rgba(255,255,255,.10);font:900 360px/1 Arial,sans-serif}
    </style><body></body></html>`);
    await page.screenshot({ path: filePath, type: 'png' });
  } finally {
    await browser.close();
  }
}

async function findOrCreatePost(item, index) {
  let post = item.existingId
    ? await prisma.infoBoard.findUnique({ where: { id: BigInt(item.existingId) } })
    : await prisma.infoBoard.findFirst({
        where: { createdBy: ACTOR_ID, title: item.translations.ko.title },
      });

  const baseData = {
    title: item.translations.ko.title,
    content: item.translations.ko.content,
    category: item.category,
    status: 'PUBLISHED',
    audience: 'ALL',
    isPinned: false,
    isFeatured: true,
    featuredOrder: index + 1,
    bannerTheme: 'BRAND',
    featuredStartAt: null,
    featuredEndAt: null,
    scheduledAt: null,
    publishedAt: new Date(Date.now() - index * 60_000),
    deletedAt: null,
    deletedBy: null,
    updatedBy: ACTOR_ID,
  };

  if (post) {
    post = await prisma.infoBoard.update({
      where: { id: post.id },
      data: { ...baseData, version: { increment: 1 } },
    });
  } else {
    post = await prisma.infoBoard.create({
      data: { ...baseData, createdBy: ACTOR_ID },
    });
  }

  for (const locale of LOCALES) {
    const translation = item.translations[locale];
    await prisma.infoBoardTranslation.upsert({
      where: { postId_locale: { postId: post.id, locale } },
      update: translation,
      create: { postId: post.id, locale, ...translation },
    });
  }

  const filename = `home-slider-${item.seedKey}.png`;
  const storageKey = `uploads/info-board/${filename}`;
  const absolutePath = path.resolve(process.cwd(), storageKey);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await renderGradient(absolutePath, gradientStyles[index], index);
  const stat = await fs.stat(absolutePath);
  const asset = await prisma.infoBoardAsset.upsert({
    where: { storageKey },
    update: {
      postId: post.id,
      originalName: filename,
      mimeType: 'image/png',
      sizeBytes: stat.size,
      uploadedBy: ACTOR_ID,
    },
    create: {
      postId: post.id,
      storageKey,
      originalName: filename,
      mimeType: 'image/png',
      sizeBytes: stat.size,
      uploadedBy: ACTOR_ID,
    },
  });

  const oldMappings = await prisma.infoBoardFeaturedBanner.findMany({
    where: { postId: post.id },
    select: { assetId: true },
  });
  await prisma.infoBoardFeaturedBanner.deleteMany({ where: { postId: post.id } });
  await prisma.infoBoardFeaturedBanner.create({
    data: { postId: post.id, locale: 'ko', assetId: asset.id },
  });
  await prisma.infoBoard.update({
    where: { id: post.id },
    data: { bannerAssetId: asset.id },
  });

  const obsoleteIds = oldMappings
    .map(({ assetId }) => assetId)
    .filter((assetId) => assetId !== asset.id);
  if (obsoleteIds.length > 0) {
    await prisma.infoBoardAsset.updateMany({
      where: { id: { in: obsoleteIds }, postId: post.id },
      data: { postId: null },
    });
  }

  return post.id;
}

async function main() {
  const selectedIds = [];
  for (let index = 0; index < posts.length; index += 1) {
    selectedIds.push(await findOrCreatePost(posts[index], index));
  }

  await prisma.infoBoard.updateMany({
    where: { isFeatured: true, id: { notIn: selectedIds } },
    data: {
      isFeatured: false,
      featuredOrder: null,
      featuredStartAt: null,
      featuredEndAt: null,
      bannerAssetId: null,
    },
  });

  const seeded = await prisma.infoBoard.findMany({
    where: { id: { in: selectedIds } },
    orderBy: { featuredOrder: 'asc' },
    include: { translations: true, featuredBanners: true },
  });
  console.log(
    JSON.stringify(
      seeded.map((post) => ({
        id: Number(post.id),
        order: post.featuredOrder,
        category: post.category,
        locales: post.translations.map((translation) => translation.locale),
        bannerLocales: post.featuredBanners.map((banner) => banner.locale),
      })),
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
