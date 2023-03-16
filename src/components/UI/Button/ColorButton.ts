import Button from "./Button";
export default class ColorButton extends Button{
    constructor(color: string, onclick: Function, mountPlace: HTMLElement){
        super('',onclick, mountPlace)
        this.getElement().classList.add(color, 'shadow')
    }
}