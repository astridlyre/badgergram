/* eslint-disable no-unused-vars */ /* eslint-disable no-unused-vars */ /*
eslint-disable no-unused-vars */
<template>
  <div class="w-full mb-4">
    <div>
      <h4 class="text-teal-900 font-bold">Draw New Profile Pic</h4>
    </div>
    <canvas
      id="canvas"
      ref="canvas"
      width="250"
      height="250"
      v-touch:start="handleMouseDown"
      v-touch:end="handleMouseUp"
      v-touch:moving="handleMouseMove"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @mouseout="handleMouseUp"
    ></canvas>
    <div class="w-full flex justify-end">
      <button
        @click="clearCanvas()"
        class="mt-2 self-end px-2 py-1 bg-red-700 text-sm text-teal-100 font-semibold rounded hover:bg-red-800"
      >
        Clear
      </button>
      <button
        @click="saveCanvas()"
        class="ml-4 mt-2 self-end px-2 py-1 bg-teal-900 text-sm text-teal-100 font-semibold rounded hover:bg-teal-800"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0,
        },
        previous: {
          x: 0,
          y: 0,
        },
        down: false,
      },
      canvas: null,
      ctx: null,
    };
  },
  computed: {
    currentMouse: function() {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top,
      };
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    draw: function(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        var c = document.getElementById("canvas");

        var ctx = c.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);

        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = "#234E52";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      this.draw(event);
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, 250, 250);
      this.ctx.beginPath();
    },
    saveCanvas() {
      const link = document.createElement("a");
      link.download = `${this.outputName}.png`;
      link.href = this.$refs.canvas.toDataURL();
      link.click();
    },
  },
  mounted: function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.translate(0.5, 0.5);
    this.ctx.imageSmoothingEnabled = true;

    this.canvas.addEventListener("touchstart", this.handleMouseDown, false);
    this.canvas.addEventListener("touchend", this.handleMouseUp, false);
    this.canvas.addEventListener("touchmove", this.handleMouseMove, false);
    // this.draw();
  },
};
</script>
