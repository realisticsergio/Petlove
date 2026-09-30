import { api } from '@/services/api';
import type { User } from '@/types/auth';
import type {
  AddPetFormValues,
  AddPetRequest,
  Pet,
  PetSpecies,
} from '@/types/pets';

export type UserWithPetsResponse = User & {
  pets: Pet[];
};

export async function fetchPetSpecies(): Promise<PetSpecies[]> {
  const response = await api.get<PetSpecies[]>('/notices/species');

  return response.data;
}

export async function addPet(
  values: AddPetFormValues,
): Promise<UserWithPetsResponse> {
  if (!values.species || !values.sex) {
    throw new Error('Species and sex are required');
  }

  const requestData: AddPetRequest = {
    title: values.title.trim(),
    name: values.name.trim(),
    imgURL: values.imgUrl.trim(),
    species: values.species,
    birthday: values.birthday,
    sex: values.sex,
  };

  const response = await api.post<UserWithPetsResponse>(
    '/users/current/pets/add',
    requestData,
  );

  return response.data;
}

export async function removePet(petId: string): Promise<UserWithPetsResponse> {
  const response = await api.delete<UserWithPetsResponse>(
    `/users/current/pets/remove/${petId}`,
  );

  return response.data;
}
