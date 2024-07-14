import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { query } = values;
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <header className={css.barHeader}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <Field
            type="text"
            name="query"
            placeholder="Search images and photos"
            className={css.searchInput}
          />
          <button type="submit" className={css.searchButton}>
            Search
          </button>
          <ErrorMessage
            name="query"
            component="div"
            className={css.errorMessage}
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
