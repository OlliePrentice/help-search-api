import { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import usePrevious from "../utils/usePrevious";

import "../assets/css/modules/_search-form.scss";

function SearchForm({ handleResults }) {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const prevProps = usePrevious({ history });
    const form = useRef(null);

    const handleSubmit = useCallback( async (evt, browserBack, prevSearch) => {
        evt.preventDefault();

        let query = search;

        if(browserBack) {
            query = prevSearch;
        }

        if(!loading) {
            setLoading(true);

            try {
                let response = { results: [] };
                
                if(query) {
                    response = await (
                        await fetch(
                            `https://help-search-api-prod.herokuapp.com/search?query=${query}`
                        )
                    ).json();
                }

                setTimeout(() => {
                    if(!prevSearch) {
                        history.push(`/?s=${query}`);
                    }
                    
                    handleResults(response.results, query);
                    setLoading(false);
                },1000);
          
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
         
        }
    }, [handleResults, history, loading, search]);

    useEffect(() => {
        return history.listen(() => {
            if (history.action === "POP") {
                const previousUrl = prevProps.history.location.search;
                const prevSearch = new URLSearchParams(previousUrl).get("s") || '';

                setSearch(prevSearch);
                handleSubmit(new Event("submit"), true, prevSearch);

            }
        });
    }, [history, prevProps, handleSubmit]);


    return (
        <div className={`search-form ${loading && 'search-form--loading'}`}>
            <span className="loader"></span>
            <div className="o-container">
                <form ref={form} onSubmit={handleSubmit}>
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
                            type="text"
                            className="c-form-input search-form__input"
                            placeholder="Enter search term"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search || ''}
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
