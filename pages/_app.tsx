import Background from 'components/Background'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'providers/ThemeProvider'
import { FC } from 'react'

import '../styles/globals.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ThemeProvider>
			<Background>
				<Component {...pageProps} />
			</Background>
		</ThemeProvider>
	)
}

export default App
