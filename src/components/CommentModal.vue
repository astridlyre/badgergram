<template>
  <div class="fixed inset-0 transition-all">
    <div
      class="w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center"
    >
      <div class="p-4 text-gray-900 bg-gray-100 w-3/4">
        <div class="flex justify-between p-4">
          <h5 class="text-lg font-thin">Add a Comment</h5>
          <a @click="$emit('close')" class="-mr-4 -mt-4"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current h-6 w-6 text-gray-900"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line></svg
          ></a>
        </div>
        <form @submit.prevent class=" px-4">
          <textarea
            v-model.trim="comment"
            placeholder="What do you think?"
            class="form-textarea resize-none w-full"
          ></textarea>
          <div class="flex justify-end">
            <button
              class="px-2 py-1 bg-gray-400 text-sm font-semibold rounded"
              @click="addComment()"
              :disabled="comment == ''"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from "@/firebase";

export default {
  props: ["post"],
  data() {
    return {
      comment: "",
    };
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

      // close modal
      this.$emit("close");
    },
  },
};
</script>
