<template>
  <section
    class="p-4 min-h-screen max-w-full bg-teal-900 flex justify-center items-start"
  >
    <div
      class="mt-20 p-4 w-full bg-gray-100 rounded flex flex-col items-start relative shadow"
    >
      <div class="w-full sm:flex sm:flex">
        <img
          :src="profileUser.picUrl"
          id="profilePic"
          alt="Current Profile Pic"
          class="w-full sm:w-1/2 sm:mr-4"
        />
        <div class="sm:w-1/2">
          <h3 class="font-bold text-3xl text-teal-900">
            {{ profileUser.name }}
          </h3>
          <h4 class="text-gray-800">"{{ profileUser.title }}"</h4>
          <div class="mt-4">
            <span class="px-2 py-1 bg-gray-300 rounded-lg"
              >my gender is: {{ profileUser.gender }}</span
            >
          </div>
          <p class="mt-4 px-2 py-1 bg-gray-300 rounded-lg">
            {{ profileUser.bio }}
          </p>
          <a
            class="flex mt-4 font-semibold text-teal-900 hover:underline"
            :href="profileUser.website"
            target="_blank"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-external-link"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span class="ml-2">{{ profileUser.website }}</span></a
          >
        </div>
      </div>
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
