<template>
  <div class="p-2">
    <router-link :to="'/user/' + reqUser.id" class="inline-flex text-teal-800">
      <img
        :src="reqUser.picUrl"
        alt=""
        class="w-6 h-6 border-2 border-teal-800 rounded-full"
      />
      <span class="ml-2"
        >{{ reqUser.name }} sent a friend request.</span
      ></router-link
    >
    <div class="flex justify-end">
      <button
        @click="acceptRequest(), $emit('accept')"
        class="p-2 text-teal-800 font-semibold hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded"
      >
        Accept
      </button>
      <button
        @click="declineRequest(), $emit('decline')"
        class="p-2 text-red-700 font-semibold hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded"
      >
        Decline
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { friendRequestsCollection } from "../firebase";

export default {
  props: ["request", "currentUser"],
  data() {
    return {
      //   reqUser: [],
    };
  },
  computed: {
    ...mapState(["users", "userProfile", "friendRequests"]),
    reqUser: function() {
      const sender = this.request.sender;
      return this.users.find(function(user) {
        return user.id === sender;
      });
    },
  },
  methods: {
    async acceptRequest() {
      await friendRequestsCollection.doc(this.request.id).update({
        status: "accepted",
      });
    },
  },
  async declineRequest() {
    await friendRequestsCollection.doc(this.request.id).delete();
  },
};
</script>
