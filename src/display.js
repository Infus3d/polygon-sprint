class Display {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.scoreboard_height = 0;
        this.scoreboard_width = 0;
        this.tile_size = 32;

        this.drawMap = function(image, image_columns, image_tile_size, image_tile_spacing, map, map_columns, map_tile_size){
            for(let i = map.length-1; i >= 0; i--){
                let value = map[i] - 1;
                if(value == -1) continue;
                
                let src_x = (value % image_columns) * (image_tile_size + image_tile_spacing);
                let src_y = Math.floor(value / image_columns) * (image_tile_size + image_tile_spacing);
                
                let dest_x = (i % map_columns) * map_tile_size;
                let dest_y = Math.floor(i / map_columns) * map_tile_size;

                this.buffer.drawImage(image, src_x, src_y, image_tile_size, image_tile_size, dest_x, dest_y, map_tile_size, map_tile_size);
            }
        };

        this.drawRectangle = function (x, y, width, height, color) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(Math.round(x), Math.round(y), width, height);
        };

        this.drawScoreboard = function (color, x = 0, y = 640) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(Math.round(x), Math.round(y), this.scoreboard_width, this.scoreboard_height);
            this.buffer.strokeRect(Math.round(x), Math.round(y), this.scoreboard_width, this.scoreboard_height);
        };

        this.drawObject = function(image, src_x, src_y, src_w, src_h, dest_x, dest_y, dest_w, dest_h){
            if(src_x == -1 && src_y == -1)
                this.buffer.drawImage(image, dest_x, dest_y, dest_w, dest_h);
            else
                this.buffer.drawImage(image, src_x, src_y, src_w, src_h, dest_x, dest_y, dest_w, dest_h);
        };

        this.drawBackground = function(image){
            this.buffer.drawImage(image, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        }
    }
    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }
    clearCanvas() {
        this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    resize(width, height, scoreboard_rows, tile_size) {
        this.tile_size = tile_size;
        this.scoreboard_height = scoreboard_rows * tile_size;
        this.scoreboard_width = width;
        this.buffer.canvas.width = this.context.canvas.width = width;
        this.buffer.canvas.height = this.context.canvas.height = height + this.scoreboard_height;
    }

    getDisplayWidth() {
        return this.buffer.canvas.width;
    }

}

