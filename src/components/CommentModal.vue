<template>
  <div>
    <div class="flex w-full items-center justify-between">
      <router-link :to="'/user/' + comment.userId" class="flex items-center">
        <img
          :src="comment.userPic"
          alt=""
          class="w-8 h-8 border-2 border-teal-900 rounded-full"
        />
        <h5 class="ml-1 font-semibold leading-none text-teal-900">
          {{ comment.userName }}
        </h5>
      </router-link>
      <div class="ml-2 flex justify-end items-center">
        <p class="text-xs leading-none text-gray-500">
          {{ comment.createdOn | formatDate }}
        </p>
        <CommentActionsModal
          v-if="comment.userId == currentUser"
          :post="post"
          :commentId="comment.id"
          :commentContent="comment.content"
          v-on:editing="
            (editing = true),
              (commentId = comment.id),
              (editingContent = comment.content)
          "
        ></CommentActionsModal>
      </div>
    </div>
    <div v-if="editing">
      <div
        v-if="editing"
        @click="editing = false"
        class="fixed z-0 inset-0 w-screen h-screen"
      ></div>
      <form @submit.prevent class="w-full flex items-center">
        <textarea
          v-model.trim="editingContent"
          placeholder="Write a comment..."
          class="hide-scrollbar z-30 form-textarea resize-none w-full h-10 text-sm rounded-full"
        ></textarea>
        <button
          @click="updateComment(commentId, editingContent), (editing = false)"
          type="button"
          class="focus:outline-none z-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-2 stroke-current text-teal-600 w-6 h-6 hover:text-teal-900"
          >
            <polyline points="9 11 12 14 22 4"></polyline>
            <path
              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            ></path>
          </svg>
        </button>
      </form>
    </div>
    <div v-else class="ml-8" style="width: fit-content;">
      <p class="px-2 bg-gray-300 rounded-lg">
        {{ comment.content }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  commentsCollection,
  postsCollection,
  auth,
  incrementPlus,
} from "@/firebase";
import { mapState } from "vuex";
import CommentActionsModal from "@/components/CommentActionsModal";

export default {
  components: {
    CommentActionsModal,
  },
  props: ["post", "currentUser", "postId", "comment"],
  data() {
    return {
      editingContent: "",
      editing: false,
      commentContent: "",
      commentId: "",
    };
  },
  computed: {
    ...mapState(["comments"]),
    postComments: function() {
      let currentPost = this.post.id;
      return this.comments.filter(function(comment) {
        return comment.postId === currentPost;
      });
    },
  },
  methods: {
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
    updateComment(commentId) {
      if (this.editingContent == "") {
        return;
      }
      commentsCollection.doc(commentId).update({
        content: this.editingContent,
      });
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
  },
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
