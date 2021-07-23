import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import usePrevious from "../utils/usePrevious";
import PageHeader from "../modules/PageHeader";
import SearchForm from "../modules/SearchForm";
import SearchResults from "../modules/SearchResults";
import Pagination from "../modules/Pagination";

function Help() {
    let history = useHistory();
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const prevProps = usePrevious({history});

    const handleResults = (data) => setResults(data);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => {
        setCurrentPage(number);
        history.push(`/page/${number}`);
    };

   
    useEffect(() => {

        return history.listen(() => {
            if (history.action === "POP") {
                const previousUrl = prevProps.history.location.pathname;
                setCurrentPage(parseInt(previousUrl.substr(previousUrl.indexOf("page/")+5).match(/^\d*/)[0]) || 1);
            }
        });
    }, [history, prevProps]);

    return (
        <div className="section-help">
            <div className="section-help__top">
                <PageHeader text="Get Help From Sky" />
                <SearchForm handleResults={handleResults} />
            </div>
            <SearchResults results={currentPosts} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={results.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default Help;
