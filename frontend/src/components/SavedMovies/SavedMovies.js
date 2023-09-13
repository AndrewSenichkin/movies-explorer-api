import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import { filterMovies, filterDuration } from "../../utils/utils"

// Компонент представляет собой страницу для отображения сохраненных фильмов.
function SavedMovies({ loggedIn, savedMovies, onDeleteCard }) {
  // loggedIn: Булево значение, указывающее, вошел ли пользователь в систему или нет.
  // savedMovies: Массив объектов сохраненных фильмов.
  // onDeleteCard: Функция для удаления сохраненного фильма.

  //filteredMovies: Представляет список фильмов, соответствующих поисковому запросу и критериям фильтрации.
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  // isShortFilm: Указывает, включен ли фильтр "коротких фильмов" или нет.
  const [isShortFilm, setisShortFilm] = useState(false)
  // isNotFound: Указывает, пуст ли список отфильтрованных фильмов или нет.
  const [isNotFound, setIsNotFound] = useState(false)
  // searchQuery: Хранит текущий поисковый запрос, введенный пользователем.
  const [searchQuery, setSearchQuery] = useState("")

  //Функция onSearchMoviesFilms(query) принимает параметр query,
  // который представляет поисковой запрос, введенный пользователем.
  // Она используется для обновления состояния searchQuery с помощью функции
  // setSearchQuery. Это позволяет сохранить текущий поисковый запрос в состоянии компонента.
  function onSearchMoviesFilms(query) {
    setSearchQuery(query)
  }

  //Функция handleShortFilmToggle() не принимает никаких параметров.
  // Она используется для обработки переключения состояния isShortFilm.
  // Каждый раз, когда функция вызывается, она инвертирует текущее значение
  // isShortFilm, используя оператор отрицания !. То есть, если isShortFilm
  // было true, оно станет false, и наоборот.
  function handleShortFilmToggle() {
    setisShortFilm(!isShortFilm)
  }

  //useEffect срабатывает при изменении состояний savedMovies, isShortFilm
  // или searchQuery. Он выполняет следующие действия:
  // Фильтрует список фильмов savedMovies на основе текущего поискового запроса searchQuery с помощью функции filterMovies.
  // Если флаг isShortFilm установлен в true, применяет также фильтр по длительности фильмов с помощью функции filterDuration.
  // Обновляет состояние filteredMovies с отфильтрованным списком фильмов.
  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortFilm ? filterDuration(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortFilm, searchQuery])

  // useEffect срабатывает при изменении состояния filteredMovies.
  // Он проверяет длину списка отфильтрованных фильмов filteredMovies
  // и обновляет состояние isNotFound в зависимости от того, является
  // ли список пустым или нет. Если список пустой, то isNotFound
  // устанавливается в true, в противном случае - в false
  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMoviesFilms={onSearchMoviesFilms}
        onFilterMovies={handleShortFilmToggle}
      />
      <MoviesCardList
        isNotFound={isNotFound}
        isSavedFilms={true}
        cards={filteredMovies}
        savedMovies={savedMovies}
        onDeleteCard={onDeleteCard}
      />
      <Footer />
    </section>
  )
}

// В целом, этот компонент предоставляет функциональность поиска
// и фильтрации сохраненных фильмов и их отображению в виде списка.

export default SavedMovies
