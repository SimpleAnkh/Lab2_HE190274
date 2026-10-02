import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { movies } from './datas/movies';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function Library() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All genres');
  const [sort, setSort] = useState('default');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = window.localStorage.getItem('cinema-favorites');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('cinema-favorites', JSON.stringify(favorites));
    } catch {
      return;
    }
  }, [favorites]);

  const availableGenres = [...new Set(movies.map((movie) => movie.genre))]
    .sort((first, second) => first.localeCompare(second));
  const genres = ['All genres', ...availableGenres];
  const visibleMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return movies
      .filter((movie) => genre === 'All genres' || movie.genre === genre)
      .filter((movie) => !favoritesOnly || favorites.includes(movie.id))
      .filter((movie) => movie.title.toLowerCase().includes(normalizedQuery))
      .sort((first, second) => {
        if (sort === 'rating-desc') return second.rating - first.rating;
        if (sort === 'rating-asc') return first.rating - second.rating;
        return 0;
      });
  }, [favorites, favoritesOnly, genre, query, sort]);

  function toggleFavorite(movieId) {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    );
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <Header query={query} onQueryChange={setQuery} />
      <main className="library-main">
        <section className="library-toolbar" aria-label="Bộ lọc phim">
          <div className="filter-group">
            <GenreFilter genres={genres} selectedGenre={genre} onGenreChange={setGenre} />
            <label className="select-control">
              <span className="visually-hidden">Sắp xếp phim</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="default">Mặc định</option>
                <option value="rating-desc">Điểm: cao → thấp</option>
                <option value="rating-asc">Điểm: thấp → cao</option>
              </select>
            </label>
          </div>
        </section>

        <div className="results-heading" aria-live="polite">
          <p>Tổng: <strong>{movies.length}</strong></p>
          <button
            className={`favorites-metric${favoritesOnly ? ' is-active' : ''}`}
            type="button"
            aria-pressed={favoritesOnly}
            aria-label={favoritesOnly ? 'Hiển thị tất cả phim' : 'Lọc phim yêu thích'}
            onClick={() => setFavoritesOnly((current) => !current)}
          >
            Yêu thích: <strong>{favorites.length}</strong>
          </button>
          <p>Đang hiển thị: <strong>{visibleMovies.length}</strong></p>
        </div>
        <MovieList
          movies={visibleMovies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectMovie={setSelectedMovie}
          hasFilters={Boolean(query || genre !== 'All genres' || favoritesOnly)}
          onClearFilters={() => {
            setQuery('');
            setGenre('All genres');
            setFavoritesOnly(false);
          }}
        />
      </main>
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={() => toggleFavorite(selectedMovie.id)}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

function App() {
  return <ThemeProvider><Library /></ThemeProvider>;
}

export default App;