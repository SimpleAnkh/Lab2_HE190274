import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

function Header({ query, onQueryChange }) {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="site-header">
			<a className="wordmark" href="#top" aria-label="Mini Movie Manager">Mini Movie Manager</a>
			<span className="header-caption">DANH SÁCH PHIM</span>
			<div className="header-actions">
				<SearchBar query={query} onQueryChange={onQueryChange} />
				<button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`} title={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}>
					<i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} aria-hidden="true" />
					{theme === 'dark' ? 'Dark' : 'Light'}
				</button>
			</div>
		</header>
	);
}

export default Header;
