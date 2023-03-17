import { Point, Size } from '../../resources/types';
import {fabric} from "fabric";
import ShadowText from '../ShadowText';


export default class WidgetCanvas{
    _canvasElement: HTMLCanvasElement
    _canvas: fabric.Canvas
    _selectedObjects: fabric.Object[]
    constructor(mountElement: HTMLDivElement){
        const canvasClass = 'canvasFabric'
        this.makeCanvasDiv(mountElement, canvasClass)
        this._canvas = new fabric.Canvas(canvasClass);
        this._canvas.setBackgroundColor('#101010', ()=>{})
        this._canvas.setDimensions({height:500, width:500})
        this._canvas.on('selection:created', ()=>{this._selectedObjects=this._canvas.getActiveObjects()} )
        this._canvas.on('selection:updated', ()=>{this._selectedObjects=this._canvas.getActiveObjects()} )
        this._canvas.on('selection:cleared', ()=>{this._selectedObjects=null})
    }
    

    private makeCanvasDiv(mountElement:HTMLDivElement, canvasClass: string) {
        const canvas = document.createElement('canvas')
        mountElement.appendChild(canvas)
        canvas.id = canvasClass
        this._canvasElement = canvas
       
    }
    resize(w:number, h:number){
        this._canvas.setWidth(w)
        this._canvas.setHeight(h)
        this.update()
    }
    getSize(){
        const s:Size = {
            width:  this._canvas.width,
            height:  this._canvas.height
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
        this._canvas.add(...object)
        shouldRender  && this.update()
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
        const textElement = new ShadowText(text, 8, 'red')
        /*this._canvas.on("before:selection:cleared", ()=>{
            if(this._selectedObjects[0].constructor.prototype.type=='i-text'){
                const textEl = this._selectedObjects[0] as fabric.IText
                
            }
        } )*/
        this.moveToCenter(textElement)
        this.addToScene([ textElement])
        textElement.changeShadow('red')
       return textElement
    }
    moveToCenter(object: fabric.Object){
        object.set({
            left: this._canvas.width / 2 - object.width / 2,
            top: this._canvas.height / 2 - object.height / 2, 
        })
    }
    deleteLastActiveObject(){
        this._selectedObjects && this._canvas.remove(...this._selectedObjects)
    }
    update(){
        this._canvas.requestRenderAll()
    }
}