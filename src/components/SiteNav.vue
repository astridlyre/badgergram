<template>
  <header class="w-full bg-gray-100">
    <nav class="flex justify-between items-center">
      <router-link to="/">
        <h3 class="ml-4 text-xl text-teal-600">
          Bad<span class="text-teal-900">Badger</span>
        </h3>
      </router-link>
      <div class="flex justify-end items-center mr-4">
        <router-link to="/settings"
          ><a class="px-4"
            ><span class="text-teal-900 font-semibold">{{
              userProfile.name
            }}</span></a
          ></router-link
        >
        <router-link to="/">
          <a class="px-4"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-teal-900 h-6 w-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline></svg
          ></a>
        </router-link>
        <a @click="logout()" class="pl-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-teal-900 h-6 w-6"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line></svg
        ></a>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
