import React from "react"
import avatar from "../../images/myFoto.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-block">
          <h3 className="about-me__subtitle">Андрей</h3>
          <h4 className="about-me__info">Фронтенд-разработчик, 28 лет</h4>
          <p className="about-me__description">
          Я живу в Белгороде, закончил «Белгородский государственный технологический университет им. В.Г.Шухова» по специализации
          "Механическое оборудование и машиностроение". Поработав 4 года в баре, я понял что необходимо двигаться дальше,
          поэтому я решил пройти курс Веб-разработки.
          </p>
          <a
            href="https://github.com/AndrewSenichkin"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="Фотография Сеничкин А.А." className="about-me__photo" />
      </div>
    </section>
  )
}

export default AboutMe
