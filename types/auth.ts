import type { Notice } from '@/types/notices';
import type { Pet } from '@/types/pets';

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  pets?: Pet[];
  noticesViewed?: Notice[];
  noticesFavorites?: Notice[];
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type EditUserValues = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type AuthResponse = User & {
  token: string;
};
