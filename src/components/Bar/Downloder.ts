import WidgetCanvas from "../WidgetCanvas/WidgetCanvas"

export default class Downloader{
    _element: HTMLAnchorElement
    constructor(mountPlace: HTMLElement){
        this._element = document.createElement('a')
        mountPlace.appendChild(this._element)
    }
    render(canvas: WidgetCanvas, renderControls = true){
        if(renderControls){
            

           return canvas._canvasElement.toDataURL("image/png") // save with controls
        }
        else{
            return canvas._canvas.toDataURL({
                format: 'png',
                multiplier: 2,
                withoutTransform: true,
            });
        }
    }
    dowload(blobImage: string){
        this._element.href = blobImage
        this._element.download = 'NEONES.RU.png'
        this._element.click()
    }
}