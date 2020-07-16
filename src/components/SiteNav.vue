<template>
  <header
    :class="{ navbarHidden: scrolled, navbarShown: !scrolled }"
    class="w-full bg-gray-100 flex justify-center fixed inset-x-0 top-0 shadow z-30 border-t-4 border-teal-800"
  >
    <nav class="flex w-full sm:max-w-screen-sm justify-between items-center">
      <!-- Branding -->
      <router-link to="/">
        <a class="p-4 flex items-center hover:bg-gray-200 focus:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 172 172"
            class="w-6 h-6"
          >
            <g fill="none" stroke-miterlimit="10">
              <path d="M0 172V0h172v172z" />
              <path
                d="M45.016 21.5c-4.661 0-7.874 3.254-9.575 5.879-1.7 2.624-2.645 5.29-3.191 6.719-2.54 6.55-2.352 14.99-2.184 21.5-5.753 7.705-10.939 17.07-13.773 28.554l-.672 3.024 2.016 2.015c17.657 18.435 49.215 66.684 49.215 66.684l.671 1.008 1.008.672s1.974 1.133 4.871 2.015c2.898.882 7.055 1.68 12.598 1.68 5.543 0 9.7-.798 12.598-1.68 2.897-.882 4.87-2.015 4.87-2.015l1.009-.672.671-1.008s31.558-48.249 49.215-66.684l2.016-2.015-.672-3.024c-2.792-11.296-7.957-20.576-13.605-28.218.168-6.53.399-15.223-2.184-21.836-.546-1.428-1.49-4.095-3.191-6.72-1.701-2.624-4.913-5.878-9.575-5.878-2.876 0-3.611.798-4.87 1.512-1.26.714-2.604 1.616-4.032 2.687-2.31 1.743-4.997 4.115-7.559 6.551H61.31c-2.478-2.352-5.081-4.62-7.391-6.383a38.322 38.322 0 00-4.031-2.687c-1.26-.735-1.848-1.68-4.871-1.68zm-.168 11.086c.693.42 1.448 1.029 2.52 1.848 2.393 1.805 5.29 4.45 7.894 7.054L56.942 43h.167C54.78 55.66 49.257 44.785 43 48.375c-.735.42-1.386 1.07-2.016 1.68.168-5.228.504-10.393 1.176-12.094.651-1.659 1.428-3.527 2.184-4.703.525-.819.525-.651.504-.672zm82.472 0c0 .02-.168-.105.336.672.756 1.176 1.533 3.044 2.184 4.703.672 1.722 1.113 6.887 1.344 12.094a10.446 10.446 0 00-2.184-1.68c-6.299-3.611-11.4 7.39-13.605-5.71l1.343-1.177c2.75-2.75 5.711-5.459 8.063-7.222a32.236 32.236 0 012.52-1.68zM72.73 43h26.54c-3.192 6.887-7.895 20.64-7.895 43 0 31.284 10.477 42.286 16.797 46.191-2.646 3.822-5.123 7.265-6.887 9.91l-.504-.503s-5.5-7.223-14.781-7.223c-9.28 0-14.781 7.223-14.781 7.223l-.504.504c-1.764-2.646-4.241-6.09-6.887-9.91 6.32-3.906 16.797-14.908 16.797-46.192 0-22.36-4.703-36.113-7.895-43zM37.29 63.996c6.886 6.992 12.975 15.537 16.964 25.195.84-1.89 2.687-3.191 4.871-3.191a5.385 5.385 0 015.375 5.375 5.385 5.385 0 01-5.375 5.375c-.777 0-1.512-.21-2.184-.504.084.294.252.546.336.84 4.494 13.563 5.627 24.733 3.192 30.234-9.721-13.9-22.34-31.074-32.922-42.664 2.267-7.894 5.732-14.781 9.742-20.66zm97.253 0c4.073 5.879 7.622 12.724 9.91 20.66-10.582 11.59-23.2 28.765-32.922 42.664-2.435-5.5-1.302-16.67 3.192-30.234.084-.294.252-.546.336-.84-.672.294-1.407.504-2.184.504a5.385 5.385 0 01-5.375-5.375A5.385 5.385 0 01112.875 86c2.184 0 4.031 1.302 4.871 3.191 3.99-9.616 9.952-18.224 16.797-25.195zM86 145.125c2.415 0 4.346 1.974 5.375 2.855v2.184c-1.533.21-3.254.336-5.375.336-2.12 0-3.842-.126-5.375-.336v-2.184c1.029-.881 2.96-2.855 5.375-2.855z"
                class="fill-current text-teal-800"
              />
            </g>
          </svg>
          <h3 class="ml-1 text-lg leading-none text-teal-500 hidden md:block">
            bad<span class="text-teal-800">badger</span>
          </h3>
          <h3 class="ml-1 text-lg text-teal-500 md:hidden">
            b<span class="text-teal-800">b</span>
          </h3>
        </a>
      </router-link>
      <!-- User menu -->
      <div class="flex justify-end items-center">
        <router-link to="/settings"
          ><a
            class="px-2 py-4 rounded flex items-center hover:bg-gray-200 focus:bg-gray-200"
          >
            <img
              :src="userProfile.picUrl"
              alt="User Pic"
              class="w-6 h-6 rounded-full border-2 border-teal-800"
            />
            <span
              class="ml-2 text-sm leading-none font-semibold text-teal-800"
              >{{ userProfile.name }}</span
            ></a
          ></router-link
        >
        <div
          v-if="showMessageMenu"
          @click="showMessageMenu = false"
          class="fixed h-screen w-screen inset-0 z-0"
        ></div>
        <div class="z-40 relative">
          <!-- <router-link to="/messages" class="relative z-0"> -->
          <div
            v-if="myFriendRequests.length > 0"
            class="absolute top-0 right-0 m-2 font-semibold text-teal-500"
          >
            {{ myFriendRequests.length }}
          </div>
          <a
            @click="showMessageMenu = !showMessageMenu"
            class="p-4 hover:bg-gray-200 bg-gray-100 focus:bg-gray-200 rounded flex items-center cursor-pointer"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current w-6 h-6 text-teal-800"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg
          ></a>

          <div
            v-if="showMessageMenu"
            class="absolute right-0 w-56 rounded shadow bg-gray-100"
          >
            <div
              v-for="request in myFriendRequests"
              :key="request.id"
              class="flex flex-col flex-col text-sm font-semibold right-0 "
            >
              <transition name="slide-fade">
                <FriendRequestModal
                  :request="request"
                  :currentUser="currentUser"
                  v-on:accept="accept = true"
                  v-on:decline="decline = true"
                ></FriendRequestModal>
              </transition>
            </div>
          </div>
        </div>

        <a
          @click="logout()"
          class="p-4 hover:bg-gray-200 focus:bg-gray-200 rounded flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-teal-800 h-6 w-6"
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
import { auth } from "@/firebase";
import FriendRequestModal from "@/components/FriendRequestModal";

export default {
  components: {
    FriendRequestModal,
  },
  data() {
    return {
      limitPosition: 100,
      scrolled: false,
      lastPosition: 0,
      showMessageMenu: false,
    };
  },
  computed: {
    ...mapState(["userProfile", "users", "friendRequests"]),
    currentUserPath: function() {
      return `/user/${auth.currentUser.uid}`;
    },
    currentUser: function() {
      return auth.currentUser.uid;
    },
    myFriendRequests: function() {
      const me = this.currentUser;
      return this.friendRequests.filter(function(request) {
        return request.getter === me && request.status === "pending";
      });
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    acceptFriendRequest() {
      return;
    },
    declineFriendRequest() {
      return;
    },
    handleScroll() {
      if (
        (this.lastPosition,
        window.scrollY &&
          this.limitPosition < window.scrollY &&
          !this.showMessageMenu)
      ) {
        this.scrolled = true;
      }
      if (this.lastPosition > window.scrollY) {
        this.scrolled = false;
      }
      this.lastPosition = window.scrollY;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.navbarHidden {
  transform: translateY(-100%);
  transition: all 0.2s ease-out;
}
.navbarShown {
  transform: translateY(0);
  transition: all 0.2s ease-out;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
