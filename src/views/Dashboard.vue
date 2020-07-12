<template>
  <section class="pb-20 w-full bg-teal-900">
    <div
      class="px-4 relative flex flex-col min-h-full w-full justify-start items-center"
    >
      <!-- post listing -->
      <div v-if="posts.length" class="w-full">
        <div
          v-for="post in posts"
          :key="post.id"
          class="mt-4 w-full flex flex-col justify-between bg-gray-100 rounded shadow overflow-hidden"
        >
          <div class="px-4 w-full">
            <h5 class="mt-4 text-xl leading-none text-gray-800">
              {{ post.userName }}
            </h5>
            <span class="text-xs leading-none text-gray-500">{{
              post.createdOn | formatDate
            }}</span>
          </div>
          <div class="px-4 ">
            <p class="mt-4 text-gray-800">{{ post.content | trimLength }}</p>
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
                <p class="ml-2 text-gray-800">
                  Comments {{ post.comments }}
                </p></a
              >

              <a
                @click="likePost(post.id, post.likes)"
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
                <p class="ml-2 text-gray-800">Likes {{ post.likes }}</p></a
              >
              <a
                v-if="isPostMine(post.userId)"
                @click="deletePost(post.id)"
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
          <CommentModal :post="post" :currentUser="currentUser"></CommentModal>
        </div>
      </div>
      <div v-else>
        <p class="mt-4 text-gray-800 text-sm">There are currently no posts</p>
      </div>
    </div>

    <!-- Make a post section -->
    <div
      class="flex flex-col justify-end items-center fixed bottom-0 bg-gray-100 max-w-screen-sm w-full"
    >
      <div class="p-2 flex w-full justify-center items-center">
        <a @click="posterToggle()" class="cursor-pointer">
          <svg
            v-if="!posterVisible"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 stroke-current text-teal-900"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 stroke-current text-teal-900"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline></svg
        ></a>
      </div>
      <div v-show="posterVisible" class="px-4 mb-4 w-full">
        <div class="">
          <form @submit.prevent>
            <textarea
              v-model.trim="post.content"
              class="form-textarea mt-1 block w-full resize-none"
              rows="3"
              placeholder="What's on your mind?"
            ></textarea>
            <button
              @click="createPost()"
              :disabled="post.content === ''"
              type="button"
              class="py-2 mt-2 w-full bg-teal-900 rounded text-teal-100 text-sm font-bold hover:bg-teal-800"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- end make a post section -->
  </section>
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
  data() {
    return {
      posterVisible: false,
      post: {
        content: "",
      },
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts", "currentUser"]),
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
  },
  methods: {
    posterToggle() {
      this.posterVisible = !this.posterVisible;
    },
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
      this.posterToggle();
    },
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

<style></style>
