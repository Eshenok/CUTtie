export default class CuttieHandler {
  constructor(canvas, vpLayer) {
    this.canvas = canvas;
    this.vpLayer = vpLayer;
    this.viewport = vpLayer.viewport;
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0, pressedPosition: {x: 0,y: 0}}
    this.corners = {lu:false,ld:false,ru:false,rd:false};
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
    this.canvas.onmousemove = this._handleMove.bind(this);
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
    this.XY.startX = this.XY.startX ? this.XY.startX : this.XY.pressedPosition.x;
    this.XY.startY = this.XY.startY ? this.XY.startY : this.XY.pressedPosition.y;

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;
    this.XY.startX = mx;
    this.XY.startY = my;

    const newX = Math.min(Math.max(0, this.viewport.x + dx), this.max.w);
    const newY = Math.min(Math.max(0, this.viewport.y + dy), this.max.h);
    this._draw(newX,newY);
  }

  _handleHoverMouse(e) {
    //lock состояния
    if (this.isDraggable) return;

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

  _handleMove(e) {
    e.preventDefault();
    e.stopPropagation();

    this._handleHoverMouse(e);

    switch (true) {
      case this.canvas.style.cursor === 'move':
        this._handleMoveViewport(e);
        break;
    }
  }
}