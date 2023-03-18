import {fabric} from "fabric";
import { colorScheme } from "../../resources/constants";
export default function ObjectOptions(){
    
    const fontForControls = '12px Arial'
    const padding = 8

    fabric.Object.prototype.objectCaching = false
    fabric.Object.prototype.controls.h = new fabric.Control({
        x: -0.5,
        cursorStyle: 'pointer',
        
        render: function(ctx, left, top, styleOverride, fabricObject) {
            ctx.font = fontForControls;
            ctx.fillStyle = colorScheme.blue;
            
            const text = sizeToString(fabricObject.getScaledWidth())
            const textWidth = ctx.measureText(text).width
            const textHeight = ctx.measureText('M').width * 1.2
            const x = (left + fabricObject.getScaledWidth()/2)- (textWidth/2)
            const y = top + fabricObject.getScaledHeight()/2+textHeight + padding
            
            ctx.fillText(text, x, y);
        },
    })

    fabric.Object.prototype.controls.w = new fabric.Control({
        y: -0.5,
        cursorStyle: 'pointer',
        
        render: function(ctx, left, top, styleOverride, fabricObject) {
            ctx.font = fontForControls;
            ctx.fillStyle = colorScheme.blue;
            
            const text = sizeToString(fabricObject.getScaledHeight())
            const textWidth = ctx.measureText(text).width
            const textHeight = ctx.measureText('M').width * 1.2
            const x = left - fabricObject.getScaledWidth()/2 - padding - textHeight/2 
            const y = top + fabricObject.getScaledHeight()/2 + textWidth/2
            
            ctx.save()
            ctx.rotate(-Math.PI/2)
            ctx.fillText(text, -y, x);
            ctx.restore()
        },
    })

    fabric.Object.prototype.setControlsVisibility({
        mb: false,
        ml: false,
        mr: false,
        mt: false,
        mtr: false
    })
    fabric.Object.prototype.cornerColor = colorScheme.blue

    function sizeToString(size: number){
       return size.toFixed(2).toString().replace('.', ',') + ' мм'
    }
}

