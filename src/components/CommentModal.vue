<template>
  <div class="p-4 text-gray-900 bg-gray-100 w-full">
    <div
      v-for="comment in postComments"
      :key="comment.id"
      class="comment mb-4 relative"
    >
      <div class="flex w-full items-center justify-between">
        <router-link :to="'/user/' + comment.userId" class="flex items-center">
          <img
            :src="comment.userPic"
            alt="User Pic"
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
          <a
            v-if="comment.userId == currentUser"
            @click="deleteComment(comment.id)"
            class="cursor-pointer ml-2"
            ><svg
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
              <line x1="15" y1="9" x2="9" y2="15"></line></svg
          ></a>
        </div>
      </div>
      <div class="ml-10" style="width: fit-content;">
        <p class="ml-2 px-2 bg-gray-300 rounded-lg">
          {{ comment.content }}
        </p>
      </div>
    </div>
    <form @submit.prevent class="w-full flex items-center">
      <textarea
        v-model.trim="comment"
        v-on:keyup.enter="addComment()"
        placeholder="Write a comment..."
        class="form-textarea resize-none w-full h-10 text-sm rounded-full"
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
</template>

<script>
import moment from "moment";
import { commentsCollection, postsCollection, auth } from "@/firebase";
import { mapState } from "vuex";
// import SmallProfileModal from "@/components/SmallProfileModal";

export default {
  components: {
    // SmallProfileModal,
  },
  props: ["post", "currentUser", "postId"],
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
      if (this.comment == "") {
        return;
      }
      // create a comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name,
        userPic: this.$store.state.userProfile.picUrl,
      });
      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1,
      });

      this.comment = "";
    },
    async deleteComment(commentId) {
      this.$store.dispatch("deleteComment", { commentId });

      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) - 1,
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
