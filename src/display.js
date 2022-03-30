class Display {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");

        this.drawPlayer = function (rectangle, color) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(Math.round(rectangle.x), Math.round(rectangle.y), rectangle.width, rectangle.height);
        };
    }
    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }
    clearCanvas() {
        this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    resize(width, height) {
        this.buffer.canvas.width = this.context.canvas.width = width;
        this.buffer.canvas.height = this.context.canvas.height = height;
    }
}

