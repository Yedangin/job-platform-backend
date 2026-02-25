/**
 * [JobChaja] 새 지원자 알림 이메일 템플릿
 * New Application Alert Email Template
 * - Sent to employer when someone applies to their job posting
 *
 * @param params.employerName      고용주 이름 또는 담당자 이름
 * @param params.applicantName     지원자 이름 (비공개 시 'New Applicant')
 * @param params.jobTitle          공고 제목
 * @param params.applicationDate   지원 일시 (formatted string)
 * @param params.viewApplicantUrl  지원자 상세 보기 링크
 * @param params.totalApplications 해당 공고 총 지원자 수
 */

export interface NewApplicationAlertParams {
  employerName: string;
  applicantName: string;
  jobTitle: string;
  applicationDate: string;
  viewApplicantUrl: string;
  totalApplications: number;
}

export const getNewApplicationAlertTemplate = (
  params: NewApplicationAlertParams,
): { subject: string; html: string } => {
  const {
    employerName,
    applicantName,
    jobTitle,
    applicationDate,
    viewApplicantUrl,
    totalApplications,
  } = params;

  const subject = `[JobChaja] 새로운 지원자가 접수되었습니다 - ${jobTitle}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>새 지원자 알림</title>
    </head>
    <body style="font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #f4f5f7; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; margin-top: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: 800;">JobChaja</h1>
          <p style="color: #888; font-size: 14px; margin-top: 5px;">Global Job Platform for Foreigners</p>
        </div>

        <!-- Content -->
        <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 30px 0;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            안녕하세요, <strong>${employerName}</strong>님!<br>
            귀사의 채용 공고에 새로운 지원자가 접수되었습니다.
          </p>

          <!-- Application Info Card -->
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888; width: 100px;">공고명</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">지원자</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${applicantName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">지원 일시</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${applicationDate}</td>
              </tr>
            </table>
          </div>

          <!-- Stats Badge -->
          <div style="text-align: center; margin: 25px 0;">
            <div style="display: inline-block; background-color: #e8f4fd; border-radius: 20px; padding: 10px 25px;">
              <span style="font-size: 13px; color: #0069d9;">이 공고 총 지원자 수: </span>
              <span style="font-size: 18px; font-weight: 700; color: #007bff;">${totalApplications}명</span>
            </div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0 10px 0;">
            <a href="${viewApplicantUrl}" style="display: inline-block; padding: 14px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
              지원자 상세 보기
            </a>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
              지원자의 이력서와 자기소개서를 확인하고 면접을 요청하세요.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>본 메일은 발신 전용입니다.<br>&copy; 2026 JobChaja. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;

  return { subject, html };
};
