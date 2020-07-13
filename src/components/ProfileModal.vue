<template>
  <div class="relative">
    <div class="mt-4 flex items-center">
      <a @click="showUserCard = true" class="cursor-pointer"
        ><img
          :src="userPic"
          alt="User Pic"
          class="w-12 h-12 border-2 border-teal-900 rounded-full"
        />
        <h5 class="ml-1 text-xl leading-none text-teal-900 hover:text-teal-600">
          {{ userName }}
        </h5></a
      >
    </div>
    <transition name="fade">
      <div
        v-if="showUserCard"
        class="p-4 w-full md:w-1/2 absolute bg-gray-100 rounded shadow-lg top-0 left-0 z-50"
      >
        <a
          @click="showUserCard = !showUserCard"
          class="absolute right-0 top-0 cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="m-2 stroke-current h-6 w-6 text-teal-900"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line></svg
        ></a>
        <div class="flex justify-center items-center w-full">
          <img :src="userPic" alt="User Pic" />
        </div>
        <h1 class="mt-2 ml-1 text-2xl leading-none text-teal-900">
          Hi! I'm {{ userName }}
        </h1>
        <p class="mt-2 p-2 bg-gray-300 rounded-lg">{{ user.bio }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { usersCollection } from "@/firebase";

export default {
  props: ["userId", "userName", "userPic"],
  data() {
    return {
      showUserCard: false,
      user: {},
    };
  },
  methods: {
    async getUserBio(userId) {
      const user = await usersCollection.doc(userId).get();
      this.user = user.data();
    },
  },
  created() {
    this.getUserBio(this.userId);
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
