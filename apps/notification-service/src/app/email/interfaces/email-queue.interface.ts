import { EmailPriority, EmailType } from "@in-job/common";

export interface EmailQueueItem {
  id: string;
  userId?: string;
  email: string;
  subject: string;
  content: string;
  type: EmailType;
  priority: EmailPriority;
  metadata?: any;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
}

export interface EmailTemplate {
  subject: string;
  content: string;
}

export interface OTPEmailData {
  otp: string;
  expiresIn: number;
}

export interface EmailVerificationData {
  fullName: string;
  verificationToken: string;
  verificationUrl: string;
}

export interface InterviewEmailData {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  interviewTime: Date;
  duration: number;
  interviewType: string; // e.g., "Technical", "HR", "Virtual", "On-site"
  location?: string;
  platform?: string; // e.g., "Zoom", "Google Meet", "Microsoft Teams"
  meetingLink?: string;
  interviewerName: string;
  additionalInstructions?: string;
  contactPerson?: string;
  contactEmail?: string;
}

export interface GeneralEmailData {
  title: string;
  subtitle?: string;
  content: string; // HTML content
  imageUrl?: string;
  ctaUrl?: string;
  ctaText?: string;
  deadline?: Date;
  deadlineMessage?: string;
  unsubscribeUrl?: string;
  preferencesUrl?: string;
}
