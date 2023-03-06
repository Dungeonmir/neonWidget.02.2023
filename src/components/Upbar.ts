import Button from "./Upbar/Button";

export default class Upbar {
    _divBase: HTMLDivElement
    
    constructor(mountDiv: string) {
        this._divBase = document.querySelector('.'+mountDiv);
        let b = new Button('button here', ()=>console.log('fun'))
        
        //mount other components
    }
    
}