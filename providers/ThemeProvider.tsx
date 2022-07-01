import { useContext, createContext, FC, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeContext = {
	isDark: boolean
}

interface ThemeProviderProps {
	children?: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const ql = window.matchMedia('(prefers-color-scheme: dark)')
		setTheme(ql.matches ? 'dark' : 'light')

		const onThemeChange = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light')

		ql.addEventListener('change', onThemeChange)
		return () => ql.removeEventListener('change', onThemeChange)
	}, [])

	return <Theme.Provider value={{ isDark: theme === 'dark' }} {...props} />
}

const Theme = createContext<ThemeContext>(null)

const useTheme = (): ThemeContext => useContext<ThemeContext>(Theme)

export { ThemeProvider, useTheme }
