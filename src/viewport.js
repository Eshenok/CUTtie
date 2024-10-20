export default class CuttieViewport {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx;
    this.maxW;
    this.maxH;
    this.viewport = {x:0,y:0,w:0,h:0,ar:0,type:'square',changed:false,corners:{lu:false,ld:false,ru:false,rd:false}};
  }

  clearScene() {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  drawViewport() {
    this.ctx.fillStyle = '#00000080';
    // this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    // this.ctx.fillStyle = '#ffffff20';
    // this.ctx.fillRect(this.viewport.x, this.viewport.y, this.viewport.w, this.viewport.h);

    this.ctx.fillRect(0,0,this.viewport.x,this.canvas.height);
    this.ctx.fillRect((this.viewport.x + this.viewport.w),0,this.canvas.width-(this.viewport.x + this.viewport.w),this.canvas.height);
    this.ctx.fillRect(this.viewport.x,0,this.viewport.w,this.viewport.y);
    this.ctx.fillRect(this.viewport.x,this.viewport.y+this.viewport.h,this.viewport.w,this.canvas.height-(this.viewport.y+this.viewport.h))
    this.maxW = this.canvas.width - this.viewport.w;
    this.maxH = this.canvas.height - this.viewport.h;
  }

  getMax() {
    return {maxW:this.maxW,maxH:this.maxH}
  }

  updatePosition(x,y,w,h) {
    this.viewport.x=x?x:this.viewport.x;
    this.viewport.y=y?y:this.viewport.y;
    this.viewport.h=h?h:this.viewport.h;
    this.viewport.w=w?w:this.viewport.w;
  }

  initViewport(params) {
    this.ctx = this.canvas.getContext('2d');
    this.viewport = {...this.viewport, type: params.type, h: params.height, w: params.width, changed: params.isChanged};
    if (params['aspect-ratio']) {
      const ar = params['aspect-ratio'];
      this.viewport.h = this.viewport.w/ar;
      this.viewport.ar = ar;
    }
    this.drawViewport();
  }
}