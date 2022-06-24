import { FC, useRef, useState } from 'react'
import { ShadowText } from 'components'
import useMousePosition from 'hooks/useMousePosition'
import { useTheme } from 'providers/ThemeProvider'

const Title: FC = () => {
	const boundary = useRef<HTMLDivElement>()
	const { x, y } = useMousePosition(boundary.current)
	const [isHovered, setIsHovered] = useState<boolean>(false)

	const { isDark } = useTheme()
	const color = isDark ? 'white' : 'black'

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
					<ShadowText color={color} shadowColor={color} size={96} offset={isHovered ? 0 : 4} direction='left'>
						Port
					</ShadowText>
					<ShadowText color={color} shadowColor={color} size={96} offset={isHovered ? 0 : 4} direction='left'>
						folio
					</ShadowText>
				</div>
			</div>
		</div>
	)
}

export default Title
