/* eslint-disable no-unused-vars */ /* eslint-disable no-unused-vars */ /*
eslint-disable no-unused-vars */
<template>
  <div class="w-full mb-4">
    <div>
      <h4 class="text-teal-900 text-center font-bold">
        Draw an Awesome Picture...
      </h4>
    </div>
    <div class="w-full flex justify-center items-center relative">
      <canvas
        id="canvas"
        ref="canvas"
        width="250"
        height="250"
        class="border-2 border-teal-900"
        v-touch:start="handleMouseDown"
        v-touch:end="handleMouseUp"
        v-touch:moving="handleMouseMove"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mousemove="handleMouseMove"
        @mouseout="handleMouseUp"
        style="touch-action: none;"
      ></canvas>
      <transition name="fade">
        <div
          v-if="success"
          class="absolute inset-0 flex justify-center items-center"
        >
          <p
            class="ml-2 leading-none self-center mt-2 text-teal-600 font-semibold"
          >
            image saved! ^_^
          </p>
        </div>
      </transition>
    </div>
    <div class="w-full flex justify-center">
      <button
        @click="clearCanvas()"
        class="mt-2 w-20 w-self-end px-2 py-1 bg-red-700 text-sm text-gray-100 shadow-sm font-semibold rounded hover:bg-red-800"
      >
        Delete
      </button>
      <button
        @click="saveCanvas()"
        class="ml-2 w-20 mt-2 self-end px-2 py-1 bg-teal-900 text-sm text-gray-100 shadow-sm font-semibold rounded hover:bg-teal-800"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import * as fb from "../firebase";
import { mapState } from "vuex";

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
      success: false,
    };
  },
  computed: {
    ...mapState(["profilePic"]),
    currentMouse: function() {
      const rect = this.canvas.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top,
      };
    },
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    draw: function(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        this.ctx.clearRect(0, 0, 250, 250);

        this.ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        this.ctx.strokeStyle = "#234E52";
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.stroke();
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      this.ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
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
      //   this.ctxStore = this.ctx;
      this.ctx.clearRect(0, 0, 250, 250);
      this.ctx.beginPath();
    },
    saveCanvas() {
      const profilePicRef = fb.storageRef.child(`${this.currentUser}.png`);
      // profilePicRef.delete().then

      this.canvas.toBlob(function(blob) {
        // eslint-disable-next-line no-unused-vars
        profilePicRef.put(blob).then(function(snapshot) {
          console.log("Success!");
        });
      });

      this.success = true;

      setTimeout(() => {
        this.success = false;
      }, 2000);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
