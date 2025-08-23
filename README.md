🍿 usePopcorn – Movie Search, Ratings & Watchlist

A React app to search movies, view details, rate them, and keep a personal watched list. The watched list is stored via localStorage for a smooth demo experience.

✨ Features

- 🔍 Search movies (OMDb API) with results list and details panel
- ⭐ Rate a movie and add to watched list (duplicate prevention)
- 📂 Watchlist page with full-width layout and delete support
- 📈 Summary analytics: average IMDb rating, average user rating, average duration
- ⌨️ Keyboard shortcuts (Enter to focus search, Esc to close details)

🧱 Tech Stack

- React, React Router, Custom Hooks, CSS

🧩 Key Concepts

- useLocalStorageState(initial, key): persistent state by key; used for the watched list
- useMovies(query): fetches search results with loading/error handling
- MovieDetails: builds a normalized watched item and guards against duplicates
- WatchedSummary: computes averages; durations formatted to 2 decimals

📷 Images depicting functionalities
<img width="1916" height="907" alt="image" src="https://github.com/user-attachments/assets/cfbfce3a-4b72-4b63-b97b-9a3b9d6bffe3" />
<img width="1882" height="853" alt="image" src="https://github.com/user-attachments/assets/eace3309-2bed-41e0-aa91-63c6cc6efe3f" />

