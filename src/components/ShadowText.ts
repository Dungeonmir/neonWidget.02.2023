import {fabric} from "fabric"

export default class ShadowText extends fabric.Group {
    private _colorOfShadow: string
    constructor(text?: string, shadowStrength: number = 5, colorOfShadow?: string) {
        super()
        this._colorOfShadow = colorOfShadow
        for (let i = 0; i < shadowStrength; i++) {
            this.addWithUpdate( new fabric.Text(text, {fill: 'white'}))
        }
        this.changeShadow()
    }
    changeShadow(colorOfShadow = this._colorOfShadow){
            this.getObjects().map((textObj, i)=>{
                textObj.shadow = new fabric.Shadow({
                    color: colorOfShadow,
                    blur: i*3,
                    nonScaling: true,
                })
                textObj.set({dirty: true})
            })
            this.dirty = true
            
    }
    changeText(text: string = ""){
        this.getObjects().map((textObj: fabric.Text)=>{
            textObj.set({text: text})
        })
        this.addWithUpdate()
    }
    getText(){
        return (this.getObjects()[0] as fabric.Text).text
    }
    changeFont(font: string){
        this.getObjects().map((textObj: fabric.Text)=>{
            textObj.set({fontFamily: font})
        })
        this.set('dirty', true)
        this.addWithUpdate()
    }
}
