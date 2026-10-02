import { useEffect, useRef } from 'react';

function SearchBar({ query, onQueryChange }) {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<label className="search-field">
			<i className="bi bi-search" aria-hidden="true" />
			<span className="visually-hidden">Tìm phim</span>
			<input
				ref={inputRef}
				type="search"
				value={query}
				onChange={(event) => onQueryChange(event.target.value)}
				placeholder="Tìm tên phim"
			/>
			<kbd>/</kbd>
		</label>
	);
}

export default SearchBar;
