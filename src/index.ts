//imports
import '../src/styles/style.css'
import Base from "./components/Base";
import WidgetCanvas from "./components/WidgetCanvas";
import { mountLocation } from "./resources/constants";

window.addEventListener('load', onload)

function preloadFonts(fonts: string[]){
    fonts.map((font)=>{
        const p = document.createElement('p')
        p.innerHTML = `&ensp;`
        p.style.fontFamily = font
        p.style.position = 'absolute'
        document.querySelector("."+mountLocation).appendChild(p)
    })
}
preloadFonts(['RosaMarena', 'Arial'])

function onload(){

    
const base = new Base(mountLocation, 500, 500) 
const canvas = new WidgetCanvas(base)
canvas.resize(600, 400)
canvas.addRect(20, 50)
canvas.addRect(40, 10)

canvas.addText("text randomness");
canvas.addRect(1,1)

}
