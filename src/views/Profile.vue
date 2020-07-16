<template>
  <section class="min-h-screen max-w-full flex justify-center items-start">
    <div
      class="mt-20 p-4 w-full bg-gray-100 rounded overflow-hidden flex flex-col items-start relative shadow z-10"
    >
      <img
        :src="profileUser.picUrl"
        id="profilePic"
        alt=""
        class="absolute right-0 top-0 w-full sm:w-1/2 sm:mr-4"
        style="opacity: 0.1; z-index: -1;"
      />
      <div class="p-4 flex items-center" style="z-index: 1;">
        <img
          :src="profileUser.picUrl"
          id="profilePic"
          alt=""
          class="w-12 h-12 border-2 border-teal-800 rounded-full"
        />
        <h3 class="font-semibold text-2xl ml-2 text-teal-800">
          {{ profileUser.name }}
        </h3>
        <button
          v-if="userId !== currentUser"
          @click="addFriend(userId), (pending = true)"
          class="ml-2 p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-teal-800 w-4 h-4"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </button>
        <span v-if="pending" class="ml-2 text-xs font-semibold text-teal-700"
          >(Request pending)</span
        >
      </div>

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
      <div v-if="userId === currentUser" class="w-full">
        <h5
          v-if="myFriends.length > 0"
          class="ml-4 mt-4 text-sm text-gray-800 font-semibold"
        >
          Friends:
        </h5>
        <div class="w-full flex">
          <div v-for="friend in myFriends" :key="friend.id" class="w-full">
            <FriendModal
              :userId="friend"
              :currentUser="currentUser"
            ></FriendModal>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "@/firebase";
import { usersCollection, friendRequestsCollection } from "../firebase";
import FriendModal from "@/components/FriendModal";

export default {
  components: {
    FriendModal,
  },
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
      pending: false,
      friends: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "friendRequests"]),
    currentUser: function() {
      return auth.currentUser.uid;
    },
    docId: function() {
      return `${this.currentUser}_${this.userId}`;
    },
    myFriends: function() {
      const me = this.currentUser;
      let friendArray = [];

      this.friendRequests.forEach((request) => {
        if (request.getter === me && request.status === "accepted") {
          let friend = request.sender;
          friendArray.push(friend);
          return;
        } else if (request.sender === me && request.status === "accepted") {
          let friend = request.getter;
          friendArray.push(friend);
          return;
        } else {
          return;
        }
      });
      return friendArray;
    },
  },
  methods: {
    async getProfileUser(id) {
      const user = await usersCollection.doc(id).get();
      this.profileUser = user.data();
      return;
    },
    async addFriend(id) {
      if (this.pending === true) {
        this.deleteFriendRequest();
        return;
      }
      await friendRequestsCollection.doc(this.docId).set({
        getter: id,
        sender: this.currentUser,
        status: "pending",
      });
      this.pending = true;
    },
    async checkForPending() {
      const doc = await friendRequestsCollection.doc(this.docId).get();
      if (doc.exists) {
        this.pending = true;
        return;
      }
    },
    async deleteFriendRequest() {
      // delete post in firebase
      await friendRequestsCollection.doc(this.docId).delete();
      this.pending = false;
    },
  },
  created() {
    this.getProfileUser(this.userId);
    this.checkForPending();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.getProfileUser(this.userId);
      this.checkForPending();
    },
  },
};
</script>

<style scoped></style>
