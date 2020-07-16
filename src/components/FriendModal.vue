<template>
  <div class="p-4 flex items-center">
    <div class="">
      <router-link
        :to="'/user/' + user.id"
        class="text-teal-800 flex items-center"
      >
        <img
          :src="user.picUrl"
          alt=""
          class="w-6 h-6 border-teal-800 border-2 rounded-full"
        />
        <h6 class="ml-2 font-semibold">{{ user.name }}</h6></router-link
      >
    </div>
    <div class="flex items-center ml-4">
      <button
        @click="deleteFriend(user.id)"
        class="p-1 ml-1 text-red-700 font-semibold hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="stroke-current text-red-700 w-4 h-4"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="18" y1="8" x2="23" y2="13"></line>
          <line x1="23" y1="8" x2="18" y2="13"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { friendRequestsCollection } from "../firebase";

export default {
  props: ["userId", "currentUser"],
  data() {
    return {
      deleted: false,
    };
  },
  computed: {
    ...mapState(["users", "userProfile", "friendRequests"]),
    user: function() {
      const userId = this.userId;
      return this.users.find(function(user) {
        return user.id === userId;
      });
    },
  },
  methods: {
    async deleteFriend(id) {
      const docId1 = `${id}_${this.currentUser}`;
      const docId2 = `${this.currentUser}_${id}`;
      await friendRequestsCollection.doc(docId1).delete();
      await friendRequestsCollection.doc(docId2).delete();

      return (this.deleted = true);
    },
  },
};
</script>
