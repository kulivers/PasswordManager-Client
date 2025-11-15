// User types
export interface User {
  id?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
}

// Account types
export interface Account {
  id?: string;
  login: string;
  password: string;
  site?: string;
  description?: string;
}

// Authentication types
export interface AuthState {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  passWord: string | null;
}

export interface LoginCredentials {
  UserName: string;
  Password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Registration types
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface RegistrationError {
  Code: string;
  Description: string;
}

export interface LoadingState {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface RegistrationState {
  userData: RegistrationFormData | Record<string, never>;
  isSuccess: boolean;
  errors: string[];
  loadingState: LoadingState;
  showAllerts: boolean;
}

// Root State
export interface RootState {
  auth: AuthState;
  accounts: Account[];
  registration: RegistrationState;
}

// API Response types
export interface ApiError {
  Errors: RegistrationError[];
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

