import { ShadowText } from 'components'
import Squiggle from 'components/Squiggle'
import useMousePosition from 'hooks/useMousePosition'

import { FC, useRef, useState } from 'react'

interface HeroProps {}

const Title = () => {
	const boundary = useRef<HTMLDivElement>()
	const { x, y } = useMousePosition(boundary.current)
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return (
		<div className='relative w-min'>
			<div
				ref={boundary}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className='z-20 w-[200%] h-[200%] absolute -top-1/2 -left-1/2'
			/>
			<div
				className='transition-transform ease-out duration-300'
				style={{
					transform: isHovered
						? `translate(${(x / boundary.current.clientWidth - 0.5) * 25}%, ${(y / boundary.current.clientHeight - 0.5) * 25}%)`
						: undefined,
				}}
			>
				<div className='flex flex-col'>
					<ShadowText size={96} offset={isHovered ? 0 : 4} direction='left'>
						Port
					</ShadowText>
					<ShadowText size={96} offset={isHovered ? 0 : 4} direction='left'>
						folio
					</ShadowText>
				</div>
			</div>
		</div>
	)
}

const Hero: FC<HeroProps> = (props) => {
	return (
		<div className='flex snap-start h-screen flex-shrink-0 flex-col lg:flex-row'>
			<div className='flex flex-col pt-20 lg:pt-0 mx-8 flex-1 items-center justify-center'>
				<div className='flex flex-col'>
					<Title />
					<span className='my-8'>
						<Squiggle />
					</span>
					<div className='flex flex-col flex-1 uppercase tracking-widest '>
						<span className='font-bold'>Koban Davis</span>
						<span className='font-light'>Web Developer</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col pt-20 lg:pt-0 mx-8 flex-1 items-center justify-center'>
				<div className='flex flex-col uppercase text-3xl font-bold'>
					<span className='p-1 m-1 cursor-pointer'>Profile</span>
					<span className='p-1 m-1 cursor-pointer'>Experience</span>
					<span className='p-1 m-1 cursor-pointer'>Hobbies</span>
					<span className='p-1 m-1 cursor-pointer'>Contact</span>
				</div>
			</div>
		</div>
	)
}

export default Hero
