import { FC } from 'react'
import { Hero } from 'components'

import Link from 'next/link'
import Squiggle from 'components/Squiggle'

const Home: FC = () => {
	return (
		<div className='snap-y snap-mandatory flex flex-col h-full overflow-y-scroll'>
			<Hero />
		</div>
	)
}

export default Home
