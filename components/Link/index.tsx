import ShadowText from 'components/ShadowText'
import { FC, useState } from 'react'
import NextLink from 'next/link'
import { useTheme } from 'providers/ThemeProvider'
interface LinkProps {
	to: string
}

const Link: FC<LinkProps> = ({ to }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const { isDark } = useTheme()

	const color = isDark ? 'white' : 'black'
	return (
		<ShadowText
			color={color}
			shadowColor={color}
			shadow={to}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			size={32}
			offset={isHovered ? 0 : 2}
			className='p-1 m-1 cursor-pointer'
		>
			<NextLink href={`/${to}`}>{to}</NextLink>
		</ShadowText>
	)
}

export default Link
