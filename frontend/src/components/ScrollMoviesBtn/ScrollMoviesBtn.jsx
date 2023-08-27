import "./ScrollMoviesBtn.css";
import React from "react";

function ScrollMoviesBtn({cards, maxMovies, onClick}) {
    return (
        <div className={cards.length <= maxMovies
            ? 'scroll-movies-btn scroll-movies-btn_none'
            : 'scroll-movies-btn'}
        >
            <button
                className={cards.length <= maxMovies
                    ? "scroll-movies-btn__button-none"
                    : "scroll-movies-btn__button"}
                type="button"
                onClick={onClick}
            >
                Ещё
            </button>
        </div>
    );
}

export default ScrollMoviesBtn;