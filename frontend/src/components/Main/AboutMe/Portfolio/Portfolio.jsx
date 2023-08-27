import "./Portfolio.css";
import arrow from "../../../../images/link-arrow.svg";

function Portfolio() {
    return (
        <>
            <p className="portfolio__portfolio-link">Портфолио</p>
            <ul className="portfolio__navigation">
                <li>
                    <a
                        href="https://github.com/AndrewSenichkin/how-to-learn"
                        className="portfolio__link-container"
                        rel="noreferrer"
                        target="_blank">
                        <p className="portfolio__link-name">Статичный сайт</p>
                        <img className="portfolio__link-arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/AndrewSenichkin/russian-travel"
                        className="portfolio__link-container"
                        rel="noreferrer"
                        target="_blank">
                        <p className="portfolio__link-name">Адаптивный сайт</p>
                        <img className="portfolio__link-arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/AndrewSenichkin/react-mesto-api-full-gha"
                        className="portfolio__link-container"
                        rel="noreferrer"
                        target="_blank">
                        <p className="portfolio__link-name">Одностраничное приложение</p>
                        <img className="portfolio__link-arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
            </ul>
        </>
    );
}

export default Portfolio;
