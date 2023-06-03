import { fonts, prices } from "../../resources/constants"
import ShadowText from "../ShadowText"
import Button from "../UI/Button/Button"
import Tooltip from "../UI/Tooltip/Tooltip"
import WidgetCanvas from "../WidgetCanvas/WidgetCanvas"
import ColorPickButtons from "./ColorButtons/ColorPickButtons"
import "./objectProperties.css"

export default class ObjectProperties {
	private _element: HTMLDivElement
	private _canvas: WidgetCanvas
	constructor(mountElement: HTMLDivElement, canvas: WidgetCanvas) {
		this._element = document.createElement("div")
		this._element.classList.add("objectProperties", "hidden")
		this._canvas = canvas
		mountElement.appendChild(this._element)

		canvas._canvas.on("selection:created", () => {
			this.updateVisibility()
		})
		canvas._canvas.on("selection:cleared", () => {
			this.updateVisibility()
		})

		this.optionText()
		this.optionColors()
		this.optionFonts()
		this.optionPrice()
	}
	addOptionDiv() {
		const optionDiv = document.createElement("div")
		optionDiv.classList.add("option")
		return optionDiv
	}
	addOption(labelText: string = "") {
		const label = document.createElement("div")
		label.classList.add(labelText)
		label.classList.add("label")
		this._element.appendChild(label)
		const option = this.addOptionDiv()
		label.appendChild(option)

		return option
	}
	addRange(
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
	updateVisibility() {
		this._element.classList.toggle("hidden")

		this.updatePrice()
	}
	optionText() {
		const optionElement = this.addOption("Текст")
		const input = document.createElement("textarea")
		input.classList.add("textarea")
		input.placeholder = "Ваш текст"
		input.rows = 3
		optionElement.appendChild(input)
		input.oninput = (e) => {
			const value = (e.target as HTMLTextAreaElement).value
			this._canvas._selectedObjects.map((obj: ShadowText) => {
				obj.changeText(value)
			})
			this._canvas.update()
		}
	}
	optionColors() {
		const optionElement = this.addOption("Цвет")
		const colorPickButtons = new ColorPickButtons(this._canvas)
		optionElement.appendChild(colorPickButtons.element)
	}

	optionFonts() {
		const option = this.addOption("Шрифт")
		option.classList.add("fontOption")
		fonts.map((font) => {
			const button = new Button(
				font,
				() => {
					this._canvas._selectedObjects.map((obj: ShadowText) => {
						obj.changeFont(font)
					})
					this._canvas.update()
				},
				option
			)
			button.getElement().classList.add("fontOptionButton")
			button.getElement().style.fontFamily = font
			button.getElement().style.fontSize = "1em"
		})
	}
	changeShadow(color: string) {
		this._canvas._selectedObjects.map((obj: ShadowText) => {
			obj.changeShadow(color)
			obj.dirty = true
		})
		this._canvas.update()
	}
	optionPrice() {
		const option = this.addOption("Стоимость")
		const priceDiv = document.createElement("div")
		priceDiv.classList.add("priceDiv")
		priceDiv.textContent = ""
		option.appendChild(priceDiv)

		this._canvas._canvas.on("object:modified", () => {
			this.updatePrice()
		})

		this.optionSend(option)
	}
	optionSend(mountElement: HTMLElement) {
		this.formOrder(mountElement)
	}
	formOrder(mountElement: HTMLElement) {
		const formDiv = document.createElement("div")
		formDiv.classList.add("formOrder")

		const phone = document.createElement("input")
		phone.type = "tel"
		phone.textContent = "8"
		phone.placeholder = "80123456789"
		phone.pattern = "8[0-9]*"
		phone.minLength = 11
		phone.maxLength = 11
		phone.classList.add("phoneFormOrder")
		formDiv.appendChild(phone)
		mountElement.appendChild(formDiv)

		const orderItem = async () => {
			const data = {
				phone: (
					document.querySelector(
						".phoneFormOrder"
					) as HTMLInputElement
				).value,
				modelData: this.updatePrice(),
				image: this._canvas._canvas.toDataURL(),
			}
			try {
				const response = await fetch(
					"http://localhost:5501/api/sendJSON",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ data }),
					}
				)
				console.log(response)
				if (response.status == 200) {
					alert("Заказ успешно добавлен")
				}
			} catch (error) {
				console.error(error)
				if (error.message == "Failed to fetch") {
					alert("Сервер недоступен")
				} else {
					alert("Ошибка: " + error.message)
				}
			}
		}
		const button = new Button("Заказать", orderItem, formDiv)

		button.getElement().type = "submit"
	}
	formRequired() {
		const value = (
			document.querySelector(".phoneFormOrder") as HTMLInputElement
		).value
		if (value.trim() == "") {
			return false
		} else {
			console.log(value)
		}
	}

	updatePrice() {
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
			width * prices.price1mm +
			height * prices.price1mm +
			elements * prices.priceforElement

		const priceDiv = document.querySelector(".priceDiv")
		price && (priceDiv.textContent = price?.toString() + " р.")

		const tooltipPrice = new Tooltip(
			"Примерная стоимость вывески",
			priceDiv as HTMLDivElement
		)
		return {
			price,
			width,
			height,
			elements,
		}
	}
}
