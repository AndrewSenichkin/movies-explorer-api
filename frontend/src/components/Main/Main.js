import React from "react"
import Promo from "../Promo/Promo"
import AboutProject from "../AboutProject/AboutProject"
import Techs from "../Techs/Techs"
import AboutMe from "../AboutMe/AboutMe"
import Portfolio from "../Portfolio/Portfolio"

// Определение компонента Main
function Main() {
  return (
    <main>
      {/* Компонент Promo представляет секцию с промо-информацией */}
      <Promo />
      {/* Компонент AboutProject представляет секцию с информацией о проекте */}
      <AboutProject />
      {/* Компонент Techs представляет секцию с технологиями, используемыми в проекте */}
      <Techs />
      {/* Компонент AboutMe представляет секцию с информацией о разработчике данного приложения */}
      <AboutMe />
      {/* Компонент Portfolio представляет секцию с портфолио */}
      <Portfolio />
    </main>
  )
}

//Этот компонент представляет основную часть страницы,
// которая включает различные секции, такие как промо-информация,
// информация о проекте, используемые технологии,
// информация о разработчике и портфолио.

export default Main
