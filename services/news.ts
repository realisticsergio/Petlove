import { api } from '@/services/api';
import type { NewsQuery, NewsResponse } from '@/types/news';

export async function fetchNews({
  page,
  limit,
  keyword,
}: NewsQuery): Promise<NewsResponse> {
  const response = await api.get<NewsResponse>('/news', {
    params: {
      page,
      limit,
      ...(keyword ? { keyword } : {}),
    },
  });

  return response.data;
}
