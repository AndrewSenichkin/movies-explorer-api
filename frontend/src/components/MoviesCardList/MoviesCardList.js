import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import {
  DESKTOP_ITEMS_PER_LOAD,
  TABLET_ITEMS_PER_LOAD,
  MOBILE_ITEMS_PER_LOAD,
} from "../../utils/constants"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import Preloader from "../Preloader/Preloader"


function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  // Определяет количество отображаемых карточек в зависимости от размера экрана
  function shownCount() {
    const display = window.innerWidth
    if (display > 1180) {//(display > 1180)
      setShownMovies(12) // 12 карточек на разрешении 1280px
    } else if (display > 767) {
      setShownMovies(8) // 8 карточек на разрешении 768px
    } else {
      setShownMovies(5) // 5 карточек на разрешении от 320px до 480px
    }
  }

  useEffect(() => {
    shownCount()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownCount)
    }, 500)
  })

  // Увеличивает количество отображаемых карточек при нажатии на кнопку "Ещё"
  function showMore() {
    const display = window.innerWidth
    if (display > 1180) {//(display > 1180)
      setShownMovies(shownMovies + DESKTOP_ITEMS_PER_LOAD)
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_ITEMS_PER_LOAD)
    } else {
      setShownMovies(shownMovies + MOBILE_ITEMS_PER_LOAD)
    }
  }

  // Возвращает сохраненную карточку фильма из массива сохраненных фильмов
  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container"></div>
            </>
          ) : (
            <>
              {/*ul элемент с классом cards__list представляет список карточек фильмов.
Используется метод map для отображения каждой карточки фильма.
Каждая карточка фильма представлена компонентом MoviesCard */}
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {/* После списка карточек выводится контейнер div с классом cards__button-container.
Если количество карточек фильмов превышает shownMovies, отображается кнопка "Ещё*/}
                {cards.length > shownMovies ? (
                  <button className="cards__button" onClick={showMore}>
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
