//imports
import "../src/styles/style.css"
import { fonts } from "./resources/constants"

import Widget from "./Widget"
window.addEventListener("load", onload)

const widget = new Widget()
widget.loadFonts(fonts)

function onload() {
	widget.initialize()
}
