'use client';
import Select, { MultiValue, SingleValue } from 'react-select';
import { useTheme } from 'next-themes';

interface IOption {
  value: string;
  label: string;
}
interface ReactSelectProps {
  isMultiSelect?: boolean;
  className?: string;
  isHideSelected?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  value?: string | IOption | IOption[];
  isRequired?: boolean;
  onChange: (
    e: MultiValue<string | IOption> | SingleValue<string | IOption>
  ) => void;
}

export const ReactSelect = ({
  isMultiSelect = false,
  className,
  isHideSelected = false,
  isClearable = false,
  isLoading = false,
  isDisabled = false,
  isSearchable = false,
  name,
  onBlur,
  onFocus,
  options,
  placeholder,
  value,
  isRequired,
  onChange,
}: ReactSelectProps) => {
  const { theme } = useTheme();
  const handleOnChange = (
    e: MultiValue<string | IOption> | SingleValue<string | IOption>
  ) => {
    onChange(e);
  };

  return (
    <>
      <Select
        options={options}
        isMulti={isMultiSelect}
        className={className}
        hideSelectedOptions={isHideSelected}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={isRequired}
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#171717' : 'white',
            borderWidth: '1px',
            borderStyle: 'solid',
            ':focus-visible': {
              color: 'rgb(0.708, 0, 0)',
            },
            height: '3rem',
            borderRadius: '0.375rem',
            borderColor: state.isFocused
              ? 'rgba(142, 142, 142, 1)'
              : theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'black',
            boxShadow: state.isFocused
              ? '0 0 0 1px rgba(142, 142, 142, 1)'
              : 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'all 0.2s',
          }),

          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? 'black'
              : theme === 'dark'
                ? '#171717'
                : 'white',
            ':active': {
              color: 'white',
              backgroundColor: 'black',
            },
          }),

          singleValue: (provided) => ({
            ...provided,
            color: theme === 'dark' ? 'white' : 'black',
          }),
        }}
      />
    </>
  );
};
