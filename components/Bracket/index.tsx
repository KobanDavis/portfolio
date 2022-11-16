import { FC, ReactNode } from 'react'

interface BracketProps {
	children: ReactNode
	label: string
}

const Bracket: FC<BracketProps> = ({ label, children }) => {
	return (
		<div className='flex justify-center items-center min-h-screen snap-center my-8'>
			<div className='flex snap-center'>
				<div className='flex items-center'>
					<span className='font-bold [writing-mode:tb] rotate-180'>{label}</span>
					<div className='h-px w-4 ml-2 bg-black rounded-l-full' />
				</div>
				<div className='relative w-max flex items-center justify-center flex-col pl-12'>
					<div className='absolute top-0 left-0 h-full w-4 border border-r-0 border-black  rounded-l-xl' />
					{children}
				</div>
			</div>
		</div>
	)
}

export default Bracket
