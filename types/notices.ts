import type { PetSex, PetSpecies } from '@/types/pets';

export type NoticeCategory = 'sell' | 'free' | 'lost' | 'found';

export interface NoticeLocation {
  _id: string;
  stateEn: string;
  cityEn: string;
  countyEn?: string;
}

export interface NoticeOwner {
  _id: string;
  email: string;
  phone?: string;
}

export interface Notice {
  _id: string;
  title: string;
  name: string;
  birthday: string;
  species: PetSpecies;
  sex: PetSex;
  category: NoticeCategory;
  comment: string;
  imgURL: string;
  price?: number;
  popularity: number;
  location: string | NoticeLocation;
  user: string | NoticeOwner;
  createdAt: string;
  updatedAt?: string;
}

export type NoticeSort = '' | 'popular' | 'unpopular' | 'cheap' | 'expensive';

export interface NoticesQuery {
  page: number;
  limit: number;
  keyword?: string;
  category?: NoticeCategory;
  species?: PetSpecies;
  sex?: PetSex;
  locationId?: string;
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
}

export interface NoticesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: Notice[];
}
