<template>
  <section class="min-h-screen max-w-full flex justify-center items-start">
    <div
      class="mt-20 p-4 w-full bg-gray-100 rounded flex flex-col items-start relative shadow"
    >
      <div class="p-4 flex items-center">
        <img
          :src="userProfile.picUrl"
          id="profilePic"
          alt="Current Profile Pic"
          class="w-12 h-12 border-2 border-teal-900 rounded-full"
        />
        <h3 class="font-semibold text-2xl ml-2 text-teal-900">
          {{ profileUser.name }}
        </h3>
      </div>

      <img
        :src="profileUser.picUrl"
        id="profilePic"
        alt="Current Profile Pic"
        class="absolute right-0 top-0 w-full sm:w-1/2 sm:mr-4"
        style="opacity: 0.1;"
      />
      <div class="mt-12 p-4">
        <div>
          <h4 class="font-semibold text-sm text-gray-800">
            Title: {{ profileUser.title }}
          </h4>
          <span class="text-sm text-gray-800 font-semibold"
            >Gender: {{ profileUser.gender }}</span
          >

          <p class="mt-4 border-l-8 border-teal-800 pl-4">
            {{ profileUser.bio }}
          </p>
        </div>
      </div>
      <button
        class="flex mt-4 p-4 font-semibold text-sm flex items-center text-teal-900 rounded hover:bg-gray-300 focus:bg-gray-300"
        :href="profileUser.website"
        target="_blank"
        rel="noopener"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4 stroke-current text-teal-800"
        >
          <path
            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
          ></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        <span class="ml-2">My Awesome Website</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "@/firebase";
import { usersCollection } from "../firebase";

export default {
  components: {},
  props: ["userId"],
  data() {
    return {
      name: "",
      bio: "",
      picUrl: "",
      gender: "",
      title: "",
      website: "",
      profileUser: {},
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    currentUser: function() {
      return auth.currentUser.uid;
    },
  },
  methods: {
    async getProfileUser(id) {
      const user = await usersCollection.doc(id).get();
      this.profileUser = user.data();
      return;
    },
  },
  created() {
    this.getProfileUser(this.userId);
  },
};
</script>
