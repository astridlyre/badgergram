<template>
  <div class="p-4 text-gray-900 bg-gray-100 w-full">
    <div
      v-for="comment in postComments"
      :key="comment.id"
      class="comment mb-4 relative"
    >
      <div class="flex">
        <p class="font-semibold">
          {{ comment.userName }}
        </p>
        <p class="ml-2 px-2 bg-gray-300 rounded-lg">
          {{ comment.content }}
        </p>
      </div>
      <div
        class="mt-1 flex w-full justify-end items-center text-xs text-right leading-none text-gray-500"
      >
        <p>{{ comment.createdOn | formatDate }}</p>
        <a
          v-if="comment.userId == currentUser"
          @click="deleteComment(comment.id)"
          class="cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-red-800 h-4 w-4 ml-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line></svg
        ></a>
      </div>
    </div>
    <form @submit.prevent class="">
      <textarea
        v-model.trim="comment"
        v-on:keyup.enter="addComment()"
        placeholder="Write a comment..."
        class="form-textarea resize-none w-full h-10 text-sm rounded-full"
      ></textarea>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import { commentsCollection, postsCollection, auth } from "@/firebase";
import { mapState } from "vuex";

export default {
  props: ["post", "currentUser"],
  data() {
    return {
      comment: "",
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
      // create a comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name,
      });
      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1,
      });

      this.comment = "";
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", { id });
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
