import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import "./App.css"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../infoTooltipUpdate/infoTooltipUpdate"

import CurrentUserContext from "../../contexts/CurrentUserContext"

import * as api from "../../utils/MainApi.js"

function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
  useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const path = location.pathname
  const navigate = useNavigate()

  //Описание:
  //Этот useEffect выполняет проверку наличия токена
  // авторизации в локальном хранилище (localStorage)
  //при монтировании компонента. Если токен найден, выполняется
  // запрос к API с использованием токена для получения контента.
  // Если запрос успешен, удаляется ключ "allMovies" из локального хранилища,
  // и устанавливается флаг isLoggedIn в значение true. Затем происходит
  // перенаправление на указанный путь path.
  // Если происходит ошибка при запросе, она выводится в консоль.

  //Комментарий // eslint-disable-line react-hooks/exhaustive-deps
  // используется для отключения проверки зависимостей данного useEffect,
  // чтобы избежать предупреждения об отсутствии зависимостей в зависимостях массива.
  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Если пользователь авторизован, получаем информацию о профиле пользователя

    //Эта часть кода выполняется только в случае, если пользователь авторизован.
    // Она отвечает за получение информации о профиле пользователя.
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          // Устанавливаем полученные данные о пользователе в состояние
          //Данные о профиле пользователя, полученные из API, сохраняются в
          // состоянии компонента с помощью функции setCurrentUser.
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      // Получаем сохраненные фильмы пользователя
      //Здесь выполняется запрос к API для получения сохраненных фильмов пользователя.
      api
        .getMovies()
        .then((cardsData) => {
          // Обратная сортировка данных фильмов
          //Полученные данные фильмов сортируются в обратном порядке,
          // чтобы последние сохраненные фильмы отображались первыми.
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
    //Этот эффект будет запускаться при изменении значения isLoggedIn или navigate .
    // Если эти значения изменяются, эффект будет повторно вызван и выполнит
    // запросы к API для получения информации о профиле пользователя и сохраненных фильмах.
  }, [isLoggedIn, navigate])

  function handleRegister({ name, email, password }) {
    // Вызываем метод API для регистрации пользователя
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)

        // Если регистрация прошла успешно, выполняем авторизацию пользователя
        handleAuthorize({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        // В случае ошибки при регистрации, устанавливаем флаг isSuccess в значение false
        setIsSuccess(false)
        console.log(err)
      })
  }

  //авторизация пользователя
  function handleAuthorize({ email, password }) {
    // Устанавливаем флаг isLoading в значение true
    setIsLoading(true)
    // Вызываем метод API для авторизации пользователя
    api
      .authorize(email, password)
      .then((res) => {
        // Если авторизация прошла успешно (без ошибок), выполняем следующие действия
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          // Сохраняем JWT-токен в локальном хранилище
          localStorage.setItem("jwt", res.token)
          // Перенаправляем пользователя на страницу "./movies"
          // navigate("./movies")
          navigate("/movies", { replace: true })
          // Устанавливаем флаг isLoggedIn в значение true
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        // В случае ошибки при авторизации, устанавливаем флаг isSuccess в значение false
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        // В любом случае, после завершения запроса, устанавливаем флаг isLoading в значение false
        setIsLoading(false)
      })
  }

  function handleUpdateUser(newUserInfo) {
    // Устанавливаем флаг isLoading в значение true
    setIsLoading(true)

    // Вызываем метод API для обновления информации о пользователе
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        // Если обновление прошло успешно (без ошибок), выполняем следующие действия
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true) // Устанавливаем флаг setIsUpdate в значение true

        setCurrentUser(data) // Устанавливаем новую информацию о пользователе
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        // В случае ошибки при обновлении, устанавливаем флаг setIsUpdate в значение false
        setIsUpdate(false)

        console.log(err)
        handleUnauthorized(err) // Обрабатываем ошибку авторизации
      })
      .finally(() => {
        // В любом случае, после завершения запроса, устанавливаем флаг isLoading в значение false
        setIsLoading(false)
      })
  }

  function handleCardLike(card) {
    // Вызываем метод API для добавления карточки в избранное
    api
      .saveMovie(card)
      .then((newMovie) => {
        // Если операция прошла успешно (без ошибок), выполняем следующие действия
        //Обновляем список избранных карточек (savedMovies),
        // добавляя новую карточку newMovie в начало списка с помощью оператора расширения (...).
        setSavedMovies([newMovie, ...savedMovies]) // Добавляем новую карточку в список избранных карточек
      })
      .catch((err) => {
        // В случае ошибки при добавлении карточки в избранное, устанавливаем флаг isSuccess в значение false
        setIsSuccess(false)
        console.log(err);
        //handleUnauthorized(err) // Обрабатываем ошибку авторизации
      })
  }

  function handleCardDelete(card) {
    // Вызываем метод API для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        // Если операция прошла успешно (без ошибок), выполняем следующие действия
        //Обновляем список избранных карточек (savedMovies), фильтруя состояние state
        // и оставляя только те карточки, идентификаторы которых не совпадают
        // с идентификатором удаляемой карточки card._id.
        setSavedMovies((state) => state.filter((item) => item._id !== card._id)) // Удаляем карточку из списка избранных карточек
      })
      .catch((err) => {
        // В случае ошибки при удалении карточки, устанавливаем флаг isSuccess в значение false
        setIsSuccess(false)
        console.log(err)
        handleUnauthorized(err) // Обрабатываем ошибку авторизации
      })
  }

  function handleUnauthorized(err) {
    // Проверяем, является ли ошибка ошибкой авторизации (401 Unauthorized)
    if (err === "Error: 401") {
      handleSignOut() // Вызываем функцию handleSignOut для выхода из приложения
    }
  }

  const handleSignOut = () => {
    // Устанавливаем флаг isLoggedIn в значение false, указывая, что пользователь вышел из системы
    setIsLoggedIn(false)

    // Удаляем токен авторизации из локального хранилища
    localStorage.removeItem("jwt")

    // Удаляем сохраненные данные фильмов из локального хранилища
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    //localStorage.clear() очищает все данные в локальном хранилище, удалая все элементы.
    localStorage.clear()
    // Перенаправляем пользователя на главную страницу
    navigate("/")
  }

  //ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  //ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ ПО ОВЕРЛЕЙ
  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }
  //ПЕРЕМЕННАЯ ДЛЯ ОТСЛЕЖИВАНИЯ БУЛЕВОГО СОСТОЯНИЯ ПОПАПОВ ПОДТВЕРЖДЕНИЯ И РЕДАКТИРОВАНИЯ ДАННЫХ
  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  //useEffect ОТСЛЕЖИВАЮЩИЙ СОСТОЯНИЕ ПОПАПОВ И СОЗДАЕТ И УДАЛЯЕТ СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПОВ ПО ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />

            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    onAuthorization={handleAuthorize}
                    isLoading={isLoading}
                  />
                )
              }
            />

            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register onRegister={handleRegister} isLoading={isLoading} />
                )
              }
            />

            <Route path={"*"} element={<NotFound />} />

            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  onDeleteCard={handleCardDelete}
                  component={Movies}
                  handleLikeFilm={handleCardLike}
                />
              }
            />

            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  onDeleteCard={handleCardDelete}
                  component={SavedMovies}
                />
              }
            />

            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  signOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  loggedIn={isLoggedIn}
                  component={Profile}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>

          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlay}
          />

          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            onClose={closeAllPopups}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
