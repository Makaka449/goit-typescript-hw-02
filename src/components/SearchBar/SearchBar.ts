import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

type SearchBarProps = {
  onSubmit: (input: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      toast.error("Будь ласка, введіть потрібну назву 😉");
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <>
      <header className={css.styleInput}>
        <form onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            value={input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
          <button className={css.btnInput} type="submit">Search</button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
