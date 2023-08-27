import search from "../../../images/search-button.svg";
import searchBtn from "../../../images/findSearch.svg";
import React, {useEffect, useState} from "react";
import "./SearchForm.css";

function SearchForm({onCard, tag, onReset}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!tag) {
            const checked = JSON.parse(localStorage.getItem("checkbox"));
            const valueInput = JSON.parse(localStorage.getItem("line"));

            if (valueInput) setSearchTerm(valueInput);
            if (checked === true) setCheckbox(true);
        }
        setRender(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckbox = () => {
        setCheckbox(!checkbox);
        if (!tag) localStorage.setItem("checkbox", JSON.stringify(!checkbox));
        onCard(searchTerm, !checkbox);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tag) return onCard(searchTerm, checkbox);
        if (document.querySelector(".search__input").value.length === 0) {
            localStorage.removeItem('findMovies');
            localStorage.removeItem('line');
            onReset();
            return (document.querySelector(".search__input").placeholder =
                "Введите сообщение для поиска");
        }
        onCard(searchTerm, checkbox);
    };

    return render && (
        <section className="search">
            <form
                className="search__form"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <div className="search__container">
                    <img
                        className="search__search-image search__search-image-none"
                        src={search}
                        alt="поиск"
                    />
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        maxLength="30"
                        minLength="1"
                        type="text"
                        defaultValue={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search__button">
                        <img
                            className="search__search-image"
                            alt="поиск"
                            src={searchBtn}
                        />
                    </button>
                    <div className="search__border"/>
                    <div className="search__toggle">
                        <label className="search__tumbler">
                            <input
                                type="checkbox"
                                className="search__checkbox"
                                onChange={handleCheckbox}
                                checked={checkbox}
                                id="searchCheckbox"
                            />
                            <span className="search__slider search__slider_off"/>
                        </label>
                        <p className="search__films">Короткометражки</p>
                    </div>
                </div>
                <div className="search__toggle search__toggle_mini-size">
                    <label className="search__tumbler">
                        <input
                            type="checkbox"
                            className="search__checkbox"
                            onChange={handleCheckbox}
                        />
                        <span className="search__slider search__slider_off"/>
                    </label>
                    <p className="search__films">Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;