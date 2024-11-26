export default class CuttieViewport {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx;
    this.maxW;
    this.maxH;
    this.viewport = {x:0,y:0,w:0,h:0,ar:0,changed:false,corners:{lu:false,ld:false,ru:false,rd:false}};
  }

  clearScene() {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  drawViewport() {
    this.ctx.fillStyle = '#00000070';
    this.ctx.fillRect(0,0,this.viewport.x,this.canvas.height);
    this.ctx.fillRect((this.viewport.x + this.viewport.w),0,this.canvas.width-(this.viewport.x + this.viewport.w),this.canvas.height);
    this.ctx.fillRect(this.viewport.x,0,this.viewport.w,this.viewport.y);
    this.ctx.fillRect(this.viewport.x,this.viewport.y+this.viewport.h,this.viewport.w,this.canvas.height-(this.viewport.y+this.viewport.h));
    this.maxW = this.canvas.width - this.viewport.x;
    this.maxH = this.canvas.height - this.viewport.y;
    if (this.viewport.changed) {
      this.drawCorners();
    }
  }

  drawCorners() {
    const {corners} = this.viewport;
    this.ctx.fillStyle = corners.lu ? '#e89643' : '#f1f1f1';
    this.ctx.fillRect(this.viewport.x,this.viewport.y,5,5);
    this.ctx.fillStyle = corners.ld ? '#e89643' : '#f1f1f1';
    this.ctx.fillRect(this.viewport.x,this.viewport.y+this.viewport.h-5,5,5);
    this.ctx.fillStyle = corners.ru ? '#e89643' : '#f1f1f1';
    this.ctx.fillRect(this.viewport.x+this.viewport.w-5,this.viewport.y,5,5);
    this.ctx.fillStyle = corners.rd ? '#e89643' : '#f1f1f1';
    this.ctx.fillRect(this.viewport.x+this.viewport.w-5,this.viewport.y+this.viewport.h-5,5,5);
  }

  getMax() {
    return {maxW:this.maxW,maxH:this.maxH}
  }

  getPosition() {
    return {x: this.viewport.x, y: this.viewport.y, width: this.viewport.w, height: this.viewport.h}
  }

  updatePosition(x,y,w,h) {
    this.viewport.x=x||x===0?x:this.viewport.x;
    this.viewport.y=y||y===0?y:this.viewport.y;
    this.viewport.h=h?h:this.viewport.h;
    this.viewport.w=w?w:this.viewport.w;
    this.clearScene();
    this.drawViewport();
  }

  initViewport(params) {
    this.ctx = this.canvas.getContext('2d');
    this.viewport = {...this.viewport, h: params.height ? Number(params.height):100, w: params.width ? Number(params.width):100, changed: Boolean(params.isChanged)};

    if (this.canvas.width < this.viewport.w) {
      this.viewport.w = this.canvas.width;
    }

    if (this.canvas.height < this.viewport.h) {
      this.viewport.h = this.canvas.height;
    }

    if (params['aspect-ratio']) {
      const ar = Number(params['aspect-ratio']);
      this.viewport.ar = ar;
      this.viewport.h = this.viewport.w/ar;
      

      if (this.canvas.height < this.viewport.h) {
        this.viewport.h = this.canvas.height;
      }

      this.viewport.w = Math.floor(this.viewport.h*ar);
      this.viewport.h = this.viewport.w/ar;
    }

    this.drawViewport();
  }
}