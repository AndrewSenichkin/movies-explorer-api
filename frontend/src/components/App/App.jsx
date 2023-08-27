import {CurrentUserContext} from "../../context/CurrentUserContext";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import React, {useState, useEffect} from "react";
import ProtectedRoute from "../ProtectedRoute";
import handlerError from "../../utils/errors";
import Register from "../Register/Register";
import * as api from "../../utils/mainApi";
import * as auth from "../../utils/auth";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Main from "../Main/Main";
import "./App.css";

function App() {
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(null);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState(null);
    const [render, setRender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSaveMovie = async () => {
        try {
            const data = await api.getMovies();
            setSavedMovies(data);
        } catch (e) {
            console.warn(e);
        }
    };

    const handleTokenCheck = async () => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            setRender(true);
            return;
        }
        try {
            await handleSaveMovie();
            const userInfo = await api.getUserInfo();
            setCurrentUser(userInfo);
            setLoggedIn(true);
            setRender(true);
        } catch (e) {
            console.warn(e);
            setRender(true);
        }
    };

    const handleSaveMovies = async (data) => {
        try {
            console.log(await api.saveMovie(data));
            await handleSaveMovie();
        } catch (e) {
            console.warn(e);
            return e;
        }
    };

    const handleDeleteMovies = async (data) => {
        try {
            console.log(await api.deleteMovies(data));
            await handleSaveMovie();
        } catch (e) {
            console.warn(e);
            return e;
        }
    };

    const handleAuthorization = async (data) => {
        try {
            const userToken = await auth.authorization(data);
            if (userToken) {
                localStorage.setItem("jwt", userToken.token);
                setLoggedIn(true);
                await handleTokenCheck();
                navigate("/movies");
            }
        } catch (error) {
            const errorServer = handlerError(error.status);
            setMessage(errorServer);
            setIsInfoTooltipOpen(true);
        }
    };

    const handleRegistration = async (data) => {
        try {
            await auth.registration(data);
            await handleAuthorization(data);
            setIsRegistrationSuccessful(true);
            setMessage("Пользователь успешно зарегистрирован");
            setIsInfoTooltipOpen(true);
        } catch (error) {
            const errorServer = handlerError(error.status);
            setMessage(errorServer);
            setIsInfoTooltipOpen(true);
        }
    };

    const handleUpdateUserInfo = async (data) => {
        try {
            if (!data.name)
                data = {
                    ...data,
                    name: currentUser.name,
                };
            if (!data.email)
                data = {
                    ...data,
                    email: currentUser.email,
                };
            const userData = await api.updateUserInfo(data);
            setCurrentUser(userData);
            setIsRegistrationSuccessful(true);
            setMessage("Изменения успешно сохранены");
            setIsInfoTooltipOpen(true);
        } catch (error) {
            const errorServer = handlerError(error.status);
            setMessage(errorServer);
            setIsInfoTooltipOpen(true);
        }
    };

    const handleLoginOut = () => {
        localStorage.removeItem("findMovies");
        localStorage.removeItem("checkbox");
        localStorage.removeItem("line");
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        navigate("/");
    };

    const closeAllPopups = () => {
        setIsInfoTooltipOpen(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Header auth={loggedIn}/>
                                <Main/>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/signin"
                        element={<Login onLogin={handleAuthorization} auth={loggedIn}/>}
                    />
                    <Route
                        exact
                        path="/signup"
                        element={<Register onLogin={handleRegistration} auth={loggedIn}/>}
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute render={render} loggedIn={loggedIn}>
                                <Header auth={loggedIn}/>
                                <Profile
                                    handleTokenCheck={handleTokenCheck}
                                    updateUser={handleUpdateUserInfo}
                                    onLogin={handleLoginOut}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute render={render} loggedIn={loggedIn}>
                                <Header auth={loggedIn}/>
                                <Movies
                                    handleTokenCheck={handleTokenCheck}
                                    onDelete={handleDeleteMovies}
                                    savedMovies={savedMovies}
                                    onSave={handleSaveMovies}
                                    onRender={render}
                                />
                                <Footer/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute render={render} loggedIn={loggedIn}>
                                <Header auth={loggedIn}/>
                                <SavedMovies
                                    handleTokenCheck={handleTokenCheck}
                                    onDelete={handleDeleteMovies}
                                    savedMovies={savedMovies}
                                    onSave={handleSaveMovies}
                                />
                                <Footer/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path="/*" element={<NotFoundPage/>}/>
                </Routes>
                <InfoTooltip
                    isSuccess={isRegistrationSuccessful}
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    onMessage={message}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;