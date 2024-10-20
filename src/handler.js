export default class CuttieHandler {
  constructor(canvas, vpLayer, imgLayer) {
    this.canvas = canvas;
    this.vpLayer = vpLayer;
    this.imgLayer = imgLayer;
    this.viewport = vpLayer.viewport;
    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}
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

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;
    this.XY.startX = mx;
    this.XY.startY = my;

    const newX = Math.min(Math.max(0, this.viewport.x + dx), this.max.w);
    const newY = Math.min(Math.max(0, this.viewport.y + dy), this.max.h);
    this._draw(newX,newY,false,false);
  }

  _handleHoverMouse(e) {
    //lock состояния
    if (this.isDraggable) return;

    const withinViewportX = (this.viewport.x + this.XY.offsetX) <= e.clientX && e.clientX <= (this.viewport.x + this.XY.offsetX + this.viewport.w);
    const withinViewportY = (this.viewport.y + this.XY.offsetY) <= e.clientY && e.clientY <= (this.viewport.y + this.XY.offsetY + this.viewport.h);

    if (this.viewport.changed) {
      this.corners.lu =  (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +10 >= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +10 >= e.clientY);
      this.corners.rd = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -10 <= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -10 <= e.clientY);
      this.corners.ld = (this.viewport.x + this.XY.offsetX <= e.clientX && this.viewport.x + this.XY.offsetX +10 >= e.clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= e.clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -10 <= e.clientY);
      this.corners.ru = (this.viewport.x + this.viewport.w + this.XY.offsetX >= e.clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -10 <= e.clientX) && (this.viewport.y + this.XY.offsetY <= e.clientY && this.viewport.y + this.XY.offsetY +10 >= e.clientY);
    }

    if (this.viewport.changed) {
      this.canvas.style.cursor = this.corners.lu || this.corners.rd ? 'nwse-resize' : this.corners.ld || this.corners.ru ? 'nesw-resize' : withinViewportX && withinViewportY ? 'move' : 'auto';
    } else {
      this.canvas.style.cursor = withinViewportX && withinViewportY ? 'move' : 'auto';
    }
  }

  _handleMove(e) {
    e.preventDefault();
    e.stopPropagation();

    this._handleHoverMouse(e);
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
    const {dx, dy} = this._updateXY(e);
    let newX,newY, newW, newH;

    if (this.viewport.ar) {
      const changed = (dx+dy)-(dx-dy);
      newW = Math.min(this.canvas.width - this.viewport.x, this.viewport.w - changed);
      newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      newX = Math.max(0, this.viewport.x + (this.viewport.w - newW));
      newY = Math.max(0, this.viewport.y + (this.viewport.h - newH));
      if (!newX || !newY) {
        newX = 0;
        newY = 0;
        newW = this.viewport.w;
        newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      }
    } else {
      newW = Math.max(10, Math.min(this.canvas.width-this.viewport.x, this.viewport.w - dx));
      newH = Math.max(10, Math.min(this.canvas.height-this.viewport.y, this.viewport.h - dy));
      if (newW !== 10) {
        newX = Math.min(Math.max(0, this.viewport.x + dx), this.canvas.width-newW);
        if (!newX) {
          newW = this.viewport.w;
        }
      }
      if (newH !== 10) {
        newY = Math.min(Math.max(0, this.viewport.y + dy), this.canvas.height-newH);
        if (!newY) {
          newH = this.viewport.h
        }
      }
    }

    this._draw(newX,newY,newW,newH);
  }

  _changeLD(e) {
    const {dx, dy} = this._updateXY(e);
    let newX, newW, newH;

    if (this.viewport.ar) {
      const changed = (dx+dy)-(dx-dy);
      newW = Math.min(this.canvas.width - this.viewport.x, this.viewport.w + changed);
      newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      newX = Math.max(0, this.viewport.x + (this.viewport.w - newW));
      if (!newX) {
        newW = this.viewport.w;
        newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      }
    } else {
      newW = Math.max(10, Math.min(this.canvas.width-this.viewport.x, this.viewport.w - dx));
      newH = Math.max(10, Math.min(this.canvas.height-this.viewport.y, this.viewport.h + dy));
      if (newW !== 10) {
        newX = Math.min(Math.max(0, this.viewport.x + dx), this.canvas.width-newW);
        if (!newX) {
          newW = this.viewport.w;
        }
      }
    }

    this._draw(newX,false,newW,newH);
  }

  _changeRU(e) {
    const {dx, dy} = this._updateXY(e);
    let newY, newW, newH;
    if (this.viewport.ar) {
      const changed = (dx+dy)+(dx-dy);
      newW = Math.min(this.canvas.width - this.viewport.x, this.viewport.w + changed);
      newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);
      newY = Math.max(0, this.viewport.y + (this.viewport.h - newH));
      if (!newY) {
        newW = this.viewport.w
        newH = Math.max(10, Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar));
      }
    } else {
      newW = Math.max(10, Math.min(this.canvas.width-this.viewport.x, this.viewport.w + dx));
      newH = Math.max(10, Math.min(this.canvas.height-this.viewport.y, this.viewport.h - dy));
      if (newH !== 10) {
        newY = Math.min(Math.max(0, this.viewport.y + dy), this.canvas.height-newH);
        if (!newY) {
          newH = this.viewport.h;
        }
      }
    }

    this._draw(false,newY,newW,newH);
  }

  _changeRD(e) {
    const {dx,dy} = this._updateXY(e);

    let newW;
    let newH;
    if (this.viewport.ar) {
        const changed = (dx+dy)-(dx-dy);
        newW = Math.max(10, Math.min(this.canvas.width - this.viewport.x, this.viewport.w + changed));
        newH = Math.max(10, Math.min(this.canvas.height-this.viewport.y, newW/this.viewport.ar));
        newW = newH*this.viewport.ar;
    } else {
      newW = Math.max(10, Math.min(this.canvas.width-this.viewport.x, this.viewport.w + dx));
      newH = Math.max(10, Math.min(this.canvas.height-this.viewport.y, this.viewport.h + dy));
    }

    this._draw(false,false,newW,newH);
  }

  _updateXY(e) {
    const mx = parseInt(e.clientX - this.XY.offsetX);
    const my = parseInt(e.clientY - this.XY.offsetY);

    const dx = mx - this.XY.startX;
    const dy = my - this.XY.startY;

    this.XY.startX = mx;
    this.XY.startY = my;

    return {dx,dy};
  }

}