export default class CuttieHandler {
  constructor(canvas, vpLayer) {
    this.canvas = canvas;
    this.vpLayer = vpLayer;
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0, pressedPosition: {x: 0,y: 0}}
    this.isDraggable = false;
    this.max = {w:0,h:0};
  }


  findXY() {
    this.max = {w: this.vpLayer.getMax().maxW, h: this.vpLayer.getMax().maxH};
    const bb = this.canvas.getBoundingClientRect();
    this.XY.offsetX = bb.left;
    this.XY.offsetY = bb.top;
  }

  addEventListeners() {
    this.canvas.onmousedown = this._onMouseDown.bind(this);
    this.canvas.onmouseup = this._onMouseUp.bind(this);
    this.canvas.onmousemove = this._handleMoveViewport.bind(this);
    this.canvas.onmouseleave = this._onMouseUp.bind(this);
    this.canvas.onmouseenter = this.findXY.bind(this);
  }

  _draw(x,y,w,h) {
    this.vpLayer.updatePosition(x,y,w,h);
    this.vpLayer.clearScene();
    this.vpLayer.drawViewport();
  }

  _onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.findXY();
    this.isDraggable = true;
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);
    this.XY.startX = mx;
    this.XY.startY = my;
  }

  _onMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDraggable = false;
    this.XY.startX = 0;
    this.XY.startY = 0;
  }

  _handleMoveViewport(e) {
    if (!this.isDraggable) return;
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);
    // this.XY.startX = this.XY.startX ? this.XY.startX : this.XY.pressedPosition.x;
    // this.XY.startY = this.XY.startY ? this.XY.startY : this.XY.pressedPosition.y;

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;
    this.XY.startX = mx;
    this.XY.startY = my;

    const newX = Math.min(Math.max(0, this.vpLayer.viewport.x + dx), this.max.w);
    const newY = Math.min(Math.max(0, this.vpLayer.viewport.y + dy), this.max.h);
    this._draw(newX,newY);
  }
}