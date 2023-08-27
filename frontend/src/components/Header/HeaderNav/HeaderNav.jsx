import {NavLink} from 'react-router-dom';
import React from "react";
import "./HeaderNav.css";

function HeaderNav() {
    return (
        <nav className="header-nav">
            <ul className="header-nav__container">
                <li>
                    <NavLink
                        to="/movies"
                        className={({isActive}) => isActive
                            ? "header-nav__link header-nav__link_active"
                            : "header-nav__link"}>
                        Фильмы
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/saved-movies"
                        className={({isActive}) => isActive
                            ? "header-nav__link header-nav__link_active"
                            : "header-nav__link"}>
                        Сохранённые фильмы
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderNav;
