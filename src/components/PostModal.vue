<template>
  <div>
    <div class="px-4 w-full">
      <div class="mt-4 flex items-center">
        <img
          :src="userPic"
          alt="User Pic"
          class="w-12 h-12 border-2 border-teal-900 rounded-full"
        />
        <h5 class="ml-1 text-xl leading-none text-teal-900">
          {{ userName }}
        </h5>
      </div>
      <span class="text-xs leading-none text-gray-500">{{
        createdOn | formatDate
      }}</span>
    </div>
    <div v-if="postContent.length > 200" class="px-4">
      <div>
        <p v-if="!showFullPost" class="mt-4 text-gray-800">
          {{ postContent | trimLength
          }}<a
            @click="showFullPost = true"
            class="cursor-pointer text-color-gray-300 font-bold hover:text-color-gray-800"
            ><span>See more</span></a
          >
        </p>
        <p v-else class="mt-4 text-gray-800">
          {{ postContent }}
          <a
            @click="showFullPost = false"
            class="cursor-pointer text-color-gray-300 font-bold hover:text-color-gray-800"
            ><span>See less</span></a
          >
        </p>
      </div>
    </div>
    <div v-else class="px-4">
      <p class="mt-4 text-gray-800">{{ postContent }}</p>
    </div>
    <div class="px-4 flex w-full">
      <div
        class="mt-4 py-4 w-full border-t border-gray-300 flex justify-evenly font-semibold text-sm"
      >
        <a class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-gray-800 h-4 w-4"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <p class="ml-2 text-gray-800">Comments {{ postComments }}</p></a
        >

        <a
          @click="likePost(postId, postLikes)"
          class="flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-gray-800 h-4 w-4"
          >
            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            ></path>
          </svg>
          <p class="ml-2 text-gray-800">Likes {{ postLikes }}</p></a
        >
        <a
          v-if="isPostMine(userId)"
          @click="deletePost(postId)"
          class="flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-red-800 h-4 w-4"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          <p class="ml-2 text-red-800">Delete</p>
        </a>
      </div>
    </div>
    <CommentModal
      :post="post"
      :postId="postId"
      :currentUser="currentUser"
      :postComments="postComments"
    ></CommentModal>
  </div>
</template>

<script>
import moment from "moment";
import * as fb from "../firebase";
import { mapState } from "vuex";
import CommentModal from "@/components/CommentModal";

export default {
  components: {
    CommentModal,
  },
  props: [
    "post",
    "postId",
    "userName",
    "userPic",
    "createdOn",
    "postContent",
    "userId",
    "postComments",
    "postLikes",
  ],
  data() {
    return {
      // postComments: [],
      showFullPost: false,
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
    // posterPic: function() {
    //   return
    // },
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", { id });
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    isPostMine(userId) {
      if (userId == `${this.currentUser}`) {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>
