import { CurrentUserContext } from "../../context/CurrentUserContext";
import React, { useContext, useEffect, useState } from "react";
import useForm from "../../utils/validation";
import "./Profile.css";
import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../utils/constants";

function Profile({ isLoading, signOut, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChangeInput, inactive, resetForm } = useForm();

  // Состояние для отслеживания изменений в значениях полей формы
  const [isLastValues, setIsLastValues] = useState(false);

  // Сброс формы при обновлении текущего пользователя
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  // Обработка отправки формы
  function handleFormSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  // Проверка, являются ли текущие значения полей формы последними сохраненными значениями
  useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          name="user-data"
          className="profile__form form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <label className="profile__label" htmlFor="name">
            <span className="profile__subtitle">Имя</span>
            <input
              className="profile__input"
              placeholder="Имя"
              maxLength="30"
              minLength="2"
              type="text"
              name="name"
              required
              value={values.name || ""}
              pattern={USERNAME_PATTERN}
              onChange={handleChangeInput}
            />
          </label>
          <label className="profile__label" htmlFor="email">
            <span className="profile__subtitle profile__subtitle_bottom">
              E-mail
            </span>
            <input
              className="profile__input profile__input_bottom"        
              onChange={handleChangeInput}
              placeholder="E-mail"
              type="email"
              name="email"
              required
              value={values.email || ""}
              pattern={EMAIL_PATTERN}
            />
          </label>
          <button
            disabled={!inactive ? true : false}
            className={inactive || isLoading || isLastValues
                        ? "profile__btn profile__btn_type_edit"
                        : "profile__btn profile__btn_disable"
                      }
            type="submit"
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__btn profile__btn_type_logout"
          onClick={signOut}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
