// time_step given in ms, fps = 1000 ms / time_step
class Runner {
    constructor(time_step, update, render) {
        this.accumulated_time = 0;
        this.time_step = time_step;
        this.time = undefined;
        this.animation_frame_request = undefined;
        this.updated = false;

        this.update = update;
        this.render = render;

        this.run = function (time_stamp) {
            this.accumulated_time += time_stamp - this.time;
            this.time = time_stamp;

            while (this.accumulated_time >= this.time_step) {
                this.accumulated_time -= this.time_step;
                this.update();
                this.updated = true;
            }

            if (this.updated == true) {
                this.updated = false;
                this.render();
            }

            this.animation_frame_request = window.requestAnimationFrame(this.wrapperRun);
        };

        this.wrapperRun = (time_stamp) => { this.run(time_stamp); };
    }
    start() {
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.wrapperRun);
    }
    stop() {
        window.cancelAnimationFrame(this.animation_frame_request);
    }
}

