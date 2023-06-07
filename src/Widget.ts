import Bar from "./components/Bar/Bar"
import Loader from "./components/Loader"
import ObjectProperties from "./components/ObjectProperties/ObjectProperties"
import WidgetCanvas from "./components/WidgetCanvas/WidgetCanvas"
import { getColors, getData, getPriceElement } from "./resources/constants"
export default class Widget {
	private _element: HTMLDivElement
	private _upbar: Bar
	private _canvas: WidgetCanvas
	private _objectPropertiesBar: ObjectProperties
	constructor() {
		this._element = document.createElement("div")
		document.querySelector("body").appendChild(this._element)
		this._element.classList.add("containerCol")
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
	createSelect() {
		/* Change fonts
        const select = new Select(fonts, (ev:Event)=>{
            console.log((ev.target as HTMLInputElement).value);
            (canvas._fabricCanvas._activeObject as IText).fontFamily = (ev.target as HTMLInputElement).value
            canvas._fabricCanvas.renderAll()
        }, document.querySelector(baseLocation))
    */
	}
	getCanvas(): WidgetCanvas {
		return this._canvas
	}
}
