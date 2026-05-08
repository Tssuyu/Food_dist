export default class Customizator {
  constructor() {
    this.btnBlock = document.createElement('div');
    this.colorPicker = document.createElement('input');
    this.clrBtn = document.createElement('div');
    this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    this.clrBtn.addEventListener('click', () => this.onClr());

    this.scale = localStorage.getItem('scale') || 1;
    this.color = localStorage.getItem('color') || '#ffffff';
  }

  onClr() {
    localStorage.clear();
    this.scale = 1;
    this.color = '#ffffff';
    this.setBgColor();
    this.onScaleChange();
  }

  setBgColor() {
    document.querySelector('body').style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }

  onScaleChange(e) {
    if (e) {
      this.scale = parseFloat(e.target.value);
    }

    const recursion = elem => {
      elem.childNodes.forEach(node => {
        if (node.nodeName === "#text" && node.textContent.trim() !== '') {
          if (!node.parentNode.getAttribute('data-fz')) {
            node.parentNode.setAttribute('data-fz', parseInt(window.getComputedStyle(node.parentNode, null).fontSize));
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px";
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px";
          }
        } else {
          recursion(node);
        }
      })
    }

    recursion(document.querySelector('body'));
    localStorage.setItem('scale', this.scale);
  }

  onColorChange(e) {
    document.querySelector('body').style.backgroundColor = e.target.value;
    localStorage.setItem('color', e.target.value);
  }

  injectStyle() {
    const style = document.createElement('style');
    style.innerHTML = 
    `
      .panel {
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: fixed;
          bottom: 10px;
          left: 10px;
          border: 1px solid rgba(0,0,0, .2);
          box-shadow: 0 0 20px rgba(0,0,0, .5);
          width: 300px;
          height: 60px;
          background-color: #fff;

      }

      .scale {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100px;
          height: 40px;
      }

      .scale_btn {
          display: block;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(0,0,0, .2);
          border-radius: 4px;
          font-size: 18px;
      }

      .color {
          width: 40px;
          height: 40px;
      }

      .clr {
          font-size: 20px;
          cursor: pointer;
      }
    `
    document.querySelector('head').appendChild(style);
  }

  render() {
    this.injectStyle();
    this.setBgColor();
    this.onScaleChange();
    let scaleInputS = document.createElement('input'),
      scaleInputM = document.createElement('input'),
      panel = document.createElement('div');

    scaleInputS.classList.add('scale_btn');
    scaleInputM.classList.add('scale_btn');
    this.btnBlock.classList.add('scale');
    this.colorPicker.classList.add('color');
    this.clrBtn.innerHTML = "&times";
    this.clrBtn.classList.add('clr');
    panel.classList.add('panel');

    scaleInputS.setAttribute('type', 'button');
    scaleInputS.setAttribute('value', '1x');
    scaleInputM.setAttribute('type', 'button');
    scaleInputM.setAttribute('value', '1.5x');
    this.colorPicker.setAttribute('type', 'color');
    this.colorPicker.setAttribute('value', '#ffffff');

    this.btnBlock.append(scaleInputS, scaleInputM);
    panel.append(this.btnBlock, this.colorPicker, this.clrBtn);
    document.querySelector('body').append(panel);
  }
}