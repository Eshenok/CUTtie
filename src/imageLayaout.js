export default class CuttieImage {
  constructor(canvas, bg) {
    this.canvas = canvas;
    this.bg = bg;
    this.image;
    this.scale = 1;
  }

  initImage(url, onLoad) {
    const img = new Image();
    img.src = url;
    this.image = img;
    this.image.onload = () => {
      this._onLoadImage();
      onLoad();
    }
  }

  _onLoadImage() {
    this.scale = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
    this.canvas.width = this.image.width * this.scale;
    this.canvas.height =  this.image.height * this.scale;
    this.bg.width = this.canvas.width;
    this.bg.height = this.canvas.height;
    this.bg.src = this.image.src;
  }
}