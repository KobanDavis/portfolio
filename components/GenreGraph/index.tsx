import clsx from 'clsx'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

export interface Genre {
	name: string
	popularity
}

interface GenreGraphProps extends React.HTMLAttributes<HTMLDivElement> {
	genres: Genre[]
	scrollContainer: MutableRefObject<HTMLDivElement>
}

const GenreGraph: FC<GenreGraphProps> = ({ scrollContainer, genres, className, ...props }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const graphRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (graphRef && scrollContainer) {
			scrollContainer.current.addEventListener('scroll', () => {
				const rect = graphRef.current.getBoundingClientRect()
				// el is completely visible
				const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

				setIsVisible(isVisible)
			})
		}
	}, [graphRef, scrollContainer])

	const maxPopularity = genres.reduce((max, { popularity }) => Math.max(popularity, max), 0)
	return (
		<div ref={graphRef} className={clsx('flex justify-around items-baseline w-full border-l border-b border-black', className)} {...props}>
			{genres.map(({ name, popularity }, i) => (
				<div key={name} className='select-none relative flex p-2 [writing-mode:tb] rotate-180 h-full'>
					<span className='font-semibold '>{name}</span>
					<div
						style={{
							height: (isVisible ? (popularity / maxPopularity) * 100 : 0) + '%',
							transitionDelay: i * 100 + 'ms',
						}}
						className='duration-500 flex transition-[height] w-full absolute top-0 left-0 font-semibold bg-black text-white overflow-hidden whitespace-nowrap'
					>
						<span className='p-2'>{name}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default GenreGraph
