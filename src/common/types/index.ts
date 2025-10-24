export interface HTTP_RESPONSE<T = any> {
  message: string;
  success: boolean;
  data?: T;
  token?: string;
}

export interface User {
  id: string;
  email?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  sub: string;
  role: 'user';
}
