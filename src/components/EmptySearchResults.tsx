import React from "react";
import EmptyState from "./EmptyState";

const EmptySearchResults = () => {
  return (
    <div>
      <EmptyState title="No results found" />

      <div>
        <h6>Search Tips</h6>
        <ul>
          <li>Try searching by product category or product feature</li>
          <li>Check the spelling of the keyword entered</li>
          <li>Try alternate words</li>
          <li>Broaden your search by using a more generic keyword</li>
        </ul>
      </div>
    </div>
  );
};

export default EmptySearchResults;
