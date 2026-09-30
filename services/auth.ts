import { api } from '@/services/api';
import type {
  AuthResponse,
  EditUserValues,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types/auth';

export async function registerUser(
  credentials: RegisterCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/users/signup', credentials);

  return response.data;
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/users/signin', credentials);

  return response.data;
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await api.get<User>('/users/current/full');

  return response.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/users/signout');
}

export async function editCurrentUser(values: EditUserValues): Promise<User> {
  const requestData = Object.fromEntries(
    Object.entries(values)
      .map(([key, value]) => [key, value.trim()])
      .filter(([, value]) => value !== ''),
  ) as Partial<EditUserValues>;

  const response = await api.patch<User>('/users/current/edit', requestData);

  return response.data;
}
