<template>
  <div class="shadow relative">
    <div class="overflow-hidden">
      <div class="w-full">
        <div class="p-4 flex items-center relative w-full bg-gray-100">
          <img
            :src="userPic"
            alt=""
            class="absolute right-0 object-cover z-10"
            style="opacity: 0.05;"
          />
          <router-link :to="'/user/' + userId" class="flex items-center z-20">
            <img
              :src="userPic"
              alt=""
              class="h-12 w-12 border-2 border-teal-800 rounded-full"
            />
            <div class="flex flex-col ml-1">
              <h5
                class="relative text-lg font-semibold leading-none text-teal-900"
              >
                {{ userName }}
              </h5>
              <span
                class="absolute bottom-0 mb-4 text-xs leading-none text-gray-500"
                >{{ createdOn | formatDate }}</span
              >
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="editing">
        <div
          @click="editing = false"
          class="fixed z-20 inset-0 w-screen h-screen"
        ></div>
        <form @submit.prevent class="px-2 mt-2 z-50 relative">
          <div class="relative">
            <p class="py-2 invisible">{{ editedContent }}</p>
            <textarea
              v-model="editedContent"
              rows="3"
              class="absolute inset-0 hide-scrollbar bg-transparent block form-textarea p-2 border-0 resize-none w-full text-gray-800 rounded"
            ></textarea>
          </div>
          <div class="w-full flex justify-end">
            <button
              type="button"
              @click="updatePost(post.id, editedContent), (editing = false)"
              class="p-4 rounded hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-current text-teal-800 w-6 h-6"
              >
                <polyline points="9 11 12 14 22 4"></polyline>
                <path
                  d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <div v-if="postContent.length > 300" class="px-4">
          <div>
            <p
              v-if="!showFullPost"
              class="mt-4 text-gray-800 whitespace-pre-line"
            >
              {{ postContent | trimLength
              }}<a
                @click="showFullPost = true"
                class="cursor-pointer text-teal-800 font-semibold hover:text-teal-700"
              >
                show more</a
              >
            </p>
            <p v-else class="mt-4 text-gray-800 whitespace-pre-line">
              {{ postContent }}
              <a
                @click="showFullPost = false"
                class="cursor-pointer text-teal-800 font-semibold hover:text-teal-700"
              >
                show less</a
              >
            </p>
          </div>
        </div>
        <div v-else class="px-4">
          <p class="mt-4 text-gray-800 whitespace-pre-line">
            {{ postContent }}
          </p>
        </div>

        <div class="flex w-full">
          <div
            v-if="postReactions.loves > 0"
            class="ml-4 mt-2 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-red-700 h-3 w-3"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
            <span class="ml-1 font-semibold text-red-700 text-xs">{{
              postReactions.loves
            }}</span>
          </div>
          <div
            v-if="postReactions.likes > 0"
            class="ml-4 mt-2 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-800 h-3 w-3"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
            <span class="ml-1 font-semibold text-gray-800 text-xs">{{
              postReactions.likes
            }}</span>
          </div>
          <div
            v-if="postReactions.nopes > 0"
            class="ml-4 mt-2 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-800 h-3 w-3"
            >
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
              ></path>
            </svg>
            <span class="ml-2 font-semibold text-gray-800 text-xs">{{
              postReactions.nopes
            }}</span>
          </div>
          <div
            v-if="postComments.length > 0"
            class="ml-4 mt-2 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-800 h-3 w-3"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span class="ml-1 font-semibold text-gray-800 text-xs">{{
              postComments.length
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Actions bar -->
    <div class=" flex w-full ">
      <div
        class="mt-4 py-1 px-4 w-full border-t border-gray-300 flex justify-center"
      >
        <ReactionsModal
          :post="post"
          :postId="postId"
          :postLikes="postReactions.likes"
          :postNopes="postReactions.nopes"
          :postLoves="postReactions.loves"
        ></ReactionsModal>
        <button
          type="button"
          @click="$refs.makeAComment.focus()"
          class="flex w-1/3 justify-center items-center cursor-pointer text-sm px-2 py-4 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-gray-800 h-4 w-4 flex-shrink-0"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span class="ml-2 font-semibold text-gray-800">Comment</span>
        </button>
        <!-- Post actions -->
        <PostActionsModal
          v-if="isPostMine(userId)"
          v-bind="$props"
          v-on:editing="editing = true"
        ></PostActionsModal>
      </div>
    </div>
    <!-- Comments Section -->
    <div
      v-if="postComments.length > 3"
      class="px-4 text-gray-900 bg-gray-100 w-full"
    >
      <div v-for="comment in commentsToDisplay" :key="comment.id" class="">
        <CommentModal
          :comment="comment"
          :userId="comment.userId"
          :userPic="comment.userPic"
          :userName="comment.userName"
          :createdOn="comment.createdOn"
          :commentId="comment.id"
          :commentContent="comment.content"
          :currentUser="currentUser"
        ></CommentModal>
      </div>
      <button
        type="button"
        @click="showLessComments = !showLessComments"
        class="text-sm font-semibold text-gray-500 focus:outline-none hover:text-gray-800"
      >
        <span v-if="showLessComments">Show all comments</span>
        <span v-else>Show less comments</span>
      </button>
    </div>
    <div v-else class="px-4 text-gray-900 bg-gray-100 w-full">
      <div v-for="comment in postComments" :key="comment.id" class="">
        <CommentModal
          :comment="comment"
          :userId="comment.userId"
          :userPic="comment.userPic"
          :userName="comment.userName"
          :createdOn="comment.createdOn"
          :commentId="comment.id"
          :commentContent="comment.content"
          :currentUser="currentUser"
        ></CommentModal>
      </div>
    </div>
    <!-- Make a comment -->
    <div class="p-4 text-gray-900 bg-gray-100 w-full">
      <form @submit.prevent class="w-full flex items-center relative">
        <textarea
          ref="makeAComment"
          v-model="commentContent"
          v-on:keyup.enter="addComment()"
          placeholder="Write a comment..."
          class="pr-10 hide-scrollbar form-textarea placeholder-gray-500 resize-none w-full h-10 text-gray-800 text-sm rounded"
        ></textarea>
        <button
          @click="addComment()"
          type="button"
          class="absolute inset-y-0 right-0 rounded focus:bg-gray-200 hover:bg-gray-200 p-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-teal-800 w-6 h-6 hover:text-teal-900"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  postsCollection,
  commentsCollection,
  auth,
  incrementPlus,
} from "@/firebase";
import { mapState } from "vuex";
import CommentModal from "@/components/CommentModal";
import PostActionsModal from "@/components/PostActionsModal";
import ReactionsModal from "@/components/ReactionsModal";

export default {
  components: {
    CommentModal,
    PostActionsModal,
    ReactionsModal,
  },
  props: [
    "post",
    "postId",
    "userName",
    "userPic",
    "createdOn",
    "postContent",
    "userId",
    "postReactions",
    "currentUser",
  ],
  data() {
    return {
      // postComments: [],
      showFullPost: false,
      editing: false,
      editedContent: this.postContent,
      commentContent: "",
      showLessComments: true,
    };
  },
  computed: {
    ...mapState(["userProfile", "posts", "comments"]),
    postComments: function() {
      let currentPost = this.post.id;
      return this.comments.filter(function(comment) {
        return comment.postId === currentPost;
      });
    },
    commentsToDisplay: function() {
      if (this.showLessComments) {
        return this.postComments.slice(0, 3);
      } else {
        return this.postComments;
      }
    },
  },
  methods: {
    // likePost(id, postLikes) {
    //   this.$store.dispatch("likePost", { id, postLikes });
    // },
    isPostMine(userId) {
      if (userId == `${this.currentUser}`) {
        return true;
      } else {
        return false;
      }
    },
    updatePost(postId, postContent) {
      postsCollection.doc(postId).update({
        content: postContent,
      });
    },
    async addComment() {
      if (this.commentContent == "") {
        return;
      }
      // create a comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.commentContent,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name,
        userPic: this.$store.state.userProfile.picUrl,
      });
      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: incrementPlus,
      });

      this.commentContent = "";
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
      if (val.length < 300) {
        return val;
      }
      return `${val.substring(0, 300)}...`;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
