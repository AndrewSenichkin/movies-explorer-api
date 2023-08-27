import React from "react";
import "./AboutMe.css";
import Portfolio from "./Portfolio/Portfolio";
import photo from "../../../images/myFoto.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__description">
                    <h3 className="about-me__name">Андрей</h3>
                    <p className="about-me__about">Фронтенд-разработчик, 28 лет</p>
                    <p className="about-me__biography">
                        Я живу в Белгороде, закончил «Белгородский государственный технологический университет им. В.Г.Шухова» по специализации
                        "Механическое оборудование и машиностроение". Поработав 4 года в баре, я понял что необходимо двигаться дальше,
                        поэтому я решил пройти курс Веб-разработки.
                    </p>
                    <p className="about-me__github-link-container">
                        <a
                            href="https://github.com/AndrewSenichkin"
                            className="about-me__github-link"
                            rel="noreferrer"
                            target="_blank">
                            Github
                        </a>
                    </p>
                </div>
                <img className="about-me__photo" src={photo} alt="Фотография Сеничкин А.А."/>
            </div>
            <Portfolio/>
        </section>
    );
}

export default AboutMe;
