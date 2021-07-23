import { useState } from "react";

import "../assets/css/modules/_search-form.scss";

function SearchForm({ handleResults }) {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(!loading) {
            setLoading(true);

            try {
                const response = await (
                    await fetch(
                        `https://help-search-api-prod.herokuapp.com/search?query=${search}`
                    )
                ).json();

                setTimeout(() => {
                    handleResults(response.results);
                    setLoading(false);
                },1000);
          
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
         
        }
    };

    return (
        <div className={`search-form ${loading && 'search-form--loading'}`}>
            <span className="loader"></span>
            <div className="o-container">
                <form onSubmit={handleSubmit}>
                    <div className="search-form__wrap u-width-4/5@medium u-width-3/5@x-large">
                        <label
                            htmlFor="searchInput"
                            className="c-form-label u-hide-visually"
                        >
                            <strong>Search for help</strong>
                        </label>
                        <input
                            id="searchInput"
                            name="s"
                            className="c-form-input search-form__input"
                            placeholder="Enter search term"
                            onChange={(e) => setSearch(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            className="c-btn c-btn--primary search-form__submit"
                            type="submit"
                            disabled={loading}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;
