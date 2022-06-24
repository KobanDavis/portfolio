import useMousePosition from 'hooks/useMousePosition'
import { FC, MutableRefObject, useEffect } from 'react'

interface BackgroundProps {
	el: MutableRefObject<HTMLDivElement>
}

const BackgroundParallax: FC<BackgroundProps> = ({ el }) => {
	const p = useMousePosition()

	useEffect(() => {
		if (el.current) {
			el.current.style.backgroundPosition = `${(p.x / window.innerWidth) * 32}px ${(p.y / window.innerWidth) * 32}px`
		}
	}, [el.current, p])

	return <div className='hidden' />
}

export default BackgroundParallax
