import React, { useState } from "react";
import {
  Navbar,
  Search,
  NumResult,
  WatchedSummary,
  WatchedMoviesList,
} from "./App";
import { useLocalStorageState } from "./useLocalStorageState";

export default function WatchlistPage() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");

  function handleDelete(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar movies={watched}>
        <div className="search-wrapper">
          <Search query={query} setQuery={setQuery} />
          <NumResult movies={watched} />
        </div>
      </Navbar>
      <div style={{ width: "100%", marginTop: "2.4rem" }}>
        <div className="box box--full">
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} onDeleteWatched={handleDelete} />
        </div>
      </div>
    </>
  );
}
