<template>
  <div
    id="app"
    class="bg-gray-200 flex flex-col items-center justify-start w-full h-full"
  >
    <div class="max-w-screen-sm w-full">
      <SiteNav v-if="showNav"></SiteNav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";

export default {
  components: {
    SiteNav,
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>

<style src="./assets/css/app.css"></style>
