import clsx from 'clsx'
import BackgroundParallax from 'components/BackgroundParallax'
import { FC, useRef } from 'react'

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

const bg =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkSURBVHgB7cNBCQAwDASwY/4FnbuVqugngaTt3znyAgAAABwbwdUGUUuAs94AAAAASUVORK5CYII='
const backgroundImage = `url(${bg})`

const Background: FC<BackgroundProps> = ({ children, className, style, ...props }) => {
	const ref = useRef<HTMLDivElement>()
	return (
		<div ref={ref} className={clsx('bg-repeat dark:backdrop-invert', className)} style={{ backgroundImage, ...style }} {...props}>
			<BackgroundParallax el={ref} />
			{children}
		</div>
	)
}

export default Background
