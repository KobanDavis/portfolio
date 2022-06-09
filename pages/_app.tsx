import useMousePosition from 'hooks/useMousePosition'
import type { AppProps } from 'next/app'
import { FC, useEffect, useState } from 'react'

import '../styles/globals.css'

const bg =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkSURBVHgB7cNBCQAwDASwY/4FnbuVqugngaTt3znyAgAAABwbwdUGUUuAs94AAAAASUVORK5CYII='

const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [position, setPosition] = useState<string>()

	useMousePosition(({ x, y }) => {
		setPosition(`${(x / window.innerWidth) * 32}px ${(y / window.innerWidth) * 32}px`)
	})

	return (
		<div
			style={{
				backgroundImage: `url(${bg})`,
				backgroundRepeat: 'repeat',
				backgroundPosition: position,
			}}
			className='items-center w-screen h-screen'
		>
			<Component {...pageProps} />
		</div>
	)
}

export default App
