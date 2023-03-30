class Tooltip {
   _text
   _spanElement

  constructor(text, mountPlace) {

      this._text = text
      this._spanElement = document.createElement('span')
      this._spanElement.classList.add('tooltipText')
      this._spanElement.textContent = text
      mountPlace.classList.add('tooltip')
      this.onHoverShowHigher(mountPlace)
      mountPlace.appendChild(this._spanElement)
  }
  get text() {
      return this._text;
    }
  set text(message){
      this._text = message
      this._spanElement.textContent = this._text
  }
  onHoverShowHigher(htmlEl, onhoverZindex = '5', nohoverZindex = '1'){
      htmlEl.addEventListener('mouseover', ()=>{
          htmlEl.style.zIndex = onhoverZindex
      })
      htmlEl.addEventListener('mouseout', ()=>{
          htmlEl.style.zIndex = nohoverZindex
      })
  }
}



test('Элемент span добавляется к родительскому элементу', () => {
  const parentEl = document.createElement('div');
  const tooltip = new Tooltip('подсказка', parentEl);
  expect(parentEl.children.length).toBe(1);
  expect(parentEl.children[0].tagName).toBe('SPAN');
  expect(parentEl.children[0].textContent).toBe('подсказка');
});



test('Текст подсказки измененяется', () => {
  const parentEl = document.createElement('div');
  const tooltip = new Tooltip('tooltip text', parentEl);
  tooltip.text = 'смена';
  expect(tooltip.text).toBe('смена');
  expect(parentEl.children[0].textContent).toBe('смена');
});



test('z-index повышается до 5 при наведении курсора на элемент', () => {
  const parentEl = document.createElement('div');
  parentEl.style.zIndex = '1';
  const tooltip = new Tooltip('test text', parentEl);
  tooltip.onHoverShowHigher(parentEl, '5', '1');
  const event = new MouseEvent('mouseover');
  parentEl.dispatchEvent(event);
  expect(parentEl.style.zIndex).toBe('5');
});
