/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserRole = 'ADMIN' | 'FARMER'

export type UserStatus = 'ACTIVE' | 'PENDING'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  phone?: string
  profileImage?: string
  bio?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: UserRole
  phone?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: {
    code: string
    details?: any
  }
}