import { colors } from "../../../resources/constants";
import ShadowText from "../../ShadowText";
import Button from "../../UI/Button/Button";
import Tooltip from "../../UI/Tooltip/Tooltip";
import WidgetCanvas from "../../WidgetCanvas/WidgetCanvas";
import './colorPickButton.css';
export default class ColorPickButtons {
    element: HTMLDivElement
    constructor(canvas: WidgetCanvas){
        this.element = document.createElement('div')
        this.element.classList.add('colorPickButtons')
        Object.keys(colors).map((colorKey: string, index: number)=>{
            const color = Object.values(colors)[index]
            const button = new Button('', ()=>{
                canvas?._selectedObjects?.map((obj: ShadowText)=>{
                    obj.changeShadow(color)
                })
                canvas.update()
                
            }, this.element)
            button.getElement().classList.add('colorButton')
            new Tooltip(colorKey, button.getElement())           
            button.getElement().style.backgroundColor = color

            
        })
    }
}