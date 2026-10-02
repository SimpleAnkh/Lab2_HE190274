import MovieItem from './MovieItem';

function MovieList({ movies, favorites, onToggleFavorite, onSelectMovie, hasFilters, onClearFilters }) {
	if (!movies.length) {
		return (
			<div className="empty-state">
				<span className="empty-icon"><i className="bi bi-film" aria-hidden="true" /></span>
				<h3>Không tìm thấy phim</h3>
				<p>{hasFilters ? 'Hãy thử từ khóa khác hoặc xóa bộ lọc.' : 'Danh sách phim hiện đang trống.'}</p>
				{hasFilters && <button className="text-button" type="button" onClick={onClearFilters}>Xóa bộ lọc <i className="bi bi-arrow-right" aria-hidden="true" /></button>}
			</div>
		);
	}

	return (
		<div className="movie-grid">
			{movies.map((movie, index) => (
				<div className="movie-grid-item" key={movie.id} style={{ '--card-index': index }}>
					<MovieItem
						movie={movie}
						isFavorite={favorites.includes(movie.id)}
						onToggleFavorite={onToggleFavorite}
						onSelectMovie={onSelectMovie}
					/>
				</div>
			))}
		</div>
	);
}

export default MovieList;
