import React from "react";
import "./HeaderAuth.css";

function HeaderAuth() {
    return (
        <div className="header-auth">
            <a href="/signup" className="header-auth__signup-button">Регистрация</a>
            <a href="/signin" className="header-auth__entry-button">Войти</a>
        </div>
    );
}

export default HeaderAuth;
