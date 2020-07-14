<template>
  <section class="py-16 mt-2 min-h-screen w-full bg-teal-900">
    <div
      class="px-4 relative flex flex-col min-h-full w-full justify-start items-center"
    >
      <!-- post listing -->
      <div v-if="posts.length" class="w-full">
        <div
          v-for="post in posts"
          :key="post.id"
          class="mt-4 w-full flex flex-col bg-gray-100 rounded shadow"
        >
          <PostModal
            :post="post"
            :postId="post.id"
            :userName="post.userName"
            :userPic="post.userPic"
            :createdOn="post.createdOn"
            :postContent="post.content"
            :userId="post.userId"
            :postComments="post.comments"
            :postReactions="post.reactions"
            :currentUser="currentUser"
          ></PostModal>
        </div>
      </div>
      <div v-else>
        <p class="mt-4 text-teal-100 text-sm">There are currently no posts</p>
      </div>
    </div>

    <!-- Make a post section -->
    <div
      class="flex flex-col justify-end items-center fixed bottom-0 bg-gray-100 max-w-screen-sm w-full shadow border-t z-50"
    >
      <div class="p-1 flex w-full justify-center items-center">
        <button
          type="button"
          @click="posterToggle(), focus()"
          class="cursor-pointer focus:outline-none hover:bg-gray-200 focus:bg-gray-200 px-4"
        >
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
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
      <transition name="slide-fade">
        <div v-show="posterVisible" class="px-4 mb-4 w-full">
          <form @submit.prevent>
            <textarea
              ref="makeAPost"
              v-model.trim="post.content"
              class="hide-scrollbar form-textarea mt-1 block w-full resize-none"
              rows="3"
              :placeholder="placeholderText"
            ></textarea>
            <button
              @click="createPost()"
              :disabled="post.content === ''"
              type="button"
              class="py-2 mt-2 w-full bg-teal-900 rounded text-teal-100 text-sm font-bold hover:bg-teal-800 focus:bg-teal-800"
            >
              Post
            </button>
          </form>
        </div>
      </transition>
    </div>
    <!-- end make a post section -->
  </section>
</template>

<script>
import moment from "moment";
import * as fb from "../firebase";
import { mapState } from "vuex";
import PostModal from "@/components/PostModal";

export default {
  components: {
    PostModal,
  },
  data() {
    return {
      posterVisible: false,
      post: {
        content: "",
      },
      postComments: [],
      // postId: this.post.id,
      // userName: this.post.authorId,
      // userPic: this.post.userPic,
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
    placeholderText: function() {
      return `What treats do you have in store for us today, ${this.userProfile.name}?`;
    },
  },
  methods: {
    posterToggle() {
      this.posterVisible = !this.posterVisible;
      this.post.content = "";
    },
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      // this.post.content = "";
      this.posterToggle();
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", { id });
    },
    isPostMine(userId) {
      if (userId == `${this.currentUser}`) {
        return true;
      } else {
        return false;
      }
    },
    focus() {
      setTimeout(() => {
        this.$refs.makeAPost.focus();
      }, 250);
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
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
