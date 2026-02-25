/**
 * [JobChaja] 면접 확정 안내 이메일 템플릿
 * Interview Confirmed Email Template
 * - Sent to both applicant and employer when an interview is confirmed
 *
 * @param params.recipientName     수신자 이름 (지원자 또는 고용주)
 * @param params.recipientRole     수신자 역할 ('APPLICANT' | 'EMPLOYER')
 * @param params.applicantName     지원자 이름
 * @param params.companyName       회사명
 * @param params.jobTitle          공고 제목
 * @param params.interviewDate     면접 일자 (formatted string, e.g. '2026년 3월 5일')
 * @param params.interviewTime     면접 시간 (formatted string, e.g. '오후 2:00')
 * @param params.interviewMethod   면접 방식 ('ONLINE' | 'OFFLINE')
 * @param params.location          면접 장소 또는 온라인 링크
 * @param params.rescheduleUrl     일정 변경/취소 링크
 * @param params.contactEmail      상대방 또는 담당자 이메일 (optional)
 */

export interface InterviewConfirmedParams {
  recipientName: string;
  recipientRole: 'APPLICANT' | 'EMPLOYER';
  applicantName: string;
  companyName: string;
  jobTitle: string;
  interviewDate: string;
  interviewTime: string;
  interviewMethod: 'ONLINE' | 'OFFLINE';
  location: string;
  rescheduleUrl: string;
  contactEmail?: string;
}

export const getInterviewConfirmedTemplate = (
  params: InterviewConfirmedParams,
): { subject: string; html: string } => {
  const {
    recipientName,
    recipientRole,
    applicantName,
    companyName,
    jobTitle,
    interviewDate,
    interviewTime,
    interviewMethod,
    location,
    rescheduleUrl,
    contactEmail,
  } = params;

  const methodLabel =
    interviewMethod === 'ONLINE' ? '온라인 (화상)' : '오프라인 (대면)';
  const methodIcon = interviewMethod === 'ONLINE' ? '💻' : '📍';
  const locationLabel =
    interviewMethod === 'ONLINE' ? '화상 면접 링크' : '면접 장소';

  const counterpartLabel =
    recipientRole === 'APPLICANT' ? '면접 기업' : '지원자';
  const counterpartName =
    recipientRole === 'APPLICANT' ? companyName : applicantName;

  const subject = `[JobChaja] 면접 일정이 확정되었습니다 - ${jobTitle}`;

  const contactHtml = contactEmail
    ? `
        <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-top: 20px;">
          <p style="font-size: 13px; color: #666; margin: 0 0 5px 0; font-weight: 600;">문의 연락처</p>
          <p style="font-size: 13px; color: #333; margin: 0;">📧 ${contactEmail}</p>
        </div>
      `
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>면접 확정 안내</title>
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

          <!-- Confirmed Badge -->
          <div style="text-align: center; margin-bottom: 25px;">
            <span style="display: inline-block; background-color: #e8f5e9; color: #28a745; font-size: 18px; font-weight: 700; padding: 10px 25px; border-radius: 8px; border: 2px solid #28a745;">
              면접 확정
            </span>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            안녕하세요, <strong>${recipientName}</strong>님!<br>
            아래와 같이 면접 일정이 확정되었습니다.
          </p>

          <!-- Interview Details Card -->
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888; width: 110px;">공고명</td>
                <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">${counterpartLabel}</td>
                <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${counterpartName}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 8px 0;">
                  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0;">
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">면접 일자</td>
                <td style="padding: 8px 0; font-size: 15px; color: #007bff; font-weight: 700;">${interviewDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">면접 시간</td>
                <td style="padding: 8px 0; font-size: 15px; color: #007bff; font-weight: 700;">${interviewTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">면접 방식</td>
                <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${methodIcon} ${methodLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">${locationLabel}</td>
                <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${location}</td>
              </tr>
            </table>
          </div>

          <!-- Contact Info -->
          ${contactHtml}

          <!-- Reschedule/Cancel Notice -->
          <div style="background-color: #fff3cd; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="font-size: 13px; color: #856404; margin: 0; line-height: 1.6;">
              부득이한 사정으로 일정 변경 또는 취소가 필요한 경우, 면접일 <strong>최소 24시간 전</strong>까지 아래 버튼을 통해 변경해 주세요.
            </p>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0 10px 0;">
            <a href="${rescheduleUrl}" style="display: inline-block; padding: 14px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
              일정 확인 / 변경하기
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
