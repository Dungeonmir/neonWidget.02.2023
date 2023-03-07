export default class Select {
    private _options: string[]
    private _onChange: Function
    private _selectElement: HTMLSelectElement

    constructor(options: string[], onchange: Function, mountPlace: HTMLElement) {
 
        this._options = options
        this._onChange = onchange
        this._selectElement = document.createElement('select')
        this._selectElement.classList.add('select')
        
        options.map((option)=>{
            const opt = document.createElement('option')
            opt.value =option
            opt.textContent = option
            this._selectElement.appendChild(opt)
        })
        this._selectElement.addEventListener('change', (ev: Event)=>{onchange(ev)})
        mountPlace.appendChild(this._selectElement)
    }
    
}