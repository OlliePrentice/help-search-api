import SearchResult from "../cards/SearchResult";

import "../assets/css/modules/_search-results.scss";

function SearchResults({ results }) {
    return (
        <div className="search-results">
            <div className="o-container">
                <ul className="search-results__list u-width-4/5@medium u-width-3/5@x-large">
                    {results.map((item, index) => (
                        <li key={index}>
                            <SearchResult title={item.title} url={item.url} description={item.description} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchResults;