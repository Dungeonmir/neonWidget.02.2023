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
    addLabel(labelText: string, mountElement: HTMLDivElement){
        const label = document.createElement('p')
        label.textContent = labelText
        label.classList.add('label')
        mountElement.appendChild(label)
    }
    addOption(label: string = null){
        const option = document.createElement('div')
        option.classList.add('option')
        this._element.appendChild(option)
        label && this.addLabel(label, option)

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
        const suboptionsEl = document.createElement('div')
        suboptionsEl.classList.add('subOption')
        optionElement.appendChild(suboptionsEl)
        
        const input = document.createElement('input')
        input.type = 'text'
        optionElement.appendChild(input) 
        input.oninput = (e)=>{
            let value = (e.target as HTMLInputElement).value
            this._canvas._selectedObjects.map((obj: ShadowText)=>{
                obj.getObjects().map((textObj: fabric.Text)=>{
                    textObj.set({text: value})
                })
                obj.addWithUpdate()
            })
            this._canvas.update()
            
        }
    }
    optionColors(){
        
    const optionElement = this.addOption('Цвет')
    const suboptionsEl = document.createElement('div')
    suboptionsEl.classList.add('subOption')
    optionElement.appendChild(suboptionsEl)
       new Button('Синий', ()=>{this.changeShadow('blue')}, suboptionsEl)
       new Button('Красный', ()=>{this.changeShadow('red')}, suboptionsEl)
       new Button('Желтый', ()=>{this.changeShadow('yellow')}, suboptionsEl)
    }
    changeShadow(color: string ){
        this._canvas._selectedObjects.map((obj: ShadowText)=>{
            obj.changeShadow(color)
            obj.dirty = true
        })
        this._canvas.update()
    }
}