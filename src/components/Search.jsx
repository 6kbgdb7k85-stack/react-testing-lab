import React from "react";

function Search({setSearch}) {
  //added testId to search field to find it during testing
  return (
    <div className="ui large fluid icon input">
      <input
        data-testid="search-field"
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
