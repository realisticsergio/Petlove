export type PetSex = 'female' | 'male' | 'multiple' | 'unknown';

export type AddPetSex = Exclude<PetSex, 'unknown'>;

export type PetSpecies =
  | 'dog'
  | 'cat'
  | 'monkey'
  | 'bird'
  | 'snake'
  | 'turtle'
  | 'lizard'
  | 'frog'
  | 'fish'
  | 'ants'
  | 'bees'
  | 'butterfly'
  | 'spider'
  | 'scorpion';

export interface AddPetFormValues {
  title: string;
  name: string;
  imgUrl: string;
  species: PetSpecies | '';
  birthday: string;
  sex: AddPetSex | '';
}

export interface AddPetRequest {
  title: string;
  name: string;
  imgURL: string;
  species: PetSpecies;
  birthday: string;
  sex: AddPetSex;
}

export interface Pet {
  _id: string;
  title: string;
  name: string;
  imgURL: string;
  species: PetSpecies;
  birthday: string;
  sex: PetSex;
  createdAt?: string;
  updatedAt?: string;
}
