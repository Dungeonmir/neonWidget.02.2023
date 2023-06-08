import './tooltip.css'
export default class Tooltip {
    private _spanElement: HTMLSpanElement
    private _text: string

    get text() {
        return this._text;
      }

    constructor(text: string, mountPlace: HTMLElement) {
 
        this._text = text
        this._spanElement = document.createElement('span')
        this._spanElement.classList.add('tooltipText')
        this._spanElement.textContent = text
        mountPlace.classList.add('tooltip')
        this.onHoverShowHigher(mountPlace)
        mountPlace.appendChild(this._spanElement)
    }

    private onHoverShowHigher(htmlEl: HTMLElement, onhoverZindex = '5', nohoverZindex = '1'){
        htmlEl.addEventListener('mouseover', ()=>{
            htmlEl.style.zIndex = onhoverZindex
        })
        htmlEl.addEventListener('mouseout', ()=>{
            htmlEl.style.zIndex = nohoverZindex
        })
    }

    set text(text){
        this._text = text
    }
}