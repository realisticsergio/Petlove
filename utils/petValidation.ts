import * as Yup from 'yup';
import type { AddPetFormValues } from '@/types/pets';

const imageUrlPattern =
  /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)(?:\?.*)?$/i;

const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;

export const addPetInitialValues: AddPetFormValues = {
  title: '',
  name: '',
  imgUrl: '',
  species: '',
  birthday: '',
  sex: '',
};

export const addPetValidationSchema = Yup.object({
  title: Yup.string().trim().required('Enter a title'),

  name: Yup.string().trim().required("Enter your pet's name"),

  imgUrl: Yup.string()
    .trim()
    .matches(imageUrlPattern, 'Enter a valid image URL')
    .required('Enter an image URL'),

  species: Yup.string().trim().required('Select a type of pet'),

  birthday: Yup.string()
    .matches(birthdayPattern, 'Use the YYYY-MM-DD format')
    .required("Enter your pet's birthday"),

  sex: Yup.string()
    .oneOf(['female', 'male', 'multiple'], 'Select a sex')
    .required('Select a sex'),
});
