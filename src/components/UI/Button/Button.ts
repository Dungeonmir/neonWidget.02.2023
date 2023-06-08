import './button.css'
export default class Button {
    private _buttonDiv: HTMLButtonElement
    private _onClick: Function
    private _text: string

    get text() {
        return this._text;
      }

    constructor(text: string = "", onclick: Function, mountPlace: HTMLElement) {
 
        this._text = text
        this._onClick = onclick
        this._buttonDiv = document.createElement('button')
        this._buttonDiv.classList.add('btn')
        this._buttonDiv.textContent = text
        this._buttonDiv.addEventListener('click', ()=>{onclick()})
        mountPlace.appendChild(this._buttonDiv)
    }

    getElement(){
        return this._buttonDiv
    }

    set text(text){
        this._text = text
    }
}