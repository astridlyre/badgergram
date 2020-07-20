<template>
  <aside
    class="mt-16 mr-1 sm:mr-2 bg-gray-100 flex justify-center fixed top-0 right-0 shadow-lg z-30 border-2 border-teal-800 rounded-full"
  >
    <button
      type="button"
      class="flex w-full justify-between items-center cursor-pointer p-2"
      @click="showFriendsList = !showFriendsList"
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
        class="feather feather-message-circle"
      >
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        ></path>
      </svg>
    </button>
    <div
      v-if="showFriendsList"
      class="absolute right-0 top:0 mt-16 bg-gray-100 p-4 rounded shadow-lg w-64"
    >
      <ul v-for="friend in myFriends" :key="friend.id" class="w-full">
        <li class="w-full flex">
          <FriendModal
            :userId="friend"
            :currentUser="currentUser"
            :showActions="false"
            :linkToProfile="false"
            v-on:newMessage="newMessage"
            class="hover:bg-gray-200 w-full focus:bg-gray-200 rounded"
          ></FriendModal>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { auth, messagesCollection } from "@/firebase";
import FriendModal from "@/components/FriendModal";

export default {
  components: {
    FriendModal,
  },
  data() {
    return {
      showFriendsList: false,
    };
  },
  computed: {
    ...mapState(["userProfile", "users", "messages", "friendRequests"]),
    currentUserPath: function() {
      return `/user/${auth.currentUser.uid}`;
    },
    currentUser: function() {
      return auth.currentUser.uid;
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
    async newMessage(targetId) {
      const msgId = `${this.currentUser}_${targetId}`;
      const altId = `${targetId}_${this.currentUser}`;

      const msg = await messagesCollection.doc(msgId).get();
      if (msg.exists) {
        return;
      }
      const msg2 = await messagesCollection.doc(altId).get();
      if (msg2.exists) {
        return;
      }

      // create post in firebase
      await messagesCollection.doc(msgId).set({
        createdOn: new Date(),
        targetId: targetId,
        userId: auth.currentUser.uid,
        userName: this.userProfile.name,
        userPic: this.userProfile.picUrl,
      });
    },
    async deleteMessage(message) {
      // delete post in firebase
      const docId = `${message.id}`;

      await messagesCollection.doc(docId).delete();
    },
  },
};
</script>

<style scoped>
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
