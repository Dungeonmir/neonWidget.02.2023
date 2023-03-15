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
                    blur: i*2,
                    nonScaling: true
                })
            })
    }
}
