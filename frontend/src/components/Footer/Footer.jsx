import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className='footer__copy'>&copy; {new Date().getFullYear()}</p>
                <nav className="footer__links-nav">
                    <ul className="footer__links">
                        <li className="footer__link">
                            <a
                                href='https://practicum.yandex.ru'
                                className="footer__link-item"
                                rel="noreferrer"
                                target="_blank">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className='footer__link'>
                            <a
                                href='https://github.com/AndrewSenichkin'
                                className="footer__link-item"
                                rel="noreferrer"
                                target="_blank">
                                Github
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;