export type NewsItem = {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
};

export type NewsResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: NewsItem[];
};

export type NewsQuery = {
  page: number;
  limit: number;
  keyword?: string;
};
