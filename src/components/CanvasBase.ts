export default class CanvasBase {
    _width: number
    _height: number
    _divBase: HTMLDivElement
    
    constructor(mountPlace: string, w: number, h: number) {
        this._width = w
        this._height = h
        this._divBase = document.querySelector(mountPlace);
    }
}