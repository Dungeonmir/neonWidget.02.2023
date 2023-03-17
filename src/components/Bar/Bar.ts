import './bar.css'
import Tooltip from "../UI/Tooltip/Tooltip";
import Button from "../UI/Button/Button";
import WidgetCanvas from '../WidgetCanvas/WidgetCanvas';
import {fabric} from 'fabric';
import AddTextIcon from '../../icons/text.svg'
import TrashIcon from '../../icons/trash.svg'
export default class Bar {
    _element: HTMLDivElement
    
    constructor(mountElement: HTMLDivElement, canvas: WidgetCanvas) {
        this._element = document.createElement('div')
        mountElement.appendChild(this._element);
        this._element.classList.add('bar')
        const addTextBtn = new Button('T', ()=>{canvas.addText("Текст")}, this._element)
        const deleteElementBtn = new Button('D', ()=>{canvas.deleteLastActiveObject()}, this._element)
        new Tooltip('Добавить текст', addTextBtn.getElement())
        new Tooltip('Удалить элемент', deleteElementBtn.getElement())
        //mount other components

        addTextBtn.getElement().innerHTML = AddTextIcon
        deleteElementBtn.getElement().innerHTML = TrashIcon
    }
    
}