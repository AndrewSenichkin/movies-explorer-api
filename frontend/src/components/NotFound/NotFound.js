import React from "react"
import { Link } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  //Функция NotFound является основной функцией компонента, которая
  // возвращает JSX - структуру элементов, определяющих внешний вид
  // страницы 404. Она содержит секцию с классом "not-found", в
  // которой находятся заголовок, описание и ссылка "Назад".
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__descrintion">Страница не найдена</p>
      <Link to="/" className="not-found__button">
        Назад
      </Link>
    </section>
  )
}

//Компонент NotFound отвечает за отображение страницы,
// которая появляется, когда запрашиваемая страница не найдена.

export default NotFound
