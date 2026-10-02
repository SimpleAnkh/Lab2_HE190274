import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const storedValue = window.localStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		} catch {
			return initialValue;
		}
	});

	function updateValue(nextValue) {
		setValue((currentValue) => {
			const resolvedValue = typeof nextValue === 'function' ? nextValue(currentValue) : nextValue;
			try {
				window.localStorage.setItem(key, JSON.stringify(resolvedValue));
			} catch {
				return resolvedValue;
			}
			return resolvedValue;
		});
	}

	return [value, updateValue];
}
