import { api } from '@/services/api';
import type { City } from '@/types/cities';

export async function fetchCities(keyword: string): Promise<City[]> {
  const normalizedKeyword = keyword.trim();

  if (normalizedKeyword.length < 3) {
    return [];
  }

  const response = await api.get<City[]>('/cities/', {
    params: {
      keyword: normalizedKeyword,
    },
  });

  return response.data;
}

export async function fetchNoticeLocations(): Promise<City[]> {
  const response = await api.get<City[]>('/cities/locations');

  return response.data;
}
