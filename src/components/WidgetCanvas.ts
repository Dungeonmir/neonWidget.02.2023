import { Point, Size } from './../resources/types';
import {fabric} from "fabric";
import CanvasBase from './CanvasBase';

export default class WidgetCanvas{
    _divCanvas: HTMLCanvasElement
    _fabricCanvas: fabric.Canvas
    constructor(mountElement: HTMLDivElement){
        const canvasClass = 'canvasFabric'
        this.makeCanvasDiv(mountElement, canvasClass)
        this._fabricCanvas = new fabric.Canvas(canvasClass);
        this._fabricCanvas.setBackgroundColor('#101010', ()=>{console.log('color changed \n' + Date.now())})
        this._fabricCanvas.setDimensions({height:500, width:500})
    }

    private makeCanvasDiv(mountElement:HTMLDivElement, canvasClass: string) {
        const canvas = document.createElement('canvas')
        mountElement.appendChild(canvas)
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
    addText(text: string, options: fabric.ITextOptions = {}){
        var textComponent = new fabric.IText(text, options)
        this.addToScene([textComponent])
       return textComponent
    }
}