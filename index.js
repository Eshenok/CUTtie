// CUTtie

const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

class Cuttie {
  constructor() {
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
    this.viewport = {x:0,y:0,w:0,h:0,isDraggable:false,ar:[],type:'square',changed:false,corners:{lu:false,ld:false,ru:false,rd:false}};
    this.state = false;
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

  _handleMove(e) {
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;
    this.XY.startX = mx;
    this.XY.startY = my;

    return {dx, dy};
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
    if (!this.viewport.isDraggable) return;

    switch (true) {
      case this.viewport.corners.lu:
        this._changeLU(e);
        break;

      case this.viewport.corners.ld:
        this._changeLD(e);
        break;
      
      case this.viewport.corners.ru:
        this._changeRU(e);
        break;

      case this.viewport.corners.rd:
        this._changeRD(e);
        break;

      case this.canvas.style.cursor === 'move':
        this._moveViewport(e);
        break;
    }

  }

  _moveViewport(e) {
    const {dx, dy} = this._handleMove(e);

    this.viewport.x = Math.min(Math.max(0, this.viewport.x + dx), this.maxW);
    this.viewport.y = Math.min(Math.max(0, this.viewport.y + dy), this.maxH);

    this._clearScene();
    this._addViewPort();
  }

  _changeLU(e) {
    const {dx, dy} = this._handleMove(e);

    this.viewport.x = Math.min(Math.max(0, this.viewport.x + dx), this.maxW);
    this.viewport.y = Math.min(Math.max(0, this.viewport.y + dy), this.maxH);

    const newW = Math.min(this.canvas.width, this.viewport.w - dx);
    const newH = Math.min(this.canvas.height, this.viewport.h - dy);

    // if (this.viewport.ar.length) {
    //   this.viewport.w = newW;
    //   this.viewport.h = newW/this.viewport.ar[0]*this.viewport.ar[1];
    // } else {
    // }
    this.viewport.w = newW;
    this.viewport.h = newH;

    this._clearScene();
    this._addViewPort();
  }

  _changeLD(e) {
    const {dx, dy} = this._handleMove(e);

    this.viewport.x = Math.min(Math.max(0, this.viewport.x + dx), this.maxW);

    this.viewport.w = Math.min(this.canvas.width, this.viewport.w - dx);
    this.viewport.h = Math.min(this.canvas.height, this.viewport.h + dy);

    this._clearScene();
    this._addViewPort();
  }

  _changeRU(e) {
    const {dx, dy} = this._handleMove(e);

    this.viewport.y = Math.min(Math.max(0, this.viewport.y + dy), this.maxH);

    this.viewport.w = Math.min(this.canvas.width, this.viewport.w + dx);
    this.viewport.h = Math.max(10, Math.min(this.canvas.height, this.viewport.h - dy));

    console.log(this.viewport);

    this._clearScene();
    this._addViewPort();
  }

  _changeRD(e) {
    const {dx, dy} = this._handleMove(e);

    const newW = Math.min(this.canvas.width, this.viewport.w + dx);
    const newH = Math.min(this.canvas.height, this.viewport.h + dy);

    this.viewport.w = newW;
    this.viewport.h = newH;
    
    this._clearScene();
    this._addViewPort();
  }

  _findXY() {
    const bb = this.canvas.getBoundingClientRect();
    this.XY.offsetX = bb.left;
    this.XY.offsetY = bb.top;
  }

  _onMouseHover(e) {
    e.preventDefault();
    e.stopPropagation();
    //lock состояния
    if (this.viewport.isDraggable) return;

    const withinViewportX = (this.viewport.x + this.XY.offsetX) <= e.clientX && e.clientX <= (this.viewport.x + this.XY.offsetX + this.viewport.w);
    const withinViewportY = (this.viewport.y + this.XY.offsetY) <= e.clientY && e.clientY <= (this.viewport.y + this.XY.offsetY + this.viewport.h);
    if (this.viewport.changed) {
      this.viewport.corners.lu =  (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +10 >= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +10 >= e.clientY);
      this.viewport.corners.rd = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -10 <= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -10 <= e.clientY);
      this.viewport.corners.ld = (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +10 >= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -10 <= e.clientY);
      this.viewport.corners.ru = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -10 <= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +10 >= e.clientY);
    }

    if (this.viewport.changed) {
      const {corners} = this.viewport;
      this.canvas.style.cursor = corners.lu || corners.rd ? 'nwse-resize' : corners.ld || corners.ru ? 'nesw-resize' : withinViewportX && withinViewportY ? 'move' : 'auto';
    } else {
      this.canvas.style.cursor = withinViewportX && withinViewportY ? 'move' : 'auto';
    }
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

  _initViewPort(params) {
    this.viewport = {...this.viewport, type: params.type, h: params.height, w: params.width, changed: params.isChanged};
    if (params['aspect-ratio']) {
      const aspectRatioArr = params['aspect-ratio'].split('/');
      this.viewport.h = this.viewport.w/aspectRatioArr[0]*aspectRatioArr[1];
      this.viewport.ar = aspectRatioArr;
    }
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
      this.canvas.width = this.image.width * this.scale;
      this.canvas.height =  this.image.height * this.scale;

      this._initViewPort(params.viewport);
      this._clearScene();
      this._addViewPort();
      this._addEventListeners();
    }
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
        'aspect-ratio': '16/9', 
      }
    },
    url
  )
});

saveBtnSelf.addEventListener('click', () => {
  const imaga = cuttie.getCrop();
  resultSelf.src = imaga;
})