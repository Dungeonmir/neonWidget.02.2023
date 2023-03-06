import { Point, Size } from './../resources/types';
import {fabric} from "fabric";
import Base from "./Base";

export default class WidgetCanvas{
    _divCanvas: HTMLCanvasElement
    _fabricCanvas: fabric.Canvas
    constructor(base:Base){
        const canvasClass = 'canvas22'
        this.makeCanvasDiv(base, canvasClass)
        this._fabricCanvas = new fabric.Canvas(canvasClass);
    }

    private makeCanvasDiv(base: Base, canvasClass: string) {
        const canvas = document.createElement('canvas')
        base._divBase.append(canvas)
        canvas.id = canvasClass
        this._divCanvas = canvas
       
    }
    resize(w:number, h:number){
        this._fabricCanvas.setWidth(w)
        this._fabricCanvas.setHeight(h)
        this._fabricCanvas.renderAll()
    }
    getSize(){
        const s:Size = {
            width:  this._fabricCanvas.width,
            height:  this._fabricCanvas.height
        }
        return s
    }
    getCenter(){
        const c:Point = {
            x: this.getSize().width / 2,
            y:  this.getSize().height / 2
        }
        return c
    }
    addToScene( object: fabric.Object[], shouldRender: boolean = true){
        this._fabricCanvas.add(...object)
        shouldRender  && this._fabricCanvas.renderAll()
    }
    addRect(w:number,h:number, color: string = 'blue'){
        var rect = new fabric.Rect({
            left: this.getCenter().x, 
            top: this.getCenter().y,
            fill: 'transparent',
            width: w,
            height: h,
            strokeWidth: 1,
            stroke: color,
            strokeUniform: true
            
          });
        this.addToScene([rect])

        return rect
    }
    addText(text: string){
        var textComponent = new fabric.IText(text, {
            fontFamily: "RosaMarena",
        })
        this.addToScene([textComponent])
       return textComponent
    }
}