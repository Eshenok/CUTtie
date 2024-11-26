// CUTtie
import CuttieHandler from './handler';
import CuttieImage from './imageLayaout';
import CuttieViewport from './viewport';

export default class Cuttie {
  constructor() {
    this.viewportLayer;
    this.imageLayer;
    this.handlerLayer;
    this.bg;
    this.canvas;
    this.ctx;
    this.canvasContainer;
  }

  _createCanvas(parent, params, url) {
    this.canvas = document.createElement('canvas');
    this.bg = document.createElement('img');
    this.canvasContainer = document.createElement('div');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'lightgrey';

    this._appendStyles(params, parent, url)
    this.imageLayer = new CuttieImage(this.canvas, this.bg);
    this.viewportLayer = new CuttieViewport(this.canvas);
    parent.appendChild(this.canvasContainer);
  }

  _appendStyles(params, parent, url) {
    this.canvasContainer.id = 'canvasCuttieDiv';
    this.canvas.id = 'canvasCuttie';
    this.bg.id = 'cuttieBg';
    console.log(params)
    this.canvas.width = params.bounds.width ? Number(params.bounds.width) : parent.clientWidth;
    this.canvas.height = params.bounds.height ? Number(params.bounds.height) : parent.clientHeight;
    this.canvasContainer.style = `width: ${this.canvas.width}px; height: ${this.canvas.height}px;`;
    
    const bg = params.background;
    if (bg && (bg.image || bg.parentImage)) {
      this.canvasContainer.className = 'canvasCuttieDivImageBg'
      this.canvasContainer.style.backgroundImage = `url(${bg.image ? bg.image : url})`
    }

    if (bg && bg.color) {
      this.canvasContainer.style.backgroundColor = bg.color;
    }
    this.canvasContainer.appendChild(this.canvas);
    this.canvasContainer.appendChild(this.bg);
    
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
    this._createCanvas(parentElem, params, url);
    this.imageLayer.initImage(url, () => {
      this.viewportLayer.initViewport(params.viewport);
      this.handlerLayer = new CuttieHandler(this.canvas, this.viewportLayer, this.imageLayer);
      this.handlerLayer.findXY();
      this.handlerLayer.addEventListeners();
    });
  }

  getCurrentBounds() {
    return {width: this.canvas.width, height: this.canvas.height}
  }

  getPosition() {
    return this.viewportLayer.getPosition();
  }

  updatePosition(x,y,w,h) {
    const params = [x, y, w, h].map(Number);

    for (const param of params) {
      if (isNaN(param)) { 
        console.error(`Can't update position, params only number`);
        return;
      }
    }
    params[2] = Math.min(w, this.canvas.width);
    this.viewportLayer.updatePosition(...params);
    this.viewportLayer.updateAr(this.viewportLayer.viewport.ar);
  }

  updateAr(ar) {
    this.viewportLayer.updateAr(ar);
  }

  getCrop(width, height) {
    const canvas = document.createElement('canvas');
    canvas.style.backgroundColor = 'transparent';
    const vp = this.viewportLayer.viewport;
    const img = this.imageLayer.image;
    const sx = vp.x/this.imageLayer.scale;
    const sy = vp.y/this.imageLayer.scale;
    const sw = vp.w/this.imageLayer.scale;
    const sh = vp.h/this.imageLayer.scale;
    canvas.width = width ?? sw;
    canvas.height = height ?? sh;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh,0,0,canvas.width,canvas.height);

    return canvas.toDataURL('image/jpg', 1.0);
  }
}