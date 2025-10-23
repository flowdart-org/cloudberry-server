export type OTPPurpose = 'LOGIN' | 'REGISTER' | 'RESET_PASSWORD';

export interface OTPEntry {
  otpHash: string;
  attempts: number;
  used: boolean;
  purpose: OTPPurpose;
  identifier: string;
  expiresAt: number;
}
