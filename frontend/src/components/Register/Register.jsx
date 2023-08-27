import Authorization from "../Authorization/Authorization";
import { Navigate } from "react-router-dom";
import React from "react";

function Register(props) {
    return (!props.auth
            ? <main>
                <Authorization
                    name={["name", "email", "password"]}
                    text="Уже зарегистрированы?"
                    button="Зарегистрироваться"
                    title="Добро пожаловать!"
                    onLogin={props.onLogin}
                    authType="register"
                    linkRout="/signin"
                    link="Войти"
                />
            </main>
            : <Navigate to="/movies"/>
    );
}

export default Register;