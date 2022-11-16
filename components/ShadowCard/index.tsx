import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface ShadowCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

const ShadowCard: FC<ShadowCardProps> = ({ className, children, ...props }) => {
	return (
		<div className={clsx('relative cursor-pointer select-none', className)} {...props}>
			<div className='border border-black transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform flex items-center p-1.5 pr-4 bg-white'>
				{children}
			</div>
			<div className='-z-10 absolute top-0 left-0 h-full w-full bg-white border border-black' />
		</div>
	)
}

export default ShadowCard
