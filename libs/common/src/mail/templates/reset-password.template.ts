/**
 * [JobChaja] 이메일 인증번호(OTP) 발송 템플릿
 * @param code 6자리 인증번호
 */
export const getEmailVerificationTemplate = (code: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>이메일 인증</title>
    </head>
    <body style="font-family: 'Pretendard', sans-serif; background-color: #f4f5f7; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; margin-top: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: 800;">JobChaja</h1>
          <p style="color: #888; font-size: 14px; margin-top: 5px;">Global Job Platform for Foreigners</p>
        </div>
        
        <div style="text-align: center; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 30px 0;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            안녕하세요!<br>
            JobChaja 서비스를 이용해 주셔서 감사합니다.<br>
            아래 <strong>인증 번호</strong>를 입력하여 본인 인증을 완료해 주세요.
          </p>
          
          <div style="margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 8px; background-color: #f0f7ff; padding: 15px 30px; border-radius: 8px; display: inline-block;">
              ${code}
            </span>
          </div>
          
          <p style="font-size: 13px; color: #dc3545; font-weight: bold;">
            ⚠️ 이 코드는 3분 동안만 유효합니다.
          </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>본 메일은 발신 전용입니다.<br>© 2026 JobChaja. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;
};
