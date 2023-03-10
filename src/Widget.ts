import Bar from "./components/Bar/Bar"
import ObjectProperties from "./components/ObjectProperties/ObjectProperties"
import WidgetCanvas from "./components/WidgetCanvas/WidgetCanvas"
import { baseLocation } from "./resources/constants"
export default class Widget{
    private _element: HTMLDivElement
    private _upbar: Bar
    private _canvas: WidgetCanvas
    private _objectPropertiesBar: ObjectProperties
    constructor(){
        this._element = document.createElement('div')
        document.querySelector('body').appendChild(this._element)

       
    }
    initialize(){
        this._canvas = new WidgetCanvas(this._element)
        this._upbar = new Bar(this._element, this._canvas)
        this._objectPropertiesBar = new ObjectProperties(this._element,this._canvas)
    }

    loadFonts(fonts:string[]){
        fonts.map((font)=>{
            const p = document.createElement('p')
            p.innerHTML = `&ensp;`
            p.style.fontFamily = font
            p.style.position = 'absolute'
            this._element.appendChild(p)
        })
    }
    createSelect(){ /* Change fonts
        const select = new Select(fonts, (ev:Event)=>{
            console.log((ev.target as HTMLInputElement).value);
            (canvas._fabricCanvas._activeObject as IText).fontFamily = (ev.target as HTMLInputElement).value
            canvas._fabricCanvas.renderAll()
        }, document.querySelector(baseLocation))
    */
    }
    getCanvas(): WidgetCanvas{
        return this._canvas
    }

}