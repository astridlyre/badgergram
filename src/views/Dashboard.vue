<template>
  <section class="w-full min-h-full bg-gray-300 relative">
    <div
      class="px-4 relative flex flex-col h-screen min-h-full w-full justify-start items-center"
    >
      <!-- Comment Modal -->
      <transition name="fade">
        <CommentModal
          v-if="showCommentModal"
          :post="selectedPost"
          @close="toggleCommentModal()"
        ></CommentModal>
      </transition>
      <!-- end comment modal -->

      <!-- Full Post Expand -->
      <transition name="fade">
        <div
          v-if="showPostModal"
          class="fixed inset-0 flex transition-all justify-center items-center bg-gray-900 bg-opacity-75"
        >
          <div class="w-11/12 p-4 bg-gray-100">
            <div class="w-full p-2 flex justify-between">
              <div class="">
                <h5 class="text-xl leading-none font-thin">
                  {{ fullPost.userName }}
                </h5>
                <span class="text-xs leading-none text-gray-500">{{
                  fullPost.createdOn | formatDate
                }}</span>
              </div>
              <a @click="closePostModal()" class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="-mr-2 -mt-2 stroke-current h-6 w-6 text-gray-900"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </a>
            </div>
            <div class="px-2 pb-2">
              <p class="mt-2 pb-4">{{ fullPost.content }}</p>
              <div class="pt-2 flex justify-evenly border-t border-gray-300">
                <a class="flex items-center"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="stroke-current text-gray-900 h-4 w-4"
                  >
                    <path
                      d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                    ></path>
                  </svg>
                  <p class="ml-2">Comments {{ fullPost.comments }}</p></a
                >

                <a class="flex items-center"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="stroke-current text-gray-900 h-4 w-4"
                  >
                    <path
                      d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                    ></path>
                  </svg>
                  <p class="ml-2">Likes {{ fullPost.likes }}</p></a
                >
              </div>
            </div>
            <div
              v-show="postComments.length"
              class="ml-2 pt-2 w-full border-t border-gray-300"
            >
              <div
                v-for="comment in postComments"
                :key="comment.id"
                class="comment"
              >
                <div class="flex items-center">
                  <p class="font-semibold">
                    {{ comment.userName }}
                  </p>
                  <p class="ml-2 px-2 bg-gray-300 rounded-lg">
                    {{ comment.content }}
                  </p>
                </div>
                <span
                  class="block text-xs text-right leading-none text-gray-500"
                  >{{ comment.createdOn | formatDate }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- end full post modal -->

      <!-- post listing -->
      <div v-if="posts.length" class="w-full">
        <div
          v-for="post in posts"
          :key="post.id"
          class="mt-4 w-full flex flex-col justify-between bg-gray-100 rounded shadow overflow-hidden"
        >
          <div class="px-4">
            <h5 class="mt-4 text-xl leading-none font-thin">
              {{ post.userName }}
            </h5>
            <span class="text-xs leading-none text-gray-500">{{
              post.createdOn | formatDate
            }}</span>
          </div>
          <div class="px-4 ">
            <p class="mt-4">{{ post.content | trimLength }}</p>
          </div>
          <div class="flex w-full justify-center">
            <div
              class="mt-4 py-2 w-11/12 border-t border-gray-300 flex justify-between font-semibold text-sm"
            >
              <a @click="toggleCommentModal(post)" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current text-gray-900 h-4 w-4"
                >
                  <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                  ></path>
                </svg>
                <p class="ml-2">Comments {{ post.comments }}</p></a
              >

              <a
                @click="likePost(post.id, post.likes)"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current text-gray-900 h-4 w-4"
                >
                  <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                  ></path>
                </svg>
                <p class="ml-2">Likes {{ post.likes }}</p></a
              >
              <a @click="viewPost(post)" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current text-gray-900 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
                <p class="ml-2">More</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mt-4 text-gray-900 text-sm">There are currently no posts</p>
      </div>
    </div>

    <!-- Make a post section -->
    <div
      class="flex flex-col justify-end items-center fixed inset-x-0 bottom-0 bg-gray-900 w-full"
    >
      <div class="p-2 flex w-full justify-center items-center">
        <a @click="posterToggle()">
          <svg
            v-if="!posterVisible"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 stroke-current text-orange-600"
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
            class="h-6 w-6 stroke-current text-orange-600"
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
              class="py-2 mt-2 w-full bg-orange-600 rounded-sm text-gray-900 text-sm font-bold"
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
import { mapState } from "vuex";
import CommentModal from "@/components/CommentModal";
import { commentsCollection } from "@/firebase";

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
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
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
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.slectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();

      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });

      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
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
