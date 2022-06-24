import { useEffect, useState } from 'react'

const useIsDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false)
	useEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => setIsDarkMode(event.matches))
	}, [typeof window])

	return isDarkMode
}

export default useIsDarkMode
