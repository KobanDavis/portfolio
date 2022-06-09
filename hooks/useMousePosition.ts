import { useEffect, useState } from 'react'

interface Position {
	x: number
	y: number
}

type OnMouseMove = (position: Position) => void

function useMousePosition(): Position
function useMousePosition(arg1: OnMouseMove): void
function useMousePosition(arg1: EventTarget, cb?: OnMouseMove): Position
function useMousePosition(arg1?: EventTarget | OnMouseMove, cb?: OnMouseMove): Position | void {
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

	const isNode = arg1 instanceof EventTarget

	useEffect(() => {
		const node = isNode ? arg1 : document.body

		if (node) {
			const callback = (isNode ? cb : arg1) ?? setPosition
			const onMouseMove = (e: MouseEvent) => {
				const rect = (e.currentTarget as Element).getBoundingClientRect()
				const x = e.clientX - rect.x
				const y = e.clientY - rect.y
				callback({ x, y })
			}
			node.addEventListener('mousemove', onMouseMove)
			return () => node.removeEventListener('mousemove', onMouseMove)
		}
	}, [isNode])
	return position
}

export default useMousePosition
