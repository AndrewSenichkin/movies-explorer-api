import Forms from "../../utils/validation";
import Logo from "../Logo/Logo";
import "./Authorization.css";
import React from "react";

function Authorization(props) {
    const {values, errors, handleChange, handleSubmit} = Forms(props.onLogin);
    return (
        <section className="authorization">
            <div className="authorization__header">
                <div className="authorization__header-container">
                    <div className="authorization__logo-container">
                        <Logo/>
                    </div>
                    <h1 className="authorization__text">{props.title}</h1>
                </div>
            </div>
            <form name={props.authType} onSubmit={handleSubmit} className="form">
                <ul className="authorization__container">
                    {props.authType === "register" && (
                        <li className="authorization__part-form">
                            <p className="authorization__name">Имя</p>
                            <input
                                className="authorization__input"
                                value={values.name || ""}
                                onChange={handleChange}
                                placeholder="Имя"
                                maxLength="30"
                                minLength="2"
                                name="name"
                                type="text"
                                id="name"
                                required
                            />
                        </li>
                    )}
                    {props.authType === "register" && (
                        <p className="authorization__validation-text">{errors.name && "Имя должно состоять из минимум двух букв"}</p>
                    )}
                    <li className="authorization__part-form">
                        <p className="authorization__name">E-mail</p>
                        <input
                            pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                            className="authorization__input"
                            value={values.email || ""}
                            onChange={handleChange}
                            placeholder="E-mail"
                            maxLength="30"
                            minLength="2"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                    </li>
                    <p className="authorization__validation-text">{errors.email && "Пример email: user@example.com"}</p>
                    <li className="authorization__part-form">
                        <p className="authorization__name">Пароль</p>
                        <input
                            pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$"
                            className="authorization__input"
                            value={values.password || ""}
                            onChange={handleChange}
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            name="password"
                            maxLength="30"
                            minLength="2"
                            required
                        />
                    </li>
                    <p className="authorization__validation-text">{errors.password
                        && "Пароль должен содержать как минимум 8 символов. Одну букву нижнего " +
                        "регистра, одну верхнего, одну цифру и хотя бы один спецсимвол"}</p>
                </ul>
                <div className="authorization__confirm">
                    <button
                        className={`${
                            props.authType === "register"
                                ? "authorization__confirm-button"
                                : "authorization__confirm-button authorization__confirm-button-login"}
                                ${props.authType === "register"
                            ? (errors.name
                                || errors.email
                                || errors.password
                                || values.name === undefined
                                || values.email === undefined
                                || values.password === undefined)
                            && "authorization__confirm-button_disable"
                            : (errors.email
                                || errors.password
                                || values.email === undefined
                                || values.password === undefined)
                            && "authorization__confirm-button_disable"
                        }`}
                        type="submit">
                        {props.button}
                    </button>
                    <div className="authorization__confirm-container">
                        <p className="authorization__confirm-text">{props.text}</p>
                        <a className="authorization__confirm-link" href={props.linkRout}>
                            {props.link}
                        </a>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Authorization;