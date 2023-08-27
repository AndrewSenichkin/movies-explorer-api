import {CurrentUserContext} from "../../context/CurrentUserContext";
import React, {useContext, useEffect, useState} from "react";
import Forms from "../../utils/validation";
import "./Profile.css";

function Profile(props) {
    const {values, errors, handleChange, handleSubmit} = Forms(props.updateUser);
    const [currentUserEdit, setcurrentUserEdit] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    useEffect(() => {
        if ((values.name !== undefined || values.email !== undefined)) setcurrentUserEdit(true);
        else setcurrentUserEdit(false);
    }, [currentUser, name, email, values.name, values.email]);

    return (
        <main>
            <section className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form
                    name="user-data"
                    className="profile__form form"
                    onSubmit={handleSubmit}>
                    <label className="profile__label" htmlFor="name">
                        <span className="profile__subtitle">Имя</span>
                        <input
                            defaultValue={values.name || name}
                            className="profile__input"
                            onChange={handleChange}
                            placeholder="Имя"
                            maxLength="30"
                            minLength="2"
                            type="text"
                            name="name"
                            required
                        />
                    </label>
                    <label className="profile__label" htmlFor="email">
                        <span className="profile__subtitle profile__subtitle_bottom">E-mail</span>
                        <input
                            className="profile__input profile__input_bottom"
                            defaultValue={values.email || email}
                            onChange={handleChange}
                            placeholder="E-mail"
                            type="email"
                            name="email"
                            required
                        />
                    </label>
                    <button
                        className={`profile__btn profile__btn_type_edit  ${
                            (errors.email
                                || errors.name
                                || values.email === email
                                || values.name === name
                                || !currentUserEdit)
                            && "profile__btn_disable"
                        }`}
                        type="submit">
                        Редактировать
                    </button>
                </form>
                <button
                    className="profile__btn profile__btn_type_logout"
                    onClick={props.onLogin}
                    type="button"
                >
                    Выйти из аккаунта
                </button>
            </section>
        </main>
    );
}

export default Profile;