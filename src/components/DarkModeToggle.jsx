import React from 'react'


export default function DarkModeToggle({ theme, setTheme }) {
const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')
return (
<button
onClick={toggle}
className="px-3 py-2 rounded-xl text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
aria-label="Toggle dark mode"
>
{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
</button>
)
}