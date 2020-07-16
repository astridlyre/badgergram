<template>
  <div
    id="app"
    class="bg-gray-300 flex flex-col items-center justify-start w-full h-full overflow-hidden"
  >
    <div class="max-w-screen-sm w-full h-full">
      <SiteNav v-if="showNav"></SiteNav>
      <transition name="fade">
        <router-view />
      </transition>
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
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>

<style>
@import url("./assets/css/app.css");
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate3d(0, 0, 5rem);
}
</style>
