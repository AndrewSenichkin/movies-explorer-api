import React from "react"
import NavTab from "../NavTab/NavTab"
import "./Promo.css"

//Компонент Promo представляет собой заглавный блок на странице.
// Компонент содержит информацию о проекте и его создателе.
// Верхняя часть компонента состоит из блока с текстом и изображения.
// Блок с текстом содержит заголовок и описание проекта.
// Нижняя часть компонента содержит навигационные вкладки, реализованные с помощью компонента NavTab.
function Promo() {
  return (
    <section className="promo" id="promo">
      <div className="promo__container">
        <div className="promo__text-block">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
        <NavTab />
      </div>
    </section>
  )
}

export default Promo
