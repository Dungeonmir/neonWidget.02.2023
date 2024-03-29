import {
	fonts,
	getPriceElement,
	getPriceTextSize,
} from "../../resources/constants"
import ShadowText from "../ShadowText"
import Button from "../UI/Button/Button"
import Tooltip from "../UI/Tooltip/Tooltip"
import WidgetCanvas from "../WidgetCanvas/WidgetCanvas"
import ColorPickButtons from "./ColorButtons/ColorPickButtons"
import "./objectProperties.css"

export default class ObjectProperties {
	private _canvas: WidgetCanvas
	private _element: HTMLDivElement
	constructor(mountElement: HTMLDivElement, canvas: WidgetCanvas) {
		this._element = document.createElement("div")
		this._element.classList.add("objectProperties", "hidden")
		this._canvas = canvas
		mountElement.appendChild(this._element)

		canvas._canvas.on("selection:created", () => {
			this.toggleVisibility()
		})
		canvas._canvas.on("selection:cleared", () => {
			this.toggleVisibility()
		})

		this.optionText()
		this.optionColors()
		this.optionFonts()
		this.optionPrice()
	}

	private addOption(labelText: string = "") {
		const label = document.createElement("div")
		const labelTextElement = document.createElement("p")

		labelTextElement.textContent = labelText
		labelTextElement.classList.add("text")
		labelTextElement.classList.add("labelText")
		label.appendChild(labelTextElement)

		label.classList.add("label")
		this._element.appendChild(label)
		const option = this.addOptionDiv()
		label.appendChild(option)

		return option
	}

	private addOptionDiv() {
		const optionDiv = document.createElement("div")
		optionDiv.classList.add("option")
		return optionDiv
	}

	private addRange(
		min: string,
		max: string,
		step: string,
		mountElement: HTMLDivElement
	) {
		const range = document.createElement("input")
		range.type = "range"
		range.min = min
		range.max = max
		range.step = step
		mountElement.appendChild(range)
	}

	private changeShadow(color: string) {
		this._canvas._selectedObjects.map((obj: ShadowText) => {
			obj.changeShadow(color)
			obj.dirty = true
		})
		this._canvas.update()
	}

	private optionColors() {
		const optionElement = this.addOption("Цвет")
		const colorPickButtons = new ColorPickButtons(this._canvas)
		optionElement.appendChild(colorPickButtons.element)
	}

	private optionFonts() {
		const option = this.addOption("Шрифт")
		option.classList.add("fontOption")
		fonts.map((font) => {
			const button = new Button(
				font,
				//Исполняется при нажатии кнопки, меняя шрифт
				() => {
					this._canvas._selectedObjects.map((obj: ShadowText) => {
						obj.changeFont(font)
					})
					this._canvas.update()
					this.showPrice()
				},
				option
			)
			button.getElement().classList.add("fontOptionButton")
			button.getElement().style.fontFamily = font
		})
	}

	private optionPrice() {
		const option = this.addOption("Стоимость")
		const priceDiv = document.createElement("div")
		priceDiv.classList.add("priceDiv")
		priceDiv.textContent = ""
		option.appendChild(priceDiv)

		this._canvas._canvas.on("object:modified", () => {
			this.showPrice()
		})
	}

	private optionText() {
		const optionElement = this.addOption("Текст")
		const input = document.createElement("textarea")
		input.classList.add("textarea")
		input.placeholder = "Ваш текст"
		optionElement.appendChild(input)
		input.oninput = (e) => {
			const value = (e.target as HTMLTextAreaElement).value
			this._canvas._selectedObjects.map((obj: ShadowText) => {
				obj.changeText(value)
			})
			this._canvas.update()
		}
		this._canvas._canvas.on("selection:updated", () => {
			input.value = (
				this._canvas._selectedObjects[0] as ShadowText
			).getText()
		})
		this._canvas._canvas.on("selection:created", () => {
			input.value = (
				this._canvas._selectedObjects[0] as ShadowText
			).getText()
		}) //  Обновление данных текста при выделении
	}

	private showPrice() {
		const selection = this._canvas.selectAll()
		selection.ungroupOnCanvas()
		let price = 0
		let elements = 0
		let width = Number.parseFloat(
			(
				Math.round((selection.width + Number.EPSILON) * 100) / 100
			).toString()
		)
		let height = Number.parseFloat(
			(
				Math.round((selection.height + Number.EPSILON) * 100) / 100
			).toString()
		)

		selection.getObjects().map((obj) => {
			if (obj instanceof ShadowText) {
				elements += obj.getText().trim().replace(" ", "").length
			}
		})
		price =
			width * getPriceTextSize() +
			height * getPriceTextSize() +
			elements * getPriceElement()
		price = Math.floor(price)
		const priceDiv = document.querySelector(".priceDiv")
		price && (priceDiv.textContent = price?.toString() + " р.")

		const tooltipPrice = new Tooltip(
			"Примерная стоимость вывески",
			priceDiv as HTMLDivElement
		)
	}

	private toggleVisibility() {
		this._element.classList.toggle("hidden")
		this.showPrice()
	}
}
