/**
 * [JobChaja] 면접 초대 이메일 템플릿
 * Interview Invitation Email Template
 * - Sent to applicant when company requests an interview
 *
 * @param params.applicantName  지원자 이름
 * @param params.companyName    회사명
 * @param params.jobTitle       공고 제목
 * @param params.interviewMethod 면접 방식 ('ONLINE' | 'OFFLINE')
 * @param params.location       면접 장소 또는 온라인 링크
 * @param params.interviewSlots 면접 가능 일시 목록 (optional)
 * @param params.selectSlotUrl  면접 일정 선택 링크
 * @param params.contactEmail   담당자 이메일
 * @param params.contactPhone   담당자 연락처 (optional)
 */

export interface InterviewInvitationParams {
  applicantName: string;
  companyName: string;
  jobTitle: string;
  interviewMethod: 'ONLINE' | 'OFFLINE';
  location: string;
  interviewSlots?: { date: string; time: string }[];
  selectSlotUrl: string;
  contactEmail: string;
  contactPhone?: string;
}

export const getInterviewInvitationTemplate = (
  params: InterviewInvitationParams,
): { subject: string; html: string } => {
  const {
    applicantName,
    companyName,
    jobTitle,
    interviewMethod,
    location,
    interviewSlots,
    selectSlotUrl,
    contactEmail,
    contactPhone,
  } = params;

  const methodLabel =
    interviewMethod === 'ONLINE' ? '온라인 (화상)' : '오프라인 (대면)';
  const methodIcon = interviewMethod === 'ONLINE' ? '💻' : '📍';
  const locationLabel =
    interviewMethod === 'ONLINE' ? '화상 면접 링크' : '면접 장소';

  const slotsHtml =
    interviewSlots && interviewSlots.length > 0
      ? `
          <div style="margin: 20px 0;">
            <p style="font-size: 14px; color: #555; font-weight: 600; margin-bottom: 10px;">면접 가능 일시:</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${interviewSlots
                .map(
                  (slot, idx) => `
                <tr>
                  <td style="padding: 10px 15px; border: 1px solid #e9ecef; background-color: ${idx % 2 === 0 ? '#f8f9fa' : '#ffffff'}; font-size: 14px; color: #333;">
                    📅 ${slot.date} &nbsp;&nbsp; 🕐 ${slot.time}
                  </td>
                </tr>
              `,
                )
                .join('')}
            </table>
          </div>
        `
      : '';

  const subject = `[JobChaja] ${companyName}에서 면접을 요청하였습니다`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>면접 초대</title>
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
            안녕하세요, <strong>${applicantName}</strong>님!<br>
            축하합니다! <strong>${companyName}</strong>에서 면접을 요청하였습니다.
          </p>

          <!-- Job & Interview Info Card -->
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #007bff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888; width: 110px;">공고명</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">회사명</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">면접 방식</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${methodIcon} ${methodLabel}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #888;">${locationLabel}</td>
                <td style="padding: 6px 0; font-size: 14px; color: #333; font-weight: 600;">${location}</td>
              </tr>
            </table>
          </div>

          <!-- Interview Slots (conditional) -->
          ${slotsHtml}

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${selectSlotUrl}" style="display: inline-block; padding: 14px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
              면접 일정 선택하기
            </a>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
              위 버튼을 클릭하여 면접 일정을 선택하거나 새로운 일정을 제안할 수 있습니다.
            </p>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-top: 20px;">
            <p style="font-size: 13px; color: #666; margin: 0 0 8px 0; font-weight: 600;">담당자 연락처</p>
            <p style="font-size: 13px; color: #333; margin: 0;">
              📧 ${contactEmail}${contactPhone ? `<br>📞 ${contactPhone}` : ''}
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
