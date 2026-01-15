import { EmailType } from '@in-job/common';
import { Injectable } from '@nestjs/common';
import {
  EmailTemplate,
  EmailVerificationData,
  GeneralEmailData,
  InterviewEmailData,
} from '../interfaces/email-queue.interface';

@Injectable()
export class EmailTemplateService {
  /**
   * Get email template based on type and data
   */
  getTemplate(type: EmailType, data: any): EmailTemplate | null {
    switch (type) {
      // case EmailType.OTP:
      //   return this.getOTPTemplate(data as OTPEmailData);
      case EmailType.EMAIL_VERIFICATION:
        return this.getEmailVerificationTemplate(data as EmailVerificationData);
      case EmailType.INTERVIEW:
        return this.getInterviewTemplate(data as InterviewEmailData);
      case EmailType.GENERAL:
        return this.getGeneralTemplate(data as GeneralEmailData);
      default:
        return null;
    }
  }

  /**
   * OTP Email Template for Job Chaja
   */
  // private getOTPTemplate(data: OTPEmailData): EmailTemplate {
  //   return {
  //     subject: 'Your OTP Code - Job Chaja',
  //     content: `
  //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //         <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  //                     color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
  //           <h1 style="margin: 0; font-size: 24px;">Job Chaja</h1>
  //         </div>

  //         <div style="padding: 30px; background-color: #f8fafc;">
  //           <h2 style="color: #1e293b; margin-top: 0;">Your One-Time Password</h2>
  //           <p>Hello ${data.name || 'there'},</p>
  //           <p>Your One-Time Password (OTP) for Job Chaja is:</p>

  //           <div style="background-color: #ffffff; border: 2px dashed #4F46E5;
  //                       padding: 25px; text-align: center; margin: 25px 0; border-radius: 8px;">
  //             <h1 style="color: #4F46E5; font-size: 36px; margin: 0; letter-spacing: 5px;">${
  //               data.otp
  //             }</h1>
  //           </div>

  //           <p style="color: #64748b;">This OTP is valid for <strong>${
  //             data.expiresIn
  //           } minutes</strong>.</p>

  //           <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 25px;">
  //             <p style="margin: 0; color: #475569; font-size: 14px;">
  //               <strong>Security Tip:</strong> Never share your OTP with anyone. Job Chaja will never ask for your OTP.
  //             </p>
  //           </div>
  //         </div>

  //         <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
  //           <p style="margin: 0;">
  //             If you didn't request this OTP, please ignore this email or contact support if you're concerned.<br>
  //             © ${new Date().getFullYear()} Job Chaja. All rights reserved.
  //           </p>
  //         </div>
  //       </div>
  //     `,
  //   };
  // }

  /**
   * Email Verification Template for Job Chaja
   */
  private getEmailVerificationTemplate(
    data: EmailVerificationData
  ): EmailTemplate {
    return {
      subject: 'Verify Your Email - Job Chaja',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); 
                      color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Job Chaja</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; margin-top: 0;">Verify Your Email Address</h2>
            
            <p>Hello ${data?.fullName || 'there'},</p>
            <p>Thank you for joining Job Chaja! To complete your registration and start exploring job opportunities, please verify your email address:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.verificationUrl}"
                 style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
                        color: white; padding: 16px 40px; font-size: 16px;
                        text-decoration: none; border-radius: 8px; display: inline-block;
                        font-weight: bold; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; text-align: center;">
              Or copy and paste this link in your browser:<br>
              <span style="word-break: break-all; color: #4F46E5;">${
                data.verificationUrl
              }</span>
            </p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 25px;">
              <p style="margin: 0; color: #475569; font-size: 14px;">
                <strong>Why verify?</strong> Verified accounts get priority in job applications, can apply to more positions, and receive personalized job recommendations.
              </p>
            </div>
            
            <p style="color: #64748b; margin-top: 30px;">
              If you didn't create a Job Chaja account, please ignore this email.
            </p>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">
              This link expires in 24 hours.<br>
              © ${new Date().getFullYear()} Job Chaja. Connect. Apply. Succeed.
            </p>
          </div>
        </div>
      `,
    };
  }

  /**
   * Interview Email Template
   */
  private getInterviewTemplate(data: InterviewEmailData): EmailTemplate {
    const formattedTime = new Date(data.interviewTime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    return {
      subject: `Interview Invitation: ${data.jobTitle} - Job Chaja`,
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); 
                      color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Job Chaja Interview</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; margin-top: 0;">Interview Invitation 🎉</h2>
            
            <p>Dear ${data.candidateName},</p>
            
            <div style="background-color: #ffffff; border-left: 4px solid #10B981; 
                        padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #10B981; margin-top: 0;">${data.jobTitle}</h3>
              <p style="color: #64748b; margin: 5px 0;">Company: ${
                data.companyName
              }</p>
              <p style="color: #64748b; margin: 5px 0;">Interview Type: ${
                data.interviewType
              }</p>
            </div>
            
            <h3 style="color: #1e293b;">📅 Interview Details:</h3>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 15px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Date & Time:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${formattedTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Duration:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${
                    data.duration
                  } minutes</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Location/Platform:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${
                    data.location || data.platform
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Interviewer:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${
                    data.interviewerName
                  }</td>
                </tr>
              </table>
            </div>
            
            ${
              data.meetingLink
                ? `
            <div style="text-align: center; margin: 25px 0;">
              <a href="${data.meetingLink}"
                 style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); 
                        color: white; padding: 16px 40px; font-size: 16px;
                        text-decoration: none; border-radius: 8px; display: inline-block;
                        font-weight: bold; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);">
                🔗 Join Interview Meeting
              </a>
            </div>
            `
                : ''
            }
            
            ${
              data.additionalInstructions
                ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #92400e; margin-top: 0;">📝 Additional Instructions:</h4>
              <p style="color: #92400e; margin: 0;">${data.additionalInstructions}</p>
            </div>
            `
                : ''
            }
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 25px;">
              <h4 style="color: #475569; margin-top: 0;">💡 Preparation Tips:</h4>
              <ul style="color: #475569; padding-left: 20px;">
                <li>Research ${data.companyName} and the role</li>
                <li>Prepare questions for the interviewer</li>
                <li>Test your equipment 15 minutes before</li>
                <li>Have your resume and notes ready</li>
              </ul>
            </div>
            
            <p style="color: #64748b; margin-top: 30px;">
              <strong>Need to reschedule?</strong> Please contact ${
                data.contactPerson || data.companyName
              } at ${data.contactEmail}.
            </p>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">
              Best of luck with your interview!<br>
              © ${new Date().getFullYear()} Job Chaja. Your career journey starts here.
            </p>
          </div>
        </div>
      `,
    };
  }

  /**
   * General Email Template (Promotions, Notices, Updates)
   */
  private getGeneralTemplate(data: GeneralEmailData): EmailTemplate {
    return {
      subject: `${data.title} - Job Chaja`,
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); 
                      color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Job Chaja</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <h2 style="color: #1e293b; margin-top: 0; text-align: center;">${
              data.title
            }</h2>
            
            ${
              data.subtitle
                ? `<p style="color: #64748b; text-align: center; font-size: 18px;">${data.subtitle}</p>`
                : ''
            }
            
            ${
              data.imageUrl
                ? `
            <div style="text-align: center; margin: 25px 0;">
              <img src="${data.imageUrl}" alt="${data.title}" 
                   style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            </div>
            `
                : ''
            }
            
            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; margin: 25px 0;">
              ${data.content}
            </div>
            
            ${
              data.ctaUrl && data.ctaText
                ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.ctaUrl}"
                 style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); 
                        color: white; padding: 16px 40px; font-size: 16px;
                        text-decoration: none; border-radius: 8px; display: inline-block;
                        font-weight: bold; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);">
                ${data.ctaText}
              </a>
            </div>
            `
                : ''
            }
            
            ${
              data.deadline
                ? `
            <div style="text-align: center; background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-weight: bold;">
                ⏰ ${
                  data.deadlineMessage ||
                  `Offer valid until ${new Date(
                    data.deadline
                  ).toLocaleDateString()}`
                }
              </p>
            </div>
            `
                : ''
            }
          </div>
          
          <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">
              You received this email as part of your Job Chaja subscription.<br>
              <a href="${
                data.unsubscribeUrl || '#'
              }" style="color: #4F46E5;">Unsubscribe</a> | 
              <a href="${
                data.preferencesUrl || '#'
              }" style="color: #4F46E5;">Email Preferences</a><br><br>
              © ${new Date().getFullYear()} Job Chaja. Connect. Apply. Succeed.
            </p>
          </div>
        </div>
      `,
    };
  }
}
