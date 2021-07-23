import "../assets/css/modules/_pagination.scss";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    let isLastPage = (currentPage === pageNumbers.length);

    console.log(currentPage);

    return (
        <div className="o-container">
            <nav className="pagination">
                <ul>
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`${
                                currentPage === number ? "current" : ''
                            } ${
                                number === 1 ||
                                currentPage - 1 === number ||
                                currentPage + 1 === number ||
                                pageNumbers.length === number ||
                                (isLastPage && currentPage - 2 === number)
                                    ? "active" : ''
                            }`}
                        >
                            <a
                                href="!#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    paginate(number);
                                }}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
