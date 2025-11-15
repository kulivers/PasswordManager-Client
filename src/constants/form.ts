// Texts for registration form
export const REGISTRATION_TEXTS = {
  brand: {
    name: 'PasswordManager',
    tagline: 'Securely manage your passwords with our comprehensive solution',
  },
  navigation: {
    signInText: 'Already have an account?',
    signInLink: 'Sign in',
  },
  form: {
    title: 'Create your account',
    subtitle: 'Get started with PasswordManager in just a few steps',
    buttonText: 'Continue to Step 2',
    termsText: 'By creating an account, you agree to our',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    and: 'and',
  },
  fields: {
    fullName: {
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    accountType: {
      label: 'Account Type',
      placeholder: 'Select your account type',
      required: true,
    },
    companyName: {
      label: 'Company/Organization Name',
      placeholder: 'Enter your company or organization name',
      required: false,
    },
  },
} as const;

// Options for account type
export const ACCOUNT_TYPES = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'enterprise', label: 'Enterprise' },
] as const;

// Progress steps
export const PROGRESS_STEPS = [
  { number: 1, title: 'Account Setup', active: true },
  { number: 2, title: 'Security', active: false },
  { number: 3, title: 'Verification', active: false },
  { number: 4, title: 'Complete', active: false },
] as const;

