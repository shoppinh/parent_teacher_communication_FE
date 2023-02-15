// Note: workaround
// TODO: need update
interface PasswordCredential {
  code: string;
}

interface FederatedCredential {
  code: string;
}

interface PublicKeyCredential {
  code: string;
}

interface CredentialRequestOptions {
  otp: OTPOptions;
}

interface OTPOptions {
  transport: string[];
}

interface PerformanceEntry {
  type: string;
}