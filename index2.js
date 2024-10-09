// CUTtie

const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

class Cuttie {
  constructor() {
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
    this.viewport = {x:0,y:0,w:0,h:0,isDraggable:false,ar:0,type:'square',changed:false,corners:{lu:false,ld:false,ru:false,rd:false}};
    this.state = false;
    this.image;
    this.bg;
    this.maxW;
    this.maxH;
    this.canvas;
    this.ctx;
    this.scale;
    this.canvasContainer;
  }

  _createCanvas(params,parent) {
    this.canvas = document.createElement('canvas');
    this.bg = document.createElement('img');
    this.canvasContainer = document.createElement('div');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'lightgrey';

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

  _initImage(url, params) {
    const img = new Image();
    img.src = url;
    this.image = img;
    this.image.onload = () => {
      this._onLoadImage();
      this._initViewport(params.viewport);
      this._findXY();
    }
  }

  _onLoadImage() {
    this.scale = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
    this.canvas.width = this.image.width * this.scale;
    this.canvas.height =  this.image.height * this.scale;
    this.bg.width = this.canvas.width;
    this.bg.height = this.canvas.height;
    this.bg.src = this.image.src;
  }

  _clearScene() {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  _drawViewport() {
    this.ctx.fillStyle = '#00000040';
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff20'
    this.ctx.fillRect(this.viewport.x, this.viewport.y, this.viewport.w, this.viewport.h);
  }

  _initViewport(params) {
    this.viewport = {...this.viewport, type: params.type, h: params.height, w: params.width, changed: params.isChanged};
    if (params['aspect-ratio']) {
      const ar = params['aspect-ratio'];
      this.viewport.h = this.viewport.w/ar;
      this.viewport.ar = ar;
    }
    this._drawViewport();
  }

  initCanvas(parentElem, params, url) {
    const oldCanvasDiv = document.getElementById('canvasCuttieDiv');
    if (oldCanvasDiv) {
      parentElem.removeChild(oldCanvasDiv);
    }
    this._createCanvas(params, parentElem);
    this._initImage(url,params);
  }

  getCrop(params) {
    const canvas = document.createElement('canvas');
    const sx = this.viewport.x/this.scale;
    const sy = this.viewport.y/this.scale;
    const sw = this.viewport.w/this.scale;
    const sh = this.viewport.h/this.scale;
    canvas.width = params ? params.width : sw;
    canvas.height = params ? params.height : sh;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.image, sx, sy, sw, sh,0,0,canvas.width,canvas.height);

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