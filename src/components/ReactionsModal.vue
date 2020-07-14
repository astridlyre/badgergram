<template>
  <div class="w-1/3">
    <div
      v-if="showReactions"
      @click="showReactions = false"
      class="fixed z-20 inset-0 w-screen h-screen"
    ></div>
    <div class="relative w-full">
      <button
        type="button"
        @click="showReactions = true"
        class="w-full flex justify-center items-center cursor-pointer text-sm py-4 px-2 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
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
        <span class="ml-2 font-semibold text-gray-800">Like</span>
      </button>
      <transition name="fade">
        <ul
          v-if="showReactions"
          class="flex flex-col sm:flex-row absolute left-0 right-0 top-0 sm:bottom-0 -mt-1 shadow rounded z-30 bg-gray-100 py-1"
        >
          <li class="sm:w-1/3 order-3 sm:order-first flex">
            <button
              type="button"
              @click="
                (reactionType = 'love'), reactToPost(), (showReactions = false)
              "
              class="w-full flex justify-center items-center cursor-pointer text-sm px-2 py-4 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
            >
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
                ></path></svg
              ><span class="sm:hidden ml-2 font-semibold text-red-700"
                >Love</span
              >
            </button>
          </li>
          <li class="sm:w-1/3 flex">
            <button
              type="button"
              @click="
                (reactionType = 'like'), reactToPost(), (showReactions = false)
              "
              class="w-full flex justify-center items-center cursor-pointer text-sm px-2 py-4 w-full rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
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
                ></path></svg
              ><span class="sm:hidden ml-2 font-semibold text-gray-800"
                >Like</span
              >
            </button>
          </li>
          <li class="sm:w-1/3 flex">
            <button
              type="button"
              @click="
                (reactionType = 'nope'), reactToPost(), (showReactions = false)
              "
              class="w-full flex justify-center items-center cursor-pointer text-sm px-2 py-4 w-full rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
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
                  d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                ></path></svg
              ><span class="sm:hidden ml-2 font-semibold text-gray-800"
                >Nope</span
              >
            </button>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { reactionsCollection, postsCollection, auth } from "@/firebase";

export default {
  props: ["post", "postId", "postLikes", "postNopes", "postLoves"],
  data() {
    return {
      showReactions: false,
      reactionType: "",
    };
  },
  computed: {
    currentUser: function() {
      return auth.currentUser.uid;
    },

    docId: function() {
      return `${this.currentUser}_${this.post.id}`;
    },
  },

  methods: {
    // reactToPost(id, react) {
    //   this.$store.dispatch("reactToPost", { id, react });
    // },
    async reactToPost() {
      const reactionType = this.reactionType;

      //check if user has liked post
      const doc = await reactionsCollection.doc(this.docId).get();
      if (doc.exists) {
        return;
      }
      // create reaction
      await reactionsCollection.doc(this.docId).set({
        postId: this.post.id,
        userId: this.currentUser,
        reaction: reactionType,
      });

      // update post likes count
      if (reactionType === "like") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            likes: parseInt(this.post.reactions.likes) + 1,
          },
        });
      } else if (reactionType === "nope") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            nopes: parseInt(this.post.reactions.nopes) + 1,
          },
        });
      } else if (reactionType === "love") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            loves: parseInt(this.post.reactions.loves) + 1,
          },
        });
      } else {
        return;
      }
    },
    async changeReaction() {
      const futureReactType = this.reactionType;
      const ref = await reactionsCollection.doc(this.docId).get();
      const reactionObj = ref.data();
      const currentReact = reactionObj.reaction;
      console.log(currentReact, futureReactType);

      await reactionsCollection.doc(this.docId).update({
        reaction: futureReactType,
      });

      console.log(parseInt(this.post.reactions.nopes) - 1);

      // remove previous reaction

      if (currentReact === "like" && futureReactType === "nope") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            nopes: this.post.reactions.nopes + 1,
            likes: this.post.reactions.likes - 1,
          },
        });
      } else if (currentReact === "nope" && futureReactType === "like") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            likes: this.post.reactions.likes + 1,
            nopes: this.post.reactions.nopes - 1,
          },
        });
      } else if (currentReact === "love" && futureReactType === "like") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            likes: this.post.reactions.likes + 1,
            loves: this.post.reactions.loves - 1,
          },
        });
      } else if (currentReact === "like" && futureReactType === "love") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            loves: this.post.reactions.loves + 1,
            likes: this.post.reactions.likes - 1,
          },
        });
      } else if (currentReact === "nope" && futureReactType === "love") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            loves: this.post.reactions.loves + 1,
            nopes: this.post.reactions.nopes - 1,
          },
        });
      } else if (currentReact === "love" && futureReactType === "nope") {
        await postsCollection.doc(this.post.id).update({
          reactions: {
            nopes: this.post.reactions.nopes + 1,
            loves: this.post.reactions.loves - 1,
          },
        });
      } else {
        return;
      }
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
</style>
