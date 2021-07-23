import "../assets/css/cards/_search-result.scss";

function SearchResult({ title, url, description }) {

    return (
        <div className="search-result">
            <a href={url} target="_blank" rel="noreferrer" className="search-result__link c-card">
                <h4 className="search-result__heading c-heading-delta">{title}</h4>
                <div className="search-result__excerpt remove-last-margin">
                    <p>{description}</p>
                </div>
                <span className="border-bar"></span>
            </a>
        </div>
    );
}

export default SearchResult;