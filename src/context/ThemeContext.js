import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => localStorage.getItem('cinema-theme') || 'dark');

	useEffect(() => {
		localStorage.setItem('cinema-theme', theme);
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	function toggleTheme() {
		setTheme((current) => current === 'light' ? 'dark' : 'light');
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used inside ThemeProvider');
	return context;
}
