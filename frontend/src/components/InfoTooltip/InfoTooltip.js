import React from "react"
import yesIcon from "../../images/checkmark.svg"
import noIcon from "../../images/cross.svg"
import "./InfoTooltip.css"

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <img
              src={`${yesIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__signup-image"
            />
            <p className="popup__signup-title">
              Добро пожаловать на сайт по поиску фильмов!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${noIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__signup-image"
            />
            <p className="popup__signup-title">
              Что-то пошло не так. Возможно пользователь уже существует!
            </p>
          </>
        )}

        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoToolTip
