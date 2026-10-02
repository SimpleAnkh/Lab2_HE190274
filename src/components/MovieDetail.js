import { useEffect } from 'react';

function MovieDetail({ movie, onClose }) {
	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === 'Escape') onClose();
		}
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return (
		<div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
			<section className="movie-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
				<button className="dialog-close text-button" type="button" onClick={onClose} aria-label="Đóng chi tiết" title="Đóng chi tiết">[Close]</button>
				<div className="dialog-content">
					<h2 id="detail-title">Movie Details</h2>
					<dl className="detail-facts movie-detail-list">
						<div><dt>Title:</dt><dd>{movie.title}</dd></div>
						<div><dt>Genre:</dt><dd>{movie.genre}</dd></div>
						<div><dt>Year:</dt><dd>{movie.year}</dd></div>
						<div><dt>Rating:</dt><dd>{movie.rating.toFixed(1)} / 10</dd></div>
						<div><dt>Director:</dt><dd>{movie.director}</dd></div>
						<div><dt>Duration:</dt><dd>{movie.duration} minutes</dd></div>
						<div><dt>Description:</dt><dd>{movie.description}</dd></div>
					</dl>
				</div>
			</section>
		</div>
	);
}

export default MovieDetail;
