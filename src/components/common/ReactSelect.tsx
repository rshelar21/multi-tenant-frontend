'use client';
import Select, { MultiValue, SingleValue } from 'react-select';

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
        // onInputChange={(e) => handleOnInputChange(e)}
        // loadingMessage={loadingMessage } //Async: Text to display when loading options
      />
    </>
  );
};
