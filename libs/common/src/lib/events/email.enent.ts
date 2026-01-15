export enum EmailType {
  // OTP = 'otp',
  EMAIL_VERIFICATION = 'email_verification',
  INTERVIEW = 'interview',
  GENERAL = 'general',
}

export enum EmailPriority {
  HIGH = 1, // OTP, Email Verification, Interview updates
  LOW = 2, // General emails (newsletters, promotions, notices)
}

export interface SendVerificationEmailEvent {
  type: EmailType.EMAIL_VERIFICATION;
  data: {
    userId: string;
    email: string;
    verificationToken: string;
    verificationUrl: string;
  };
}

export interface SendInterviewEmailEvent {
  type: EmailType.INTERVIEW;
  data: {
    userId: string;
    email: string;
    interviewId: string;
    interviewUrl: string;
  };
}

export interface SendGeneralEmailEvent {
  type: EmailType.GENERAL;
  data: {
    email: string;
    subject: string;
    body: string;
  };
}
