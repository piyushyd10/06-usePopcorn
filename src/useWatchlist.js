import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function normalize(movie) {
    return {
      _id: movie._id,
      imdbID: movie.imdbID,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdbRating: movie.imdbRating,
      userRating: movie.userRating,
      runtime: movie.runtime || movie.duration,
      countRatingDecisions: movie.countRatingDecisions || 1,
    };
  }

  useEffect(() => {
    async function fetchWatchlist() {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL);
        setWatchlist(response.data.map(normalize));
      } catch (err) {
        setError("Failed to fetch watchlist");
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  async function addToWatchlist(movie) {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, movie);
      setWatchlist((prev) => [...prev, normalize(response.data)]);
    } catch (err) {
      setError("Failed to add movie to watchlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWatchlist(movieId) {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${movieId}`);
      setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (err) {
      setError("Failed to remove movie from watchlist");
    } finally {
      setIsLoading(false);
    }
  }
  async function clearWatchlist() {
    setIsLoading(true);
    try {
      await axios.delete(API_URL);
      setWatchlist([]);
    } catch (err) {
      setError("Failed to clear watchlist");
    } finally {
      setIsLoading(false);
    }
  }
  return {
    watchlist,
    isLoading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
  };
}
