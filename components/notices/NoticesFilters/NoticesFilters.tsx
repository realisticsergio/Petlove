'use client';

import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import toast from 'react-hot-toast';
import SearchField from '@/components/common/SearchField/SearchField';
import { fetchCities } from '@/services/cities';
import {
  fetchNoticeCategories,
  fetchNoticeSex,
  fetchNoticeSpecies,
} from '@/services/notices';
import type { CityOption } from '@/types/cities';
import type { NoticeCategory, NoticeSort } from '@/types/notices';
import type { PetSex, PetSpecies } from '@/types/pets';
import styles from './NoticesFilters.module.css';

export type NoticesFilterValues = {
  keyword: string;
  category: NoticeCategory | '';
  sex: PetSex | '';
  species: PetSpecies | '';
  location: CityOption | null;
  sort: NoticeSort;
};

export const initialNoticesFilters: NoticesFilterValues = {
  keyword: '',
  category: '',
  sex: '',
  species: '',
  location: null,
  sort: '',
};

type NoticesFiltersProps = {
  values: NoticesFilterValues;
  onChange: (values: NoticesFilterValues) => void;
};

const sortOptions: Array<{
  value: Exclude<NoticeSort, ''>;
  label: string;
}> = [
  { value: 'popular', label: 'Popular' },
  { value: 'unpopular', label: 'Unpopular' },
  { value: 'cheap', label: 'Cheap' },
  { value: 'expensive', label: 'Expensive' },
];

export default function NoticesFilters({
  values,
  onChange,
}: NoticesFiltersProps) {
  const [searchValue, setSearchValue] = useState(values.keyword);
  const [categories, setCategories] = useState<NoticeCategory[]>([]);
  const [sexOptions, setSexOptions] = useState<PetSex[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<PetSpecies[]>([]);

  useEffect(() => {
    let isCancelled = false;

    async function loadFilters() {
      try {
        const [categoriesData, sexData, speciesData] = await Promise.all([
          fetchNoticeCategories(),
          fetchNoticeSex(),
          fetchNoticeSpecies(),
        ]);

        if (!isCancelled) {
          setCategories(categoriesData);
          setSexOptions(sexData);
          setSpeciesOptions(speciesData);
        }
      } catch {
        if (!isCancelled) {
          toast.error('Не вдалося завантажити фільтри.');
        }
      }
    }

    void loadFilters();

    return () => {
      isCancelled = true;
    };
  }, []);

  const loadCityOptions = useCallback(
    async (inputValue: string): Promise<CityOption[]> => {
      try {
        const cities = await fetchCities(inputValue);

        return cities.map((city) => ({
          value: city._id,
          label: `${city.cityEn}, ${city.stateEn}`,
          city,
        }));
      } catch {
        toast.error('Не вдалося знайти міста.');
        return [];
      }
    },
    [],
  );

  const updateFilters = <Key extends keyof NoticesFilterValues>(
    key: Key,
    value: NoticesFilterValues[Key],
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const handleReset = () => {
    setSearchValue('');
    onChange(initialNoticesFilters);
  };

  return (
    <section className={styles.filters} aria-label="Notice filters">
      <div className={styles.mainFilters}>
        <SearchField
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={(keyword) => updateFilters('keyword', keyword)}
          onClear={() => updateFilters('keyword', '')}
          placeholder="Search"
          ariaLabel="Search notices"
        />

        <select
          className={styles.select}
          value={values.category}
          aria-label="Notice category"
          onChange={(event) =>
            updateFilters('category', event.target.value as NoticeCategory | '')
          }
        >
          <option value="">Category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={values.sex}
          aria-label="Pet sex"
          onChange={(event) =>
            updateFilters('sex', event.target.value as PetSex | '')
          }
        >
          <option value="">By gender</option>

          {sexOptions.map((sex) => (
            <option key={sex} value={sex}>
              {sex}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={values.species}
          aria-label="Pet species"
          onChange={(event) =>
            updateFilters('species', event.target.value as PetSpecies | '')
          }
        >
          <option value="">By type</option>

          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <AsyncSelect<CityOption, false>
          instanceId="notice-location"
          className={styles.location}
          classNamePrefix="location"
          value={values.location}
          loadOptions={loadCityOptions}
          cacheOptions
          defaultOptions={false}
          isClearable
          placeholder="Location"
          loadingMessage={() => 'Searching...'}
          noOptionsMessage={({ inputValue }) =>
            inputValue.trim().length < 3
              ? 'Enter at least 3 characters'
              : 'No locations found'
          }
          onChange={(option) => updateFilters('location', option)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.sorting}>
        <div className={styles.sortOptions}>
          {sortOptions.map((option) => (
            <label
              className={`${styles.sortOption} ${
                values.sort === option.value ? styles.active : ''
              }`}
              key={option.value}
            >
              <input
                className="visually-hidden"
                type="radio"
                name="notice-sort"
                value={option.value}
                checked={values.sort === option.value}
                onChange={() => updateFilters('sort', option.value)}
              />

              {option.label}
            </label>
          ))}
        </div>

        <button type="button" className={styles.reset} onClick={handleReset}>
          <RotateCcw size={16} strokeWidth={1.8} aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>
    </section>
  );
}
