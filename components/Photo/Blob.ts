import Point from './Point'

class Blob {
	private _points: Point[] = []
	private _isHovered: boolean = false
	private _prevMousePoint: { x: number; y: number } = { x: 0, y: 0 }

	private _ctx: CanvasRenderingContext2D
	private _divisional: number
	private _pattern: CanvasPattern

	public radius: number = 150
	public position: { x: number; y: number } = { x: 0.5, y: 0.5 }

	get center() {
		return { x: this._canvas.width * this.position.x, y: this._canvas.height * this.position.y }
	}

	constructor(private _canvas: HTMLCanvasElement, private _image: CanvasImageSource, private _totalPoints: number = 32) {
		this._ctx = this._canvas.getContext('2d')
		this._divisional = (Math.PI * 2) / this._totalPoints
		this._pattern = this._ctx.createPattern(_image, 'repeat')
	}

	public onMouseMove(e: MouseEvent) {
		const rect = this._canvas.getBoundingClientRect()
		const diff = { x: e.clientX - this.center.x - rect.x, y: e.clientY - this.center.y - rect.y }
		console.log(diff, e.clientX, e.clientY, this.center, rect)
		const dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y)
		const angle = Math.atan2(diff.y, diff.x)

		if (dist < this.radius && this._isHovered === false) {
			this._isHovered = true
		} else if (dist > this.radius && this._isHovered === true) {
			this._isHovered = false
		} else {
			return
		}

		let nearestPoint: Point = null
		let distanceFromPoint: number = 100

		this._points.forEach((point) => {
			if (Math.abs(angle - point.azimuth) < distanceFromPoint) {
				nearestPoint = point
				distanceFromPoint = Math.abs(angle - point.azimuth)
			}
		})

		if (nearestPoint) {
			let strength = { x: this._prevMousePoint.x - e.clientX, y: this._prevMousePoint.y - e.clientY }
			let totalStrength = Math.min(100, Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10)
			nearestPoint.setAcceleration((totalStrength / 100) * (this._isHovered ? -1 : 1))
		}


		this._prevMousePoint.x = e.clientX
		this._prevMousePoint.y = e.clientY
	}

	public init() {
		for (let i = 0; i < this._totalPoints; i++) {
			let point = new Point(Math.PI - this._divisional * (i + 1), this)
			this._points.push(point)
		}
	}

	public render() {
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
		this._points[0].solveWith(this._points[this._totalPoints - 1], this._points[1])

		let p0 = this._points[this._totalPoints - 1].position
		let p1 = this._points[0].position
		let _p2 = p1

		this._ctx.beginPath()
		this._ctx.moveTo(this.center.x, this.center.y)
		this._ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)

		for (let i = 1; i < this._totalPoints; i++) {
			this._points[i].solveWith(this._points[i - 1], this._points[i + 1] || this._points[0])

			let p2 = this._points[i].position
			var xc = (p1.x + p2.x) / 2
			var yc = (p1.y + p2.y) / 2
			this._ctx.quadraticCurveTo(p1.x, p1.y, xc, yc)
			this._ctx.fillStyle = '#000000'

			p1 = p2
		}

		var xc = (p1.x + _p2.x) / 2
		var yc = (p1.y + _p2.y) / 2
		this._ctx.quadraticCurveTo(p1.x, p1.y, xc, yc)

		this._ctx.fillStyle = this._pattern
		this._ctx.fill()
		this._ctx.strokeStyle = '#000000'

		requestAnimationFrame(this.render.bind(this))
	}
}

export default Blob
