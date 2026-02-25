/**
 * [JobChaja] 지원 결과 안내 이메일 템플릿
 * Application Result Email Template
 * - Sent to applicant for pass/fail notification
 *
 * @param params.applicantName  지원자 이름
 * @param params.companyName    회사명
 * @param params.jobTitle       공고 제목
 * @param params.result         결과 ('PASS' | 'FAIL')
 * @param params.message        고용주가 작성한 커스텀 메시지 (optional)
 * @param params.nextSteps      합격 시 다음 단계 안내 (optional, PASS only)
 * @param params.dashboardUrl   마이페이지/대시보드 링크
 */

export interface ApplicationResultParams {
  applicantName: string;
  companyName: string;
  jobTitle: string;
  result: 'PASS' | 'FAIL';
  message?: string;
  nextSteps?: string;
  dashboardUrl: string;
}

export const getApplicationResultTemplate = (
  params: ApplicationResultParams,
): { subject: string; html: string } => {
  const {
    applicantName,
    companyName,
    jobTitle,
    result,
    message,
    nextSteps,
    dashboardUrl,
  } = params;

  const isPassed = result === 'PASS';

  const resultColor = isPassed ? '#28a745' : '#6c757d';
  const resultBg = isPassed ? '#e8f5e9' : '#f5f5f5';
  const resultText = isPassed ? '합격' : '불합격';
  const resultIcon = isPassed ? '🎉' : '📋';

  const subjectResult = isPassed ? '합격을 축하합니다' : '지원 결과 안내';
  const subject = `[JobChaja] ${companyName} - ${subjectResult}`;

  const resultSection = isPassed
    ? `
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          안녕하세요, <strong>${applicantName}</strong>님!<br>
          <strong>${companyName}</strong>의 <strong>${jobTitle}</strong> 포지션에 <span style="color: #28a745; font-weight: 700;">합격</span>하셨습니다!
        </p>
      `
    : `
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          안녕하세요, <strong>${applicantName}</strong>님.<br>
          <strong>${companyName}</strong>의 <strong>${jobTitle}</strong> 포지션 지원 결과를 안내드립니다.
        </p>
      `;

  const customMessageHtml = message
    ? `
        <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin: 20px 0; border-left: 4px solid ${resultColor};">
          <p style="font-size: 13px; color: #888; margin: 0 0 5px 0;">담당자 메시지</p>
          <p style="font-size: 14px; color: #333; margin: 0; line-height: 1.6;">${message}</p>
        </div>
      `
    : '';

  const nextStepsHtml =
    isPassed && nextSteps
      ? `
        <div style="background-color: #e8f5e9; border-radius: 6px; padding: 15px; margin: 20px 0;">
          <p style="font-size: 13px; color: #2e7d32; margin: 0 0 5px 0; font-weight: 600;">다음 단계 안내</p>
          <p style="font-size: 14px; color: #333; margin: 0; line-height: 1.6;">${nextSteps}</p>
        </div>
      `
      : '';

  const encouragementHtml = !isPassed
    ? `
        <div style="background-color: #fff8e1; border-radius: 6px; padding: 15px; margin: 20px 0;">
          <p style="font-size: 14px; color: #555; margin: 0; line-height: 1.6;">
            이번 결과에 낙담하지 마세요. JobChaja에는 다양한 채용 기회가 준비되어 있습니다.<br>
            새로운 공고를 확인하고 다시 도전해 보세요!
          </p>
        </div>
      `
    : '';

  const ctaLabel = isPassed ? '다음 단계 확인하기' : '새로운 공고 보기';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>지원 결과 안내</title>
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

          <!-- Result Badge -->
          <div style="text-align: center; margin-bottom: 25px;">
            <span style="display: inline-block; background-color: ${resultBg}; color: ${resultColor}; font-size: 20px; font-weight: 700; padding: 12px 30px; border-radius: 8px; border: 2px solid ${resultColor};">
              ${resultIcon} ${resultText}
            </span>
          </div>

          <!-- Result Message -->
          ${resultSection}

          <!-- Job Info Card -->
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888; width: 80px;">공고명</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">회사명</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${companyName}</td>
              </tr>
            </table>
          </div>

          <!-- Custom Message from Employer -->
          ${customMessageHtml}

          <!-- Next Steps (PASS only) -->
          ${nextStepsHtml}

          <!-- Encouragement (FAIL only) -->
          ${encouragementHtml}

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0 10px 0;">
            <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
              ${ctaLabel}
            </a>
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
