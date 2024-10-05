// CUTtie

const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

class CutCropImg {
  constructor() {
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
    this.viewport = {x:0,y:0,w:0,h:0,isDraggable:false}
    this.image;
    this.maxW;
    this.maxH;
    this.canvas;
    this.ctx;
    this.scale;
    this.canvasContainer;
  }

  _createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.id = 'canvasCuttieDiv';
    this.canvas.id = 'canvasCuttie';
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'lightgrey';
  }

  _appendStyles(params) {
    this.canvas.width = params.bounds.width;
    this.canvas.height = params.bounds.height;
    this.canvasContainer.style.width = params.bounds.width;
    this.canvasContainer.style.height = params.bounds.height;
    this.canvasContainer.style.display = 'flex';
    this.canvasContainer.style.justifyContent = 'center';
    this.canvasContainer.style.alignItems = 'center'
    this.canvasContainer.style.backgroundColor = '#fff';
    this.canvasContainer.appendChild(this.canvas);
  }

  _initImage(url) {
    const img = new Image();
    img.src = url;
    this.image = img;
  }

  _addViewPort() {
    this.ctx.fillStyle = '#ffffff20'
    this.ctx.fillRect(this.viewport.x,this.viewport.y,this.viewport.w, this.viewport.h);
    this.maxW = this.canvas.width - this.viewport.w;
    this.maxH = this.canvas.height - this.viewport.h;
  }

  _onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._findXY();
    this.viewport.isDraggable = true;
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);

    this.XY.startX = mx;
    this.XY.startY = my;
  }

  _onMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    this._onMouseHover(e);
    if (this.viewport.isDraggable && this.canvas.style.cursor === 'move') {
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;
    this.XY.startX = mx;
    this.XY.startY = my;

    this.viewport.x = Math.min(Math.max(0, this.viewport.x + dx), this.maxW);
    this.viewport.y = Math.min(Math.max(0, this.viewport.y + dy), this.maxH);

    this._clearScene();
    this._addViewPort();
    }

  }

  _findXY(e) {
    const bb = this.canvas.getBoundingClientRect();
    this.XY.offsetX = bb.left;
    this.XY.offsetY = bb.top;
  }

  _onMouseHover(e) {
    e.preventDefault();
    e.stopPropagation();

    const withinViewportX = (this.viewport.x + this.XY.offsetX) <= e.clientX && e.clientX <= (this.viewport.x + this.XY.offsetX + this.viewport.w);
    const withinViewportY = (this.viewport.y + this.XY.offsetY) <= e.clientY && e.clientY <= (this.viewport.y + this.XY.offsetY + this.viewport.h);
    const cornerViewportLU = (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +5 >= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +5 >= e.clientY);
    const cornerViewportRD = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -5 <= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -5 <= e.clientY);
    const cornerViewportLD = (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +5 >= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -5 <= e.clientY);
    const cornerViewportRU = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -5 <= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +5 >= e.clientY);
    
    this.canvas.style.cursor = withinViewportX && withinViewportY ? 'move' : 'auto';
  }

  _onMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.viewport.isDraggable = false;
  }

  _clearScene() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.drawImage(this.image, 0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = '#00000040';
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
  }

  _addEventListeners() {
    this.canvas.onmousedown = this._onMouseDown.bind(this);
    this.canvas.onmouseup = this._onMouseUp.bind(this);
    this.canvas.onmousemove = this._onMouseMove.bind(this);
    this.canvas.onmouseleave = this._onMouseUp.bind(this);
    this.canvas.onmouseenter = this._findXY.bind(this);
  }

  initCanvas(parentElem, params, url) {
    const oldCanvasDiv = document.getElementById('canvasCuttieDiv');
    if (oldCanvasDiv) {
      parentElem.removeChild(oldCanvasDiv);
    }

    this._createCanvas();
    this._appendStyles(params);
    parentElem.appendChild(this.canvasContainer);

    this._initImage(url);
    this.image.onload = () => {
      this.scale = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
      const drawWidth = this.image.width * this.scale;
      const drawHeight =  this.image.height * this.scale;
      this.canvas.width = drawWidth;
      this.canvas.height = drawHeight;

      this.viewport.h = params.viewport.height;
      this.viewport.w = params.viewport.width;
      this._clearScene();
      this._addViewPort();
      this._addEventListeners();
    }
  }

  getCrop(width, height) {
    const canvas = document.createElement('canvas');
    const sx = this.viewport.x/this.scale;
    const sy = this.viewport.y/this.scale;
    const sw = this.viewport.w/this.scale;
    const sh = this.viewport.h/this.scale
    canvas.width = width ? width : sw;
    canvas.height = height ? height : sh;
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
  cuttie = new CutCropImg()
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
        height: 112.5,
      }
    },
    url
  )
});

saveBtnSelf.addEventListener('click', () => {
  const imaga = cuttie.getCrop(1920,1080);
  resultSelf.src = imaga;
})