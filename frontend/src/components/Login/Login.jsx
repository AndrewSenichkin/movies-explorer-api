import Authorization from "../Authorization/Authorization";
import {Navigate} from "react-router-dom";
import React from "react";

function Login(props) {
    return (!props.auth
      ? <main>
            <Authorization
                onLogin={props.onLogin}
                authType="login"
                title="Рады видеть!"
                button="Войти"
                text="Ещё не зарегистрированы?"
                link="Регистрация"
                linkRout="/signup"
            />
        </main>
        : (<Navigate to="/movies/"/>)
    );
}

export default Login;
