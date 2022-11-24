import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import NextLink from 'next/link'
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const Nav: FC = () => {
	const { route } = useRouter()
	const currentRef = useRef<HTMLDivElement>(null)
	const restRef = useRef<HTMLDivElement>(null)
	const [hovered, setIsHovered] = useState<boolean>(false)

	const current = route.slice(1)
	if (!current) return null

	const items = ['profile', 'experience', 'contact', 'home']
	const links = items.filter((item) => item !== current)

	return (
		<div
			style={{
				right: (hovered ? 0 : -(items.length - 1) * 40) + 24,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='hover:delay-[0ms] delay-300 fixed flex flex-col text-right cursor-pointer top-0 right-4 transition-all ease-in-out duration-300 [writing-mode:tb] rotate-180'
		>
			<div ref={currentRef} className='font-bold py-4 text-4xl '>
				{capitalise(current)}
			</div>
			{links.map((link, i) => (
				<div
					key={link}
					style={{
						transitionDelay: `${hovered ? 300 - (links.length - i - 1) * (300 / links.length) : 0}ms`,
					}}
					ref={restRef}
					className={clsx('font-bold text-4xl py-4 transition-all duration-300', hovered ? 'translate-y-0' : 'translate-y-full ')}
				>
					<span onClick={() => setIsHovered(false)} className='text-gray-400 hover:text-black transition-colors'>
						<NextLink href={link === 'home' ? '/' : `/${link}`}>{capitalise(link)}</NextLink>
					</span>
				</div>
			))}
		</div>
	)
}

export default Nav
