import clsx from 'clsx'
import React, { FC, useEffect, useState, useRef } from 'react'
interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
	delay?: number
}

const Fade: FC<FadeProps> = ({ delay, className, children }) => {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) {
			const onScroll = () => {
				const rect = ref.current.getBoundingClientRect()
				// el is completely visible
				const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

				setTimeout(setIsVisible, delay, isVisible)
			}

			onScroll()
			window.addEventListener('scroll', onScroll)
			return () => window.removeEventListener('scroll', onScroll)
		}
	}, [ref, isVisible])

	return (
		<div ref={ref} className={clsx('transition-all duration-1000', isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0', className)}>
			{children}
		</div>
	)
}

export default Fade
