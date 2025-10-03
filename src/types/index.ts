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

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};


export type TSuccessResponse = {
  data: any;
  meta: TMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};


 // Available options
  export const cropOptions = [
    { value: 'rice', label: 'Rice (ধান)' },
    { value: 'wheat', label: 'Wheat (গম)' },
    { value: 'jute', label: 'Jute (পাট)' },
    { value: 'potato', label: 'Potato (আলু)' },
    { value: 'tomato', label: 'Tomato (টমেটো)' },
    { value: 'onion', label: 'Onion (পেঁয়াজ)' },
    { value: 'garlic', label: 'Garlic (রসুন)' },
    { value: 'cabbage', label: 'Cabbage (বাঁধাকপি)' },
    { value: 'cauliflower', label: 'Cauliflower (ফুলকপি)' },
    { value: 'eggplant', label: 'Eggplant (বেগুন)' },
    { value: 'chili', label: 'Chili (মরিচ)' },
    { value: 'corn', label: 'Corn (ভুট্টা)' },
    { value: 'sugarcane', label: 'Sugarcane (আখ)' },
    { value: 'tea', label: 'Tea (চা)' },
    { value: 'mango', label: 'Mango (আম)' },
    { value: 'banana', label: 'Banana (কলা)' },
    { value: 'papaya', label: 'Papaya (পেঁপে)' },
    { value: 'lentils', label: 'Lentils (ডাল)' },
    { value: 'mustard', label: 'Mustard (সরিষা)' },
    { value: 'vegetables', label: 'Mixed Vegetables' },
  ]

  export const soilTypeOptions = [
    { value: 'clay', label: 'Clay (কাদামাটি)' },
    { value: 'sandy', label: 'Sandy (বালুকাময়)' },
    { value: 'loamy', label: 'Loamy (দোআঁশ)' },
    { value: 'silt', label: 'Silt (পলিমাটি)' },
    { value: 'peat', label: 'Peat (জৈব মাটি)' },
    { value: 'chalk', label: 'Chalk (চুনাময়)' },
  ]

  export const irrigationTypeOptions = [
    { value: 'drip', label: 'Drip Irrigation (ড্রিপ সেচ)' },
    { value: 'sprinkler', label: 'Sprinkler (স্প্রিংকলার)' },
    { value: 'flood', label: 'Flood Irrigation (প্লাবন সেচ)' },
    { value: 'manual', label: 'Manual Irrigation (হস্তচালিত)' },
    { value: 'rainfed', label: 'Rainfed (বৃষ্টি নির্ভর)' },
  ]