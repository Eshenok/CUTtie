// CUTtie
import CuttieHandler from './handler';
import CuttieImage from './imageLayaout';
import './styles.css';
import CuttieViewport from './viewport';
const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

class Cuttie {
  constructor() {
    this.viewportLayer;
    this.imageLayer;
    this.handlerLayer;
    this.bg;
    this.canvas;
    this.ctx;
    this.canvasContainer;
  }

  _createCanvas(params,parent) {
    this.canvas = document.createElement('canvas');
    this.bg = document.createElement('img');
    this.canvasContainer = document.createElement('div');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'lightgrey';

    this.imageLayer = new CuttieImage(this.canvas, this.bg);
    this.viewportLayer = new CuttieViewport(this.canvas);
    this._appendStyles(params);
    parent.appendChild(this.canvasContainer);
  }

  _appendStyles(params) {
    this.canvasContainer.id = 'canvasCuttieDiv';
    this.canvas.id = 'canvasCuttie';
    this.bg.id = 'CuttieBg';
    this.canvas.width = params.bounds.width;
    this.canvas.height = params.bounds.height;
    this.canvasContainer.style = `width: ${params.bounds.width}; height: ${params.bounds.height}; position: relative; background: white`;
    this.canvas.style = `z-index: 2; position: absolute; background: transparent; left: 50%;top:50%;transform:translate(-50%,0)`;
    this.bg.style = `z-index: 1;position: absolute; left: 50%;top:50%;transform:translate(-50%,0)`
    this.canvasContainer.appendChild(this.bg);
    this.canvasContainer.appendChild(this.canvas);
  }

  _findXY() {
    const bb = this.canvas.getBoundingClientRect();
    this.XY.offsetX = bb.left;
    this.XY.offsetY = bb.top;
  }

  initCanvas(parentElem, params, url) {
    const oldCanvasDiv = document.getElementById('canvasCuttieDiv');
    if (oldCanvasDiv) {
      parentElem.removeChild(oldCanvasDiv);
    }
    this._createCanvas(params, parentElem);
    this.imageLayer.initImage(url, () => {
      this.viewportLayer.initViewport(params.viewport);
      this.handlerLayer = new CuttieHandler(this.canvas, this.viewportLayer);
      this.handlerLayer.findXY();
      this.handlerLayer.addEventListeners();
    });
  }

  getCrop(params) {
    const canvas = document.createElement('canvas');
    const vp = this.viewportLayer.viewport;
    const img = this.imageLayer.image;
    const sx = vp.x/this.imageLayer.scale;
    const sy = vp.y/this.imageLayer.scale;
    const sw = vp.w/this.imageLayer.scale;
    const sh = vp.h/this.imageLayer.scale;
    canvas.width = params ? params.width : sw;
    canvas.height = params ? params.height : sh;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh,0,0,canvas.width,canvas.height);

    return canvas.toDataURL('image/jpeg', 1.0);
  }
}

//=========================================//
//=========================================//
//=========================================//
//=========================================//

let cuttie;
uploadSelf.addEventListener('change', (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  cuttie = new Cuttie()
  cuttie.initCanvas(
    demoSelf, 
    {
      bounds: {
        width: 650,
        height: 365
      },
      viewport: {
        type: 'square',
        width: 200,
        height: 200,
        isChanged: true,
        'aspect-ratio': 16/9, 
      }
    },
    url
  )
});

saveBtnSelf.addEventListener('click', () => {
  const imaga = cuttie.getCrop();
  resultSelf.src = imaga;
})