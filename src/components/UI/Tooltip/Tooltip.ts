import './tooltip.css'
export default class Tooltip {
    private _text: string
    private _spanElement: HTMLSpanElement

    constructor(text: string, mountPlace: HTMLElement) {
 
        this._text = text
        this._spanElement = document.createElement('span')
        this._spanElement.classList.add('tooltipText')
        this._spanElement.textContent = text
        mountPlace.classList.add('tooltip')
        this.onHoverShowHigher(mountPlace)
        mountPlace.appendChild(this._spanElement)
    }

    get text() {
        return this._text;
      }
    set text(text){
        this._text = text
    }
    onHoverShowHigher(htmlEl: HTMLElement, onhoverZindex = '5', nohoverZindex = '1'){
        htmlEl.addEventListener('mouseover', ()=>{
            htmlEl.style.zIndex = onhoverZindex
        })
        htmlEl.addEventListener('mouseout', ()=>{
            htmlEl.style.zIndex = nohoverZindex
        })
    }
}