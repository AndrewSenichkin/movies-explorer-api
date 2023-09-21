import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";
import menu from "../../images/menu-button.svg";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  
  const [isClicked, setIsClicked] = React.useState(false)
  const { pathname } = useLocation();
  const isBasePath = pathname === "/";
  const isHeaderPath =
  pathname === "/" ||
  pathname === "/movies" ||
  pathname === "/saved-movies" ||
  pathname === "/profile";
  // Функция для смены цвета для активной ссылки
  const setActive = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpen() {
    setIsClicked(true)
  }

  function handleClose() {
    setIsClicked(false)
  }
  if(isHeaderPath) {
  return (
    <>
      {!loggedIn ? (
        <header className={`header ${!isBasePath  && 'header__signup'}`} id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className={`header ${!isBasePath  && 'header__signup'}`} id="header-gray">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container header__button-container_films">
            <NavLink to="/movies" className={setActive}>
              Фильмы
            </NavLink>

            <NavLink to="/saved-movies" className={setActive}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="изображение кнопки аккаунта"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={menu} alt="меню" />
            </button>
          </div>
          {isClicked ? <Navigation handleClose={handleClose} /> : ""}
        </header>
      )}
    </>
  )
  }
}

export default Header
