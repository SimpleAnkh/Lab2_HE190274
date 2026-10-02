function GenreFilter({ genres, selectedGenre, onGenreChange }) {
	return (
		<label className="select-control">
			<span className="visually-hidden">Lọc theo thể loại</span>
			<select value={selectedGenre} onChange={(event) => onGenreChange(event.target.value)}>
				{genres.map((genre) => <option key={genre} value={genre}>{genre === 'All genres' ? 'Tất cả thể loại' : genre}</option>)}
			</select>
		</label>
	);
}

export default GenreFilter;
