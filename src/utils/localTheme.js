const THEME_KEY = 'mini-chat-theme'


export function getInitialTheme() {
	if (typeof window === 'undefined') return 'light';
	const saved = localStorage.getItem(THEME_KEY);
	if (saved) return saved;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
}

export function persistTheme(theme) {
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {}
}
