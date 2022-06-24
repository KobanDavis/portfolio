import clsx from 'clsx'
import { useTheme } from 'providers/ThemeProvider'
import { FC } from 'react'

interface SquiggleProps {}

import styles from './index.module.css'

const Squiggle: FC<SquiggleProps> = (props) => {
	const { isDark } = useTheme()
	return (
		<div
			className={clsx('w-60 h-5 dark:invert', styles.wave)}
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='bg' patternUnits='userSpaceOnUse' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-width='2' d='M -1 10 c 3 -5, 7 -5, 10 0 s 7 5, 10 0 s 7 -5, 7 0 s 7 5, 10 0' /%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)' /%3E%3C/svg%3E")`,
			}}
		/>
	)
}

export default Squiggle
