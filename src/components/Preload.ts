export function preloadFonts(fonts: string[], mountLocation:string){
    fonts.map((font)=>{
        const p = document.createElement('p')
        p.innerHTML = `&ensp;`
        p.style.fontFamily = font
        p.style.position = 'absolute'
        document.querySelector(mountLocation).appendChild(p)
    })
}