export default class Button {
    private _text: string
    private _onClick: Function
    private _buttonDiv: HTMLButtonElement

    constructor(text: string, onclick: Function) {
 
        this._text = text
        this._onClick = onclick
        this._buttonDiv = document.createElement('button')
        this._buttonDiv.classList.add('btn')
        this._buttonDiv.textContent = text
        this._buttonDiv.addEventListener('click', onclick())
    }

    get text() {
        return this._text;
      }
    set text(text){
        this._text = text
    }
    
}