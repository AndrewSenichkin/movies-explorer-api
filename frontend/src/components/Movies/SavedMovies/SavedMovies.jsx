import SearchErrorServer from "../SearchErrorServer/SearchErrorServer";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import {searchCards} from "../../../utils/searchMovies";
import SearchError from "../SearchError/SearchError";
import SearchForm from "../SearchForm/SearchForm";
import React, {useState, useEffect} from "react";
import Preloader from "../Preloader/Preloader";
import "./SavedMovies.css";

const SavedMovies = ({savedMovies, onSave, onDelete}) => {
    const [newSavedMovies, setNewSavedMovies] = useState(null);
    const [requestError, setRequestError] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [render, setRender] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (newSavedMovies) {
            setMovies(newSavedMovies);
        }
    }, [newSavedMovies])

    useEffect(() => {
        setMovies(savedMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteMovies = async (card) => {
        const result = await onDelete(card, true);

        if (result) return result;

        const savedMoviesNew = movies.slice();
        savedMoviesNew.splice(movies.findIndex((a) => a._id === card), 1);
        movies.splice(movies.findIndex((a) => a._id === card), 1);
        setNewSavedMovies(savedMoviesNew);
    }

    const handleSearchCards = async (line, checkbox) => {
        try {
            setRender(false);
            setRequestError(false);
            setNotFound(false);
            const tagSavedMovies = true
            const findMovies = searchCards(savedMovies, line, checkbox, tagSavedMovies);

            if (findMovies.length === 0) setNotFound(true);
            else setNotFound(false);

            setMovies(findMovies);
            setRender(true);
        } catch (e) {
            setRequestError(true);
            console.warn(e);
        }
    };

    return (
        <main className="content">
            <section className="saved-movies">
                <SearchForm onCard={handleSearchCards} tag="saved-movies"/>
                {notFound && <SearchError/>}
                {requestError && <SearchErrorServer/>}
                {render
                    ? <MoviesCardList
                        onDelete={handleDeleteMovies}
                        flag="delete-favorites-btn"
                        savedMovies={savedMovies}
                        onSave={onSave}
                        cards={movies}/>
                    : <Preloader/>
                }
            </section>
        </main>
    );
};

export default SavedMovies;