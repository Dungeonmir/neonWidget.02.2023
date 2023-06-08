import Bar from "./components/Bar/Bar"
import Loader from "./components/Loader"
import ObjectProperties from "./components/ObjectProperties/ObjectProperties"
import WidgetCanvas from "./components/WidgetCanvas/WidgetCanvas"
import { getColors, getData } from "./resources/constants"
export default class Widget {
	private _element: HTMLDivElement
	private _upbar: Bar
	private _canvas: WidgetCanvas
	private _objectPropertiesBar: ObjectProperties
	constructor() {
		this._element = document.createElement("div")
		document.querySelector("body").appendChild(this._element)
		this._element.classList.add("containerCol")
		this._element.style.overflow = "hidden"
	}
	async initialize() {
		this._canvas = new WidgetCanvas(this._element)
		const loader = new Loader(this._element)
		await getData()
		loader.hide()
		getColors()
		this._upbar = new Bar(this._element, this._canvas)
		this._objectPropertiesBar = new ObjectProperties(
			this._element,
			this._canvas
		)
	}

	loadFonts(fonts: string[]) {
		fonts.map((font) => {
			const p = document.createElement("p")
			p.innerHTML = `&ensp;`
			p.style.fontFamily = font
			p.style.position = "absolute"
			this._element.appendChild(p)
		})
	}

	getCanvas(): WidgetCanvas {
		return this._canvas
	}
}
