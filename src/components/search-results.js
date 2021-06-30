import React from "react";

const SearchResults = ({ results, noResults }) => {
  return (
    <div aria-label="Search Results" className="search-results">
      {results.length === 0 ? (
        <div className="search-results__item">
          <p>0 Results</p>
        </div>
      ) : (
        results.map((result) => {
          return (
            <div className="search-results__item">
              <a href={result.slug}>
                <h3>{result.title}</h3>
              </a>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${result.excerpt.slice(0, 60)}...`,
                }}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
