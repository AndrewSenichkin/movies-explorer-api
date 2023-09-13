import React from "react"
import { durationConverter } from "../../utils/utils"
import "./MoviesCard.css"

//Компонент MoviesCard отображает карточку фильма и содержит функции
// и данные, связанные с отображением и взаимодействием с фильмами.
function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {
  // Обработчик клика по карточке фильма
  // Если фильм сохранен, вызывается функция onDeleteCard с удалением
  // соответствующего фильма из savedMovies. В противном случае
  // вызывается функция handleLikeFilm с передачей выбранного фильма.
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  // Обработчик удаления карточки фильма
  function onDelete() {
    onDeleteCard(card)
  }

  // Класс кнопки лайка
  //cardLikeButtonClassName - это переменная, которая определяет
  // класс кнопки лайка в зависимости от значения saved.
  // Если фильм сохранен, применяется класс card__like-button_active,
  // иначе - класс card__like-button.
  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li key={card.id} className="card">
        {/*При клике на изображение фильма открывается ссылка на трейлер фильма в новой вкладке браузера.*/}
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>

        <div className="card__container">
          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {/* Функция durationConverter используется для преобразования длительности фильма в удобный формат отображения. */}
              {durationConverter(card.duration)}
            </span>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="card__delete-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
