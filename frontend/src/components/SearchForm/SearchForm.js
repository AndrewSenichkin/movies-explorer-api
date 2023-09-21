import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import search from "../../images/search-button.svg";
import searchBtn from "../../images/findSearch.svg";

// Этот компонент представляет форму поиска фильмов.
function SearchForm({ onSearchMoviesFilms, onFilterMovies, isShortFilm }) {
  // onSearchMoviesFilms: Функция обратного вызова, которая будет вызываться
  // при отправке формы поиска и передает введенный запрос в качестве аргумента.

  // onFilterMovies: Функция обратного вызова, которая будет вызываться при изменении фильтра "короткометражные фильмы".

  // isShortFilm: Булево значение, указывающее, включен ли фильтр "короткометражные фильмы" или нет.

  //isQueryError: Состояние для отслеживания наличия ошибки при вводе запроса.
  const [isQueryError, setIsQueryError] = useState(false);

  // query: Состояние для хранения введенного пользователем запроса поиска.
  const [query, setQuery] = useState("");

  // location: Состояние, получаемое с помощью хука useLocation для получения текущего пути URL.
  const location = useLocation();

  // Функция handleChangeInputQuery вызывается при изменении значения в поле ввода и обновляет состояние query с новым значением.
  function handleChangeInputQuery(e) {
    setQuery(e.target.value);
  }

  // Функция handleFormSubmit вызывается при отправке формы. Она проверяет, что введенный запрос не пустой, и вызывает функцию
  // onSearchMoviesFilms с передачей запроса в качестве аргумента. Если запрос пустой, устанавливается состояние isQueryError в true.
  function handleFormSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearchMoviesFilms(query);
    }
  }

  // В блоке useEffect происходит проверка текущего пути URL и наличия
  // сохраненного запроса в localStorage. Если путь соответствует "/movies"
  // и в localStorage есть значение "movieSearch", оно извлекается и устанавливается в состояние query.
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    }
  }, [location]);

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={handleFormSubmit}>
        <img
          className="search__search-image search__search-image-none"
          src={search}
          alt="поиск"
        />
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={handleChangeInputQuery}
          value={query || ""}
        ></input>
        <button className="search__button" type="submit">
          <img className="search__search-image" alt="поиск" src={searchBtn} />
        </button>
        <div className="search__border" />
        <div className="filter__standart-size">
          <FilterCheckbox
            onFilterMovies={onFilterMovies}
            isShortFilm={isShortFilm}
          />
        </div>
      </form>
      <div className="filter__mini-size">
        <FilterCheckbox
          onFilterMovies={onFilterMovies}
          isShortFilm={isShortFilm}
        />
      </div>
      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
    </section>
  );
}

export default SearchForm;
