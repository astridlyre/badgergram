<template>
  <div class="shadow">
    <div class="px-4 w-full">
      <div class="mt-4 flex items-center">
        <router-link :to="'/user/' + userId" class="flex items-center">
          <img
            :src="userPic"
            alt=""
            class="w-12 h-12 border-2 border-teal-900 rounded-full"
          />
          <h5 class="ml-1 text-lg font-semibold leading-none text-teal-900">
            {{ userName }}
          </h5>
        </router-link>
        <div class="flex-grow text-right">
          <span class="text-xs leading-none text-gray-500">{{
            createdOn | formatDate
          }}</span>
        </div>
      </div>
    </div>
    <div v-if="editing">
      <form @submit.prevent class="px-2 mt-4">
        <textarea
          v-model.trim="editedContent"
          rows="3"
          class="hide-scrollbar form-textarea resize-none w-full rounded"
        ></textarea>
        <div class="w-full flex justify-center">
          <button
            type="button"
            @click="editing = false"
            class="mt-1 w-20 w-self-end px-2 py-1 bg-red-700 text-sm text-gray-100 shadow-sm font-semibold rounded hover:bg-red-800"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="updatePost(post.id, editedContent), (editing = false)"
            class="ml-2 w-20 mt-1 self-end px-2 py-1 bg-teal-900 text-sm text-gray-100 shadow-sm font-semibold rounded hover:bg-teal-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <div v-else>
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
      <div class="flex w-full">
        <div v-if="postReactions.loves > 0" class="ml-4 mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-red-700 h-4 w-4"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <span class="ml-2 font-semibold text-red-700 text-sm">{{
            postReactions.loves
          }}</span>
        </div>
        <div v-if="postReactions.likes > 0" class="ml-4 mt-2 flex items-center">
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
          <span class="ml-2 font-semibold text-sm">{{
            postReactions.likes
          }}</span>
        </div>
        <div v-if="postReactions.nopes > 0" class="ml-4 mt-2 flex items-center">
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
              d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
            ></path>
          </svg>
          <span class="ml-2 font-semibold text-sm">{{
            postReactions.nopes
          }}</span>
        </div>
        <div v-if="postComments > 0" class="ml-4 mt-2 flex items-center">
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
          <span class="ml-2 font-semibold text-gray-800 text-sm">{{
            postComments
          }}</span>
        </div>
      </div>
    </div>
    <div class=" flex w-full ">
      <div
        class="mt-4 py-1 w-full border-t border-gray-300 flex justify-center"
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
            class="stroke-current text-gray-800 h-4 w-4"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span class="ml-2 font-semibold text-gray-800">Comment</span>
        </button>

        <!-- <button
          type="button"
          @click="likePost(postId, postLikes)"
          class="flex items-center cursor-pointer text-sm px-2 py-4 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
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
          <span class="ml-2 font-semibold text-gray-800"
            >Like {{ postLikes }}</span
          >
        </button> -->
        <PostActionsModal
          v-if="isPostMine(userId)"
          v-bind="$props"
          v-on:editing="editing = true"
        ></PostActionsModal>
      </div>
    </div>
    <div class="px-4 text-gray-900 bg-gray-100 w-full">
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
      <form @submit.prevent class="w-full flex items-center">
        <textarea
          ref="makeAComment"
          v-model.trim="commentContent"
          v-on:keyup.enter="addComment()"
          class="hide-scrollbar form-textarea resize-none w-full h-10 text-sm rounded-full"
        ></textarea>
        <button @click="addComment()" type="button" class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-2 stroke-current text-teal-600 w-6 h-6 hover:text-teal-900"
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
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
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
