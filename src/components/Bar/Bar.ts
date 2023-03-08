import './bar.css'
import Tooltip from "../UI/Tooltip/Tooltip";
import Button from "../UI/Button/Button";
import WidgetCanvas from '../WidgetCanvas';

export default class Bar {
    _element: HTMLDivElement
    
    constructor(mountElement: HTMLDivElement, canvas: WidgetCanvas) {
        this._element = document.createElement('div')
        mountElement.appendChild(this._element);
        this._element.classList.add('bar')
        let b = new Button('T', ()=>{canvas.addText("Текст", {fill: "white"})}, this._element)
        
        let tooltip = new Tooltip('Добавить текст', b.getElement())
        //mount other components
    }
    
}