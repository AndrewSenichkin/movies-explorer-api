import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import "./Profile.css"
import Header from "../Header/Header"
import useForm from "../hooks/useForm"
import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../utils/constants"

// Компонент Profile представляет страницу профиля пользователя.
function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  // Получение текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // Использование хука useForm для управления формой
  //Значения полей формы хранятся в состоянии enteredValues.
  //Ошибки валидации полей хранятся в состоянии errors.
  //isFormValid указывает, является ли форма валидной.
  //isLastValues указывает, соответствуют ли текущие значения полей
  // последним сохраненным значениям профиля.
  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  // Состояние для отслеживания изменений в значениях полей формы
  const [isLastValues, setIsLastValues] = useState(false)

  // Сброс формы при обновлении текущего пользователя
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  // Обработка отправки формы
  function handleFormSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  // Проверка, являются ли текущие значения полей формы последними сохраненными значениями
  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="имя"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              pattern={USERNAME_PATTERN}
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              placeholder="почта"
              onChange={handleChangeInput}
              pattern={EMAIL_PATTERN}
              value={enteredValues.email || ""}
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          {/*Кнопка "Редактировать" отключается, если форма не валидна, происходит загрузка
           данных или текущие значения полей соответствуют последним сохраненным значениям. */}
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          {/* Кнопка "Выйти из аккаунта" вызывает функцию signOut при клике. */}
          <button type="button" className="profile__exit" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
