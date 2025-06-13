import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
};

export default SearchBox;