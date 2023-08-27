import {useNavigate} from "react-router-dom";
import "./NotFoundPage.css";
import React from "react";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main>
            <section className="not-found-page">
                <h1 className="not-found-page__title">404</h1>
                <p className="not-found-page__text">Страница не найдена</p>
                <a className="not-found-page__link">
                    <button
                        className="not-found-page__link-button"
                        onClick={() => navigate(-1)}
                        type="button">
                        Назад
                    </button>
                </a>
            </section>
        </main>
    );
}

export default NotFoundPage;
