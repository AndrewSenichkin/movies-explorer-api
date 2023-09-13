import React from "react"
import yesIcon from "../../images/checkmark.svg"
import noIcon from "../../images/cross.svg"
import "../InfoTooltip/InfoTooltip.css"

function InfoToolTipUpdate(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isUpdate ? (
          <>
            <img
              src={`${yesIcon}`}
              alt="Редактирование прошла успешно."
              className="popup__signup-image"
            />
            <p className="popup__signup-title">
              Редактирование прошло успешно!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${noIcon}`}
              alt="Редактирование было выполнено некорректно."
              className="popup__signup-image"
            />
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
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

export default InfoToolTipUpdate
