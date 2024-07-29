import clsx from 'clsx'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

interface ShadowCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	delay?: number
}

const ShadowCard: FC<ShadowCardProps> = ({ delay = 0, className, children, ...props }) => {
	const [isVisible, setIsVisible] = useState<boolean>(!Boolean(delay))
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (ref.current) {
			const onScroll = () => {
				const rect = ref.current.getBoundingClientRect()
				// el is completely visible
				const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

				setTimeout(setIsVisible, delay, isVisible)
				setIsVisible(isVisible)
			}

			onScroll()
			window.addEventListener('scroll', onScroll)
			return () => window.removeEventListener('scroll', onScroll)
		}
	}, [ref])
	return (
		<div ref={ref} className={clsx('relative cursor-pointer select-none', className)} {...props}>
			<div
				className={clsx(
					'duration-500 hover:duration-100 border border-black hover:translate-x-0 hover:translate-y-0 transition-transform flex items-center p-1.5 pr-4 bg-white',
					isVisible && '-translate-x-2 -translate-y-2'
				)}
			>
				{children}
			</div>
			<div className='-z-10 absolute top-0 left-0 h-full w-full border border-black'>
				<div className='stripes w-full h-full border-white border-2' />
			</div>
		</div>
	)
}

export default ShadowCard
