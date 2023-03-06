export default class Base {
    _width: number
    _height: number
    _divBase: HTMLDivElement
    
    constructor(mountDiv: string, w: number, h: number) {
        this._width = w
        this._height = h
        this._divBase = document.querySelector('.'+mountDiv);
    }
}