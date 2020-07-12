<template>
  <div class="p-4 text-gray-900 bg-gray-100 w-full">
    <div v-for="comment in postComments" :key="comment.id" class="comment mb-4">
      <div class="flex items-center">
        <p class="font-semibold">
          {{ comment.userName }}
        </p>
        <p class="ml-2 px-2 bg-gray-300 rounded-full">
          {{ comment.content }}
        </p>
      </div>
      <span class="block text-xs text-right leading-none text-gray-500">{{
        comment.createdOn | formatDate
      }}</span>
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
  props: ["post"],
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
