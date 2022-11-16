import Blob from './Blob'

class Point {
	private _components: { x: number; y: number }
	private _radialEffect: number = 0
	private _elasticity: number = 0.001
	private _friction = 0.01
	private _acceleration = 0
	private _speed = 0

	constructor(public azimuth: number, private blob: Blob) {
		this._components = {
			x: Math.cos(this.azimuth),
			y: Math.sin(this.azimuth),
		}
		this.setAcceleration(-0.3 + Math.random() * 0.6)
	}

	public solveWith(leftPoint: Point, rightPoint: Point) {
		this.setAcceleration(
			(-0.3 * this._radialEffect + (leftPoint._radialEffect - this._radialEffect) + (rightPoint._radialEffect - this._radialEffect)) * this._elasticity -
				this._speed * this._friction
		)
	}

	public setAcceleration(value: number) {
		this._acceleration = value
		this.setSpeed(this._speed + this._acceleration * 2)
	}

	private setSpeed(value: number) {
		this._speed = value
		this._radialEffect += this._speed * 5
	}

	get position() {
		return {
			x: this.blob.center.x + this._components.x * (this.blob.radius + this._radialEffect),
			y: this.blob.center.y + this._components.y * (this.blob.radius + this._radialEffect),
		}
	}
}

export default Point
