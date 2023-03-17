
import { fonts } from "../../resources/constants";
import ShadowText from "../ShadowText";
import Button from "../UI/Button/Button";
import WidgetCanvas from "../WidgetCanvas/WidgetCanvas";
import ColorPickButtons from "./ColorButtons/ColorPickButtons";
import './objectProperties.css'
export default class ObjectProperties{
    private _element: HTMLDivElement;
    private _canvas: WidgetCanvas;
    constructor(mountElement:HTMLDivElement, canvas: WidgetCanvas) {
        this._element = document.createElement('div')
        this._element.classList.add('objectProperties', 'hidden')
        this._canvas = canvas
        mountElement.appendChild(this._element)

        canvas._canvas.on('selection:created', ()=>{this.updateVisibility()})
        canvas._canvas.on('selection:cleared', ()=>{this.updateVisibility()})

        this.optionText()
        this.optionColors()
        this.optionFonts()

    }
    addOptionDiv(){
        const optionDiv = document.createElement('div')
        optionDiv.classList.add('option')
        return optionDiv
    }
    addOption(labelText: string = ''){
        
       
        const label = document.createElement('div')
        label.textContent = labelText
        label.classList.add('label')
        this._element.appendChild(label)
        const option = this.addOptionDiv()
        label.appendChild(option)

        return option
    }
    addRange(min:string, max:string, step: string, mountElement: HTMLDivElement){
        const range = document.createElement('input')
        range.type = 'range'
        range.min = min
        range.max = max
        range.step = step
        mountElement.appendChild(range)
    }
    updateVisibility(){
        this._element.classList.toggle('hidden')

        //MUSOR 
        console.log(this._canvas._canvas._activeObject)
    }
    optionText(){
        const optionElement = this.addOption('Текст')
        const input = document.createElement('textarea')
        input.classList.add('textarea')
        input.placeholder = 'Ваш текст'
        input.rows = 3
        optionElement.appendChild(input) 
        input.oninput = (e)=>{
            const value = (e.target as HTMLTextAreaElement).value
            this._canvas._selectedObjects.map((obj: ShadowText)=>{
                obj.changeText(value)
            })
            this._canvas.update()
            
        }
    }
    optionColors(){
        
    const optionElement = this.addOption('Цвет')
    const colorPickButtons = new ColorPickButtons(this._canvas)
    optionElement.appendChild(colorPickButtons.element)

    }

    optionFonts(){
        const option = this.addOption('Шрифт')
        fonts.map((font)=>{
            const button = new Button(font, ()=>{
                this._canvas._selectedObjects.map((obj:ShadowText)=>{
                    obj.changeFont(font)
                })
                this._canvas.update()
            }, option)
        })
       
    }
    changeShadow(color: string ){
        this._canvas._selectedObjects.map((obj: ShadowText)=>{
            obj.changeShadow(color)
            obj.dirty = true
        })
        this._canvas.update()
    }
}