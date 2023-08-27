import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState, useEffect} from "react";
import "./MoviesCardList.css";
import React from "react";
import {
    MAX_MOVIES_1280,
    MAX_MOVIES_768,
    MAX_MOVIES_480,
    MAX_MOVIES_STEP_1280,
    MAX_MOVIES_STEP_768,
    MAX_MOVIES_STEP_480,
    MAX_WINDOW_SIZE_480,
    MAX_WINDOW_SIZE_1280,
} from "../../utils/constants";

const MoviesCardList = ({cards, flag, savedMovies, onSave, onDelete}) => {
    const [maxMovies, setMaxMovies] = useState(0);
    const [step, setStep] = useState(0);
    const [rerender, setRerender] = useState();

    useEffect(() => {
        setTimeout(() => {
            const count = Array.from(document.querySelectorAll(".movies-card__card"))
                .reduce(
                    (acc, {offsetTop: n}) => (
                        acc[acc.length - 1]?.[0] === n || acc.push([n, 0]),
                            acc[acc.length - 1][1]++,
                            acc
                    ),
                    []
                )
                .map((n) => n[1]);
            setMoviesRules(count[0]);
        }, 10);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setTimeout(() => {
                const count = Array.from(document.querySelectorAll(".movies-card__card"))
                    .reduce(
                        (acc, {offsetTop: n}) => (
                            acc[acc.length - 1]?.[0] === n
                            || acc.push([n, 0]),
                                acc[acc.length - 1][1]++,
                                acc
                        ),
                        []
                    )
                    .map((n) => n[1]);
                setMoviesRules(count[0]);
            }, 500);
        });
        setRerender(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showMoreMovies = () => {
        setMaxMovies(maxMovies + step);
    };

    const setMoviesRules = () => {
        setMaxMovies(cards.length);
        const currentSize = window.innerWidth;

        if (currentSize < MAX_WINDOW_SIZE_480) {
            setMaxMovies(MAX_MOVIES_480);
            setStep(MAX_MOVIES_STEP_480);
        } else if (currentSize > MAX_WINDOW_SIZE_480 && currentSize < MAX_WINDOW_SIZE_1280) {
            setMaxMovies(MAX_MOVIES_768);
            setStep(MAX_MOVIES_STEP_768);
        } else {
            setMaxMovies(MAX_MOVIES_1280);
            setStep(MAX_MOVIES_STEP_1280);
        }
    };

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__container">
                {cards.map((card, index) => {
                    if (index < maxMovies) {
                        return (
                            <MoviesCard
                                key={card.id || card.movieId}
                                savedMovies={savedMovies}
                                onDelete={onDelete}
                                onSave={onSave}
                                card={card}
                                flag={flag}
                            />
                        );
                    }
                    return null;
                })}
            </ul>
            <ScrollMoviesBtn
                onClick={showMoreMovies}
                maxMovies={maxMovies}
                cards={cards}
            />
        </section>
    );
};

export default MoviesCardList;