//imports
import '../src/styles/style.css'
import Base from "./components/Base";
import WidgetCanvas from "./components/WidgetCanvas";
import { fonts, mountLocation } from "./resources/constants";
import {preloadFonts} from './components/Preload';
import Upbar from './components/Upbar';
import Select from './components/Select';
import { IText } from 'fabric/fabric-impl';
window.addEventListener('load', onload)


preloadFonts(fonts, mountLocation)

function onload(){
    const base = new Base(mountLocation, 500, 500)
    const canvas = new WidgetCanvas(base)
    const upbar = new Upbar(mountLocation)
    const select = new Select(fonts, (ev:Event)=>{
        console.log((ev.target as HTMLInputElement).value);
        (canvas._fabricCanvas._activeObject as IText).fontFamily = (ev.target as HTMLInputElement).value
        canvas._fabricCanvas.renderAll()
    }, document.querySelector(mountLocation))
    canvas.addRect(40, 100)

    canvas.addText("text randomness", {fill: "white"})

    
}
