import { FC, useEffect, useRef } from 'react'
import Blob from './Blob'

interface PhotoProps {}

const Photo: FC<PhotoProps> = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	useEffect(() => {
		const initBlob = (canvas: HTMLCanvasElement) => {
			const image = new Image(400, 400)
			image.src = '/400x400.jpg'
			image.onload = () => {
				const onMove = (e) => blob.onMouseMove(e)
				const blob = new Blob(canvas, image)
				window.addEventListener('mousemove', onMove)
				window.addEventListener('pointermove', onMove)

				blob.init()
				blob.render()

				return () => {
					window.removeEventListener('mousemove', onMove)
					window.removeEventListener('pointermove', onMove)
				}
			}
		}

		if (canvasRef.current) {
			initBlob(canvasRef.current)
		}
	}, [])

	return <canvas width={400} height={400} ref={canvasRef} />
}

export default Photo
