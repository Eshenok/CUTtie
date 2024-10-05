alert(`Тест КРОПЕРОВ для обрезки изображения. 
Для продолжения нажмите "ок"`);

//TINYCROP

const resultTiny = document.getElementById('resultTiny');
const saveBtnTiny = document.getElementById('saveTiny');
const saveBtnTinyPC = document.getElementById('saveTinyPC');
const uploadTiny = document.getElementById('uploadTiny');

let crop;
let reg;

uploadTiny.addEventListener('change', (e) => {
var image = URL.createObjectURL(e.target.files[0]);
const img = document.createElement('img');
img.src = image;

  crop = tinycrop.create({
    parent: '#demoTiny',
    image: image,
    bounds: {
      width: 650,
      height: 365
    },
    backgroundColors: ['#fff', '#f3f3f3'],
    selection: {
      color: 'grey',
      activeColor: 'black',
      aspectRatio: 16 / 9,
      minWidth: 0,
      minHeight: 0,
      width: 300,
      height: 300,
      x: 0,
      y: 0
    },
    onInit: () => { reg={x:0,y:0,width:img.width,height:img.height} }
  });

  crop.on('end', function(region) {
    reg = region;
  });

  saveBtnTiny.addEventListener('click', () => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, reg.x, reg.y, reg.width, reg.height);
    const izob = canvas.toDataURL();
    resultTiny.src = izob;
  })

  saveBtnTinyPC.addEventListener('click', () => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, reg.x, reg.y, reg.width, reg.height);
    const izob = canvas.toDataURL();

    const a = document.createElement('a');
    a.href = izob;
    a.download = 'tinycrop.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
})

// CutCropImg

const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

// function createCanvas (parentElem, params, url, viewPortParams) {
//   const oldCanvasDiv = document.getElementById('canvasCutCropImgDiv');
//   if (oldCanvasDiv) {
//     parentElem.removeChild(oldCanvasDiv);
//   }

//   const canvasDiv = document.createElement('div');
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   _appendStyles();
//   parentElem.appendChild(canvasDiv);

//   const img = new Image();
//   img.src = url;
//   img.onload = () => {
//     const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
//     const drawWidth = img.width * scaleFactor;
//     const drawHeight =  img.height * scaleFactor;
//     canvas.width = drawWidth;
//     canvas.height = drawHeight;
//     ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
//     _addViewPort();
//   };
  
// }

class CutCropImg {
  constructor() {
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
    this.viewport = {x:0,y:0,w:0,h:0,isDraggable:false}
    this.image;
    this.maxW;
    this.maxH;
    this.canvas;
    this.ctx;
    this.canvasContainer;
  }

  _createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.id = 'canvasCutCropImgDiv';
    this.canvas.id = 'canvasCutCropImg';
    this.ctx = this.canvas.getContext('2d');
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
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(this.viewport.x,this.viewport.y,this.viewport.w, this.viewport.h);
    this.maxW = this.canvas.width - this.viewport.w;
    this.maxH = this.canvas.height - this.viewport.h
  }

  _onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
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
    this.ctx.strokeRect(this.viewport.x,this.viewport.y, this.viewport.w, this.viewport.h);
    }

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
  }

  _addEventListeners() {
    this.canvas.onmousedown = this._onMouseDown.bind(this);
    this.canvas.onmouseup = this._onMouseUp.bind(this);
    this.canvas.onmousemove = this._onMouseMove.bind(this);
    this.canvas.onmouseleave = this._onMouseUp.bind(this);
  }

  initCanvas(parentElem, params, url) {
    const oldCanvasDiv = document.getElementById('canvasCutCropImgDiv');
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

      this.ctx.drawImage(this.image, 0, 0, drawWidth, drawHeight);
      this.viewport.h = params.viewport.height;
      this.viewport.w = params.viewport.width;
      this._addViewPort();
      this._addEventListeners();
      const bb = this.canvas.getBoundingClientRect();
      this.XY.offsetX = bb.left;
      this.XY.offsetY = bb.top;
    }
  }
}



//=========================================//
//=========================================//
//=========================================//
//=========================================//



let cropper;
uploadSelf.addEventListener('change', (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  cropper = new CutCropImg()
  cropper.initCanvas(
    demoSelf, 
    {
      bounds: {
        width: 650,
        height: 365
      },
      viewport: {
        type: 'square',
        width: 150,
        height: 100,
      }
    },
    url
  )
});