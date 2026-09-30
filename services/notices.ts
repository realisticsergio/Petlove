import { api } from '@/services/api';
import type {
  Notice,
  NoticeCategory,
  NoticesQuery,
  NoticesResponse,
} from '@/types/notices';
import type { PetSex, PetSpecies } from '@/types/pets';

export async function fetchNotices(
  query: NoticesQuery,
): Promise<NoticesResponse> {
  const response = await api.get<NoticesResponse>('/notices', {
    params: query,
  });

  return response.data;
}

export async function fetchNoticeCategories(): Promise<NoticeCategory[]> {
  const response = await api.get<NoticeCategory[]>('/notices/categories');

  return response.data;
}

export async function fetchNoticeSex(): Promise<PetSex[]> {
  const response = await api.get<PetSex[]>('/notices/sex');

  return response.data;
}

export async function fetchNoticeSpecies(): Promise<PetSpecies[]> {
  const response = await api.get<PetSpecies[]>('/notices/species');

  return response.data;
}

export async function fetchNoticeById(noticeId: string): Promise<Notice> {
  const response = await api.get<Notice>(`/notices/${noticeId}`);

  return response.data;
}

export async function addNoticeToFavorites(
  noticeId: string,
): Promise<string[]> {
  const response = await api.post<string[]>(
    `/notices/favorites/add/${noticeId}`,
  );

  return response.data;
}

export async function removeNoticeFromFavorites(
  noticeId: string,
): Promise<string[]> {
  const response = await api.delete<string[]>(
    `/notices/favorites/remove/${noticeId}`,
  );

  return response.data;
}
