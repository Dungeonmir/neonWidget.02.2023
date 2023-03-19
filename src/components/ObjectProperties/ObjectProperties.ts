
import { fonts, prices } from "../../resources/constants";
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
        this.optionPrice()

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

        this.showPrice()
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
        option.classList.add('fontOption')
        fonts.map((font)=>{
            const button = new Button(font, ()=>{
                this._canvas._selectedObjects.map((obj:ShadowText)=>{
                    obj.changeFont(font)
                })
                this._canvas.update()
            }, option)
            button.getElement().classList.add('fontOptionButton')
            button.getElement().style.fontFamily = font
            button.getElement().style.fontSize = '1em'
        })
       
    }
    changeShadow(color: string ){
        this._canvas._selectedObjects.map((obj: ShadowText)=>{
            obj.changeShadow(color)
            obj.dirty = true
        })
        this._canvas.update()
    }
    optionPrice(){
        const option = this.addOption('Стоимость')
        const priceDiv = document.createElement('div')
        priceDiv.classList.add('priceDiv')
        priceDiv.textContent =""
        option.appendChild(priceDiv)
    }
    showPrice(){
        
        const wh = this._canvas?._selectedObjects?.map((obj)=>{
            let price = 0
            let elements = 0
            if(obj instanceof ShadowText){
             elements = obj.getText().trim().length
            }
            
            let width =  Number.parseFloat(obj.getScaledWidth().toFixed(2))
            let height = Number.parseFloat(obj.getScaledHeight().toFixed(2))
            return price = (width * prices.price1mm) + (height * prices.price1mm) + elements * prices.priceforElement
        })
        wh?.map(result=>{
            const priceDiv = document.querySelector('.priceDiv')
            result && (priceDiv.textContent = result?.toString() + 'р.')
        })
    }

    
}