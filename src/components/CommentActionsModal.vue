<template>
  <div class="">
    <div
      v-if="showActions"
      @click="showActions = false"
      class="fixed z-20 inset-0 w-screen h-screen"
    ></div>
    <div class="relative">
      <button
        type="button"
        @click="showActions = true"
        class="w-full flex justify-end items-center cursor-pointer text-sm p-4 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4 stroke-current text-gray-800"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
      <transition name="fade">
        <ul
          v-if="showActions"
          class="flex flex-col items-end absolute top-0 right-0 -mt-1 shadow rounded z-30 bg-gray-100 py-1"
        >
          <li class="w-full text-right">
            <button
              type="button"
              @click="showActions = false"
              class="w-full flex justify-end items-center cursor-pointer text-sm p-4 rounded bg-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class=" w-4 h-4 stroke-current text-gray-800"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </li>
          <li class="w-full">
            <button
              type="button"
              @click="$emit('editing', commentId), (showActions = false)"
              class="flex justify-end items-center cursor-pointer text-sm p-4 w-full rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class=" w-4 h-4 stroke-current text-gray-800"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                ></path>
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                ></path>
              </svg>
            </button>
          </li>
          <li class="w-full">
            <button
              type="button"
              @click="deleteComment(commentId)"
              class="flex justify-end items-center cursor-pointer text-sm p-4 w-full rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-current text-red-800 h-4 w-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </button>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { postsCollection } from "@/firebase";

export default {
  props: ["commentId", "post"],
  data() {
    return {
      showActions: false,
    };
  },
  methods: {
    async deleteComment(commentId) {
      this.$store.dispatch("deleteComment", { commentId });

      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) - 1,
      });
    },
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
