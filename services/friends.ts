import { api } from '@/services/api';
import type { Friend } from '@/types/friends';

export async function fetchFriends(): Promise<Friend[]> {
  const response = await api.get<Friend[]>('/friends');

  return response.data;
}
