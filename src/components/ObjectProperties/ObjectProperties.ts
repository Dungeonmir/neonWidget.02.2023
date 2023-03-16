import { Gradient, Group, Pattern } from "fabric/fabric-impl";
import ShadowText from "../ShadowText";
import Button from "../UI/Button/Button";
import WidgetCanvas from "../WidgetCanvas/WidgetCanvas";
import './objectProperties.css'
export default class ObjectProperties{
    private _element: HTMLDivElement;
    private _canvas: WidgetCanvas;
    constructor(mountElement:HTMLDivElement, canvas: WidgetCanvas) {
        this._element = document.createElement('div')
        this._element.classList.add('objectProperties', 'hidden')
        this._canvas = canvas
        mountElement.appendChild(this._element)

        canvas._canvas.on('selection:created', ()=>{this.updateVisibility()
        })
        canvas._canvas.on('selection:cleared', ()=>{this.updateVisibility()})

        this.optionText()
        this.optionColors()

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
    addRange(_min:string, _max:string, mountElement: HTMLDivElement){
        const range = document.createElement('input')
        range.type = 'range'
        range.min = _min
        range.max = _max
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
    
       new Button('Синий', ()=>{this.changeShadow('blue')}, optionElement)
       new Button('Красный', ()=>{this.changeShadow('red')}, optionElement)
       new Button('Желтый', ()=>{this.changeShadow('yellow')}, optionElement)
    const svg = document.createElement('div')
   svg.innerHTML = `
   <svg height="100" width="100" >
  <circle class="svgImage" cx="50" cy="50" r="40" stroke="white" stroke-width="2" fill="#101010" />
  Sorry, your browser does not support inline SVG.  
    </svg> 
   `
   optionElement.appendChild(svg)
    }
    
    changeShadow(color: string ){
        this._canvas._selectedObjects.map((obj: ShadowText)=>{
            obj.changeShadow(color)
            obj.dirty = true
        })
        this._canvas.update()
    }
}