function MovieItem({ movie, isFavorite, onToggleFavorite, onSelectMovie }) {
	return (
		<article className="movie-card">
			<div className="movie-row-main">
				<h3 className="movie-title">{movie.title}</h3>
				<span className="movie-genre">{movie.genre}</span>
				<span className="movie-year">{movie.year}</span>
				<span className="movie-rating"><i className="bi bi-star-fill" aria-hidden="true" /> {movie.rating.toFixed(1)}</span>
			</div>
			<div className="movie-actions">
				<button className={`favorite-button${isFavorite ? ' is-favorite' : ''}`} type="button" aria-label={`${isFavorite ? 'Xóa' : 'Thêm'} ${movie.title} ${isFavorite ? 'khỏi' : 'vào'} danh sách yêu thích`} aria-pressed={isFavorite} onClick={() => onToggleFavorite(movie.id)}>
					<i className={`bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true" />
					{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
				</button>
				<button className="detail-button" type="button" onClick={() => onSelectMovie(movie)}>
					<i className="bi bi-info-circle" aria-hidden="true" /> Chi tiết
				</button>
			</div>
		</article>
	);
}

export default MovieItem;
