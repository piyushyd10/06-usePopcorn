import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import WatchlistPage from "./WatchlistPage";
import LoginPage from "./LoginPage";
import { AuthProvider } from "./AuthContext";
import { useLocalStorageState } from "./useLocalStorageState";

export default function AppRouter() {
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handledeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watched={watched}
                onDeleteWatched={handledeleteWatched}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
