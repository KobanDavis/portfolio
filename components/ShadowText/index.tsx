import { CSSProperties, FC } from 'react'

interface ShadowTextProps {
	children?: React.ReactNode
	color?: string
	shadowColor?: string
	shadow?: React.ReactNode
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
}) => {
	return (
		<div style={{ fontSize: size, letterSpacing: spacing, fontWeight: weight, lineHeight: `${size}px` }} className='relative uppercase'>
			<div className='text-transparent'>{children}</div>
			<div style={{ color }} className='absolute z-10 top-0 left-0'>
				{children}
			</div>
			<div
				className='absolute transform text-transparent transition-all duration-200'
				style={{
					top: offset,
					left: direction === 'left' ? offset * -1 : offset,
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
