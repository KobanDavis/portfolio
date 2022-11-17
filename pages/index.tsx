import { FC } from 'react'
import { HeroTitle, Link, Squiggle } from 'components'

const Home: FC = () => {
	const links = ['profile', 'experience', 'contact']

	return (
		<div className='flex snap-start h-screen flex-shrink-0 flex-col lg:flex-row dark:text-white'>
			<div className='flex flex-col pt-20 lg:pt-0 mx-8 flex-1 items-center justify-center'>
				<div className='flex flex-col'>
					<HeroTitle />
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
					{links.map((link) => (
						<Link to={link} key={link} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
