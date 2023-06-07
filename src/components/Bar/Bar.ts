import "./bar.css"
import Tooltip from "../UI/Tooltip/Tooltip"
import Button from "../UI/Button/Button"
import WidgetCanvas from "../WidgetCanvas/WidgetCanvas"
import { fabric } from "fabric"
import AddTextIcon from "../../icons/text.svg"
import TrashIcon from "../../icons/trash.svg"
import CenterHorizontalIcon from "../../icons/center-horizontal.svg"
import CenterVerticalIcon from "../../icons/center-vertical.svg"
import DownloadIcon from "../../icons/download.svg"
import Downloader from "./Downloder"

export default class Bar {
	_element: HTMLDivElement
	_downloader: Downloader
	constructor(mountElement: HTMLDivElement, canvas: WidgetCanvas) {
		this._element = document.createElement("div")
		mountElement.appendChild(this._element)
		this._element.classList.add("bar")
		this._downloader = new Downloader(mountElement)

		const buttons = [
			{
				name: "Добавить текст",
				func: () => {
					canvas.addText("Текст")
				},
				icon: AddTextIcon,
			},
			{
				name: "Выравнять по горизонтали",
				func: () => {
					canvas._selectedObjects?.map((obj) => {
						canvas.alignObject(obj, true, false)
					})
				},
				icon: CenterHorizontalIcon,
			},
			{
				name: "Выравнять по вертикали",
				func: () => {
					canvas._selectedObjects?.map((obj) => {
						canvas.alignObject(obj, false, true)
					})
				},
				icon: CenterVerticalIcon,
			},
			{
				name: "Сохранить в PNG",
				func: () => {
					this._downloader.dowload(this._downloader.render(canvas))
				},
				icon: DownloadIcon,
			},
			{
				name: "Удалить элемент",
				func: () => {
					canvas.deleteLastActiveObject()
				},
				icon: TrashIcon,
			},
		]
		buttons.map((obj) => {
			const button = new Button("", obj.func, this._element)
			button.getElement().innerHTML = obj.icon
			new Tooltip(obj.name, button.getElement())
		})
	}
}
