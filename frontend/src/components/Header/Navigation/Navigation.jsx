import close from "../../../images/close.svg";
import {Link, NavLink} from "react-router-dom";
import "../NavProfileBtn/NavProfileBtn.css";
import React from "react";
import "./Navigation.css";

function Navigation(props) {
    return (
        <div
            className={
                props.isOpen ? `navigation navigation_is-opened` : `navigation`
            }>
            <div className="navigation__content">
                <button
                    className="navigation__close"
                    type="button"
                    onClick={props.onClick}>
                    <img className="navigation__close-img" src={close} alt="закрыть"/>
                </button>
                <nav>
                    <ul className="navigation__links">
                        <li className="navigation__link-container">
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive
                                        ? "navigation__link navigation__link_active"
                                        : "navigation__link"
                                }>
                                Главная
                            </NavLink>
                        </li>
                        <li className="navigation__link-container">
                            <NavLink
                                to="/movies"
                                className={({isActive}) =>
                                    isActive
                                        ? "navigation__link navigation__link_active"
                                        : "navigation__link"
                                }>
                                Фильмы
                            </NavLink>
                        </li>
                        <li className="navigation__link-container">
                            <NavLink
                                to="/saved-movies"
                                className={({isActive}) =>
                                    isActive
                                        ? "navigation__link navigation__link_active"
                                        : "navigation__link"
                                }>
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                        <li className="navigation__link-container">
                                <Link
                                    className="nav-profile-btn nav-profile-btn-link nav-profile-btn__display_open"
                                    to="/profile">
                                    Аккаунт
                                </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;
