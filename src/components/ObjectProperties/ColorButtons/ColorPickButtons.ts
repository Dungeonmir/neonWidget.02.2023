import { colors } from "../../../resources/constants";
import ShadowText from "../../ShadowText";
import Button from "../../UI/Button/Button";
import WidgetCanvas from "../../WidgetCanvas/WidgetCanvas";
import './colorPickButton.css';
export default class ColorPickButtons {
    element: HTMLDivElement
    constructor(canvas: WidgetCanvas){
        this.element = document.createElement('div')
        Object.keys(colors).map((colorKey: string, index: number)=>{
            const color = Object.values(colors)[index]
            const button = new Button('', ()=>{
                canvas?._selectedObjects?.map((obj: ShadowText)=>{
                    obj.changeShadow(color)
                    
                })
                canvas.update()
            }, this.element)
            button.getElement().classList.add('colorButton')
            let boxShadow = ``
            for (let i = 0; i <4; i++) {
                boxShadow +=`inset 0px 0px ${i*4}px ${color},`
            }
            boxShadow = boxShadow.slice(0, boxShadow.length-1)
           
            button.getElement().style.boxShadow = boxShadow

            
        })
    }
}

//new ColorButton(colors.red, ()=>{this.changeShadow('blue')}, optionElement)
    // color buttons class