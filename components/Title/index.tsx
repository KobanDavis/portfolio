import clsx from 'clsx'
import { FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'

interface TitleProps {
	children: ReactNode
	parent: MutableRefObject<HTMLDivElement>
}

const Title: FC<TitleProps> = ({ parent, children }) => {
	const [scrolled, setScrolled] = useState<boolean>(false)
	const selfRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const onScroll = () => {
			const rect = selfRef.current.getBoundingClientRect()
			setScrolled(parent.current.scrollTop > rect.height)
		}

		if (parent && selfRef) {
			onScroll()
			parent.current?.addEventListener('scroll', onScroll)
		}

		return () => parent.current?.removeEventListener('scroll', onScroll)
	}, [parent, selfRef])

	return (
		<>
			<div ref={selfRef} className='transition-transform flex justify-center snap-center'>
				<span className='font-bold text-4xl py-8'>{children}</span>
			</div>
			<div
				className={clsx(
					'fixed top-0 right-4 p-4 transition-transform ease-in-out duration-500 z-10 [writing-mode:tb] rotate-180',
					!scrolled && '-translate-y-full'
				)}
			>
				<span className='font-bold text-4xl'>{children}</span>
			</div>
		</>
	)
}

export default Title
