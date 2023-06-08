import { Point, Size } from "../../resources/types"
import { fabric } from "fabric"
import ShadowText from "../ShadowText"
import { fonts } from "../../resources/constants"
import ObjectOptions from "./ObjectControls"

export default class WidgetCanvas {
	_canvas: fabric.Canvas
	_canvasElement: HTMLCanvasElement
	_selectedObjects: fabric.Object[]
	constructor(mountElement: HTMLDivElement) {
		var containerWidth =
			window.innerWidth < 500 ? window.innerWidth - 30 : 500
		const canvasClass = "canvasFabric"
		this.makeCanvasDiv(mountElement, canvasClass)
		this._canvas = new fabric.Canvas(canvasClass)
		this._canvas.setBackgroundColor("#101010", () => {})
		this._canvas.setDimensions({
			width: containerWidth,
			height: containerWidth,
		})
		this._canvas.on("selection:created", () => {
			this._selectedObjects = this._canvas.getActiveObjects()
		})
		this._canvas.on("selection:updated", () => {
			this._selectedObjects = this._canvas.getActiveObjects()
		})
		this._canvas.on("selection:cleared", () => {
			this._selectedObjects = null
		})
		this._canvas.on("rotating", () => {
			this._selectedObjects.map((obj) => {
				obj.setCoords()
			})
		})
		ObjectOptions()
	}

	private addRect(w: number, h: number, color: string = "blue") {
		var rect = new fabric.Rect({
			left: this.getCenter().x,
			top: this.getCenter().y,
			fill: "transparent",
			width: w,
			height: h,
			strokeWidth: 1,
			stroke: color,
			strokeUniform: true,
		})
		this.addToScene([rect])

		return rect
	}

	private addToScene(object: fabric.Object[], shouldRender: boolean = true) {
		this._canvas.add(...object)
		shouldRender && this.update()
	}

	private getCenter() {
		const c: Point = {
			x: this.getSize().width / 2,
			y: this.getSize().height / 2,
		}
		return c
	}

	private getSize() {
		const s: Size = {
			width: this._canvas.width,
			height: this._canvas.height,
		}
		return s
	}

	private makeCanvasDiv(mountElement: HTMLDivElement, canvasClass: string) {
		const canvas = document.createElement("canvas")
		mountElement.appendChild(canvas)
		canvas.id = canvasClass
		this._canvasElement = canvas
	}
	private resize(w: number, h: number) {
		this._canvas.setWidth(w)
		this._canvas.setHeight(h)
		this.update()
	}

	addText(text: string) {
		const textElement = new ShadowText(text, 8, "red")
		textElement.changeFont(fonts[0])
		this.alignObject(textElement)
		this.addToScene([textElement])
		textElement.changeShadow("red")
		return textElement
	}
	alignObject(
		object: fabric.Object,
		horizontal: boolean = true,
		vertical: boolean = true
	) {
		vertical &&
			object.set(
				"left",
				this._canvas.width / 2 - object.getScaledWidth() / 2
			)
		horizontal &&
			object.set(
				"top",
				this._canvas.height / 2 - object.getScaledHeight() / 2
			)
		this.update()
	}
	deleteLastActiveObject() {
		this._selectedObjects && this._canvas.remove(...this._selectedObjects)
	}

	selectAll() {
		return new fabric.ActiveSelection(this._canvas.getObjects(), {
			canvas: this._canvas,
		})
	}

	update() {
		this._canvas.renderAll()
	}
}
