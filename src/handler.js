export default class CuttieHandler {
  constructor(canvas, vpLayer, imgLayer) {
    this.canvas = canvas;
    this.vpLayer = vpLayer;
    this.imgLayer = imgLayer;
    this.viewport = vpLayer.viewport;
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
    this.corners = this.viewport.corners;
    this.isDraggable = false;
    this.max = {w:0,h:0};
    this.comp;
  }

  _updateMax() {
    this.max = {w: this.vpLayer.getMax().maxW, h: this.vpLayer.getMax().maxH};
  }

  _draw(x,y,w,h) {
    this.vpLayer.updatePosition(x,y,w,h);
  }

  _onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this._updateMax();
    if (!e.touches) {
      this.isDraggable = true;
    }
    const {mx,my} = this._updateXY(e);
    this.comp = {
      rdrux: this.viewport.x+this.viewport.w-mx,
      rdldy: this.viewport.y+this.viewport.h-my,
      luruy: this.viewport.y-my,
      ldlux: this.viewport.x-mx,
    }
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
    const {mx,my} = this._updateXY(e);

    const newX = Math.min(Math.max(0, this.comp.ldlux + mx), this.canvas.width-this.viewport.w);
    const newY = Math.min(Math.max(0, this.comp.luruy + my), this.canvas.height-this.viewport.h);
    this._draw(newX,newY,false,false);
  }

  _handleHoverMouse(e) {
    //lock состояния
    if (this.isDraggable) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const withinViewportX = (this.viewport.x + this.XY.offsetX) <= clientX && clientX <= (this.viewport.x + this.XY.offsetX + this.viewport.w);
    const withinViewportY = (this.viewport.y + this.XY.offsetY) <= clientY && clientY <= (this.viewport.y + this.XY.offsetY + this.viewport.h);

    if (this.viewport.changed) {
      this.corners.lu = (this.viewport.x + this.XY.offsetX <= clientX && this.viewport.x + this.XY.offsetX +20 >= clientX) && (this.viewport.y + this.XY.offsetY <= clientY && this.viewport.y + this.XY.offsetY +20 >= clientY);
      this.corners.rd = (this.viewport.x + this.viewport.w + this.XY.offsetX >= clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -20 <= clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -20 <= clientY);
      this.corners.ld = (this.viewport.x + this.XY.offsetX <= clientX && this.viewport.x + this.XY.offsetX +20 >= clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -20 <= clientY);
      this.corners.ru = (this.viewport.x + this.viewport.w + this.XY.offsetX >= clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -20 <= clientX) && (this.viewport.y + this.XY.offsetY <= clientY && this.viewport.y + this.XY.offsetY +20 >= clientY);
      this.vpLayer.drawCorners();
    }

    if (this.viewport.changed) {
      this.canvas.style.cursor = this.corners.lu || this.corners.rd ? 'nwse-resize' : this.corners.ld || this.corners.ru ? 'nesw-resize' : withinViewportX && withinViewportY ? 'move' : 'auto';
    } else {
      this.canvas.style.cursor = withinViewportX && withinViewportY ? 'move' : 'auto';
    }
    if (e.touches) {
      this.isDraggable = true;
    }
  }

  _handleMove(e) {
    e.preventDefault();
    e.stopPropagation();

    this._handleHoverMouse(e);
    this.findXY();
    if (!this.isDraggable) return;
    switch (true) {
      case this.corners.rd:
        this._changeRD(e);
        break;
      case this.corners.ru:
        this._changeRU(e);
        break;
      case this.corners.ld:
        this._changeLD(e);
        break;
      case this.corners.lu:
        this._changeLU(e);
        break;
      case this.canvas.style.cursor === 'move':
        this._handleMoveViewport(e);
        break;
    }
  }

  _changeLU(e) {
    const {mx,my} = this._updateXY(e);
    let newX,newY, newW, newH;
    newX = Math.max(0, mx+this.comp.ldlux);

    if (this.viewport.ar) {
      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));
      newH = newW/this.viewport.ar;
      newY = Math.max(0, this.viewport.y+(this.viewport.h-newH));
      if (!newY) {
        newW = this.viewport.w;
        newX = this.viewport.x;
        newH = this.viewport.h+(this.viewport.y-newY);
      }
      if (!newX) {
        newW = this.viewport.w+this.viewport.x;
        newH = newW/this.viewport.ar;
      }
      if (newW === 50) {
        newX = this.viewport.x+(this.viewport.w-newW);
      }
    } else {
      newY = Math.max(0, my+this.comp.luruy);
      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));
      newH = Math.max(50, this.viewport.h+(this.viewport.y-newY));

      if (newW === 50) {
        newX = this.viewport.x+(this.viewport.w-newW);
      }
      if (newH === 50) {
        newY = this.viewport.y+(this.viewport.h-newH);
      }
    }

    this._draw(newX,newY,newW,newH);
  }

  _changeLD(e) {
    const {mx,my} = this._updateXY(e);
    let newX, newW, newH;
    newX = Math.max(0, mx+this.comp.ldlux);

    if (this.viewport.ar) {
      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));
      if (!newX) {
        newW = this.viewport.w+this.viewport.x;
      }
      if (newW === 50) {
        newX = this.viewport.x+(this.viewport.w-newW);
      }
      newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      if (newH === this.canvas.height - this.viewport.y) {
        newW = this.viewport.w;
        newX = this.viewport.x;
      }
    } else {
      newW = Math.max(50,  this.viewport.w+(this.viewport.x-newX));
      newH = Math.max(50, Math.min(this.max.h, my+this.comp.rdldy-this.viewport.y));
      if (newW === 50 || !newX) {
        newX = newX===0?newX:this.viewport.x;
        newW = this.viewport.w;
      }
    }

    this._draw(newX,false,newW,newH);
  }

  _changeRU(e) {
    const {mx,my} = this._updateXY(e);
    let newY, newW, newH;
    newW = Math.max(50, Math.min(this.max.w, mx+this.comp.rdrux-this.viewport.x));
    if (this.viewport.ar) {
      newH = Math.max(10, newW/this.viewport.ar);
      newY = Math.max(0, this.viewport.y+(this.viewport.h-newH));
      if (!newY) {
        newW = this.viewport.w+this.viewport.y*this.viewport.ar
        newH = Math.max(10, newW/this.viewport.ar);
      }
    } else {
      newY = Math.max(0, my+this.comp.luruy);
      newH = Math.max(50, this.viewport.h+(this.viewport.y-newY));
      if (newH === 50) {
        newY = newY === 0?newY:this.viewport.y
        newH = this.viewport.h
      }
    }

    this._draw(false,newY,newW,newH);
  }

  _changeRD(e) {
    const {mx,my} = this._updateXY(e);
    let newW = Math.max(50, Math.min(this.max.w, mx+this.comp.rdrux-this.viewport.x));
    let newH;
    if (this.viewport.ar) {
      newH = Math.max(10, Math.min(this.max.h, newW/this.viewport.ar));
      newW = newH*this.viewport.ar;
    } else {
      newH = Math.max(50, Math.min(this.max.h, my+this.comp.rdldy-this.viewport.y));
    }

    this._draw(false,false,newW,newH);
  }

  _updateXY(e) {
    let mx,my
    if (e.touches) {
      mx = parseInt(e.touches[0].clientX - this.XY.offsetX);
      my = parseInt(e.touches[0].clientY - this.XY.offsetY);
    } else {
      mx = parseInt(e.clientX - this.XY.offsetX);
      my = parseInt(e.clientY - this.XY.offsetY);
    }

    this.XY.startX = mx;
    this.XY.startY = my;
    return {mx,my};
  }

  findXY() {
    const bb = this.canvas.getBoundingClientRect();
    this.XY.offsetX = bb.left;
    this.XY.offsetY = bb.top;
  }

  addEventListeners() {
    this.findXY();
    this.canvas.onmousedown = this._onMouseDown.bind(this);
    this.canvas.onmouseup = this._onMouseUp.bind(this);
    this.canvas.onmousemove = this._handleMove.bind(this);
    this.canvas.onmouseleave = this._onMouseUp.bind(this);

    this.canvas.ontouchstart = this._onMouseDown.bind(this);
    this.canvas.ontouchend = this._onMouseUp.bind(this);
    this.canvas.ontouchmove = this._handleMove.bind(this);
    this.canvas.ontouchcancel = this._onMouseUp.bind(this);
  }
}