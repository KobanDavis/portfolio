import { CSSProperties, FC, ReactNode, useState } from 'react'
import clsx from 'clsx'

interface ShadowTextProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	color?: string
	shadowColor?: string
	shadow?: ReactNode
	size?: number
	spacing?: number
	offset?: number
	weight?: CSSProperties['fontWeight']
	direction?: 'left' | 'right'
}

const ShadowText: FC<ShadowTextProps> = ({
	children,
	shadow,
	size = 16,
	spacing = 4,
	weight = 'bold',
	color = 'black',
	shadowColor = 'black',
	offset = size / 4,
	direction = 'right',
	className,
	...props
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ fontSize: size, letterSpacing: spacing, fontWeight: weight, lineHeight: `${size}px` }}
			className={clsx('relative uppercase', className)}
			{...props}
		>
			<div className='text-transparent'>{children}</div>
			<div style={{ color }} className='absolute z-10 top-0 left-0'>
				{children}
			</div>
			<div
				className='absolute transform text-transparent transition-all duration-200'
				style={{
					top: isHovered ? 0 : offset,
					left: isHovered ? 0 : direction === 'left' ? offset * -1 : offset,
					WebkitTextStrokeWidth: 1,
					WebkitTextStrokeColor: shadowColor,
				}}
			>
				{shadow || children}
			</div>
		</div>
	)
}

export default ShadowText
