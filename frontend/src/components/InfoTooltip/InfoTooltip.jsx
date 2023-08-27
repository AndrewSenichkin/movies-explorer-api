import checkmarkIcon from "../../images/checkmark.svg"
import crossIcon from "../../images/cross.svg";
import "../InfoTooltip/InfoTooltip.css";
import React from "react";

function InfoTooltip({isOpen, onClose, isSuccess, onMessage}) {
    const onCloseWindow = () => {
        onClose();
    }
    return (
        <div className={
            isOpen
                ? `popup popup_opened`
                : `popup`
        }>
            <div className=" popup__content popup_type_info-tooltip">
                <button type="button" className="popup__close-button" onClick={onCloseWindow}/>
                <img
                    src={
                        isSuccess
                            ? checkmarkIcon
                            : crossIcon
                    }
                    alt={
                        isSuccess
                            ? 'Регистрация прошла успешно'
                            : 'В ходе регистрации произошла ошибка'
                    }
                    className="popup__info-tooltip-icon"
                />
                <h3 className="popup__info-tooltip-title">
                    {isSuccess
                        ? `${onMessage}`
                        : `${onMessage}`
                    }
                </h3>
            </div>
        </div>
    );
}

export default InfoTooltip;