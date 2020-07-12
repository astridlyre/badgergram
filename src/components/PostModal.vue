<template>
  <div>
    <div class="px-4 w-full">
      <div class="mt-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 172 172"
          class="w-6 h-6"
        >
          <g fill="none" stroke-miterlimit="10">
            <path d="M0 172V0h172v172z" />
            <path
              d="M45.016 21.5c-4.661 0-7.874 3.254-9.575 5.879-1.7 2.624-2.645 5.29-3.191 6.719-2.54 6.55-2.352 14.99-2.184 21.5-5.753 7.705-10.939 17.07-13.773 28.554l-.672 3.024 2.016 2.015c17.657 18.435 49.215 66.684 49.215 66.684l.671 1.008 1.008.672s1.974 1.133 4.871 2.015c2.898.882 7.055 1.68 12.598 1.68 5.543 0 9.7-.798 12.598-1.68 2.897-.882 4.87-2.015 4.87-2.015l1.009-.672.671-1.008s31.558-48.249 49.215-66.684l2.016-2.015-.672-3.024c-2.792-11.296-7.957-20.576-13.605-28.218.168-6.53.399-15.223-2.184-21.836-.546-1.428-1.49-4.095-3.191-6.72-1.701-2.624-4.913-5.878-9.575-5.878-2.876 0-3.611.798-4.87 1.512-1.26.714-2.604 1.616-4.032 2.687-2.31 1.743-4.997 4.115-7.559 6.551H61.31c-2.478-2.352-5.081-4.62-7.391-6.383a38.322 38.322 0 00-4.031-2.687c-1.26-.735-1.848-1.68-4.871-1.68zm-.168 11.086c.693.42 1.448 1.029 2.52 1.848 2.393 1.805 5.29 4.45 7.894 7.054L56.942 43h.167C54.78 55.66 49.257 44.785 43 48.375c-.735.42-1.386 1.07-2.016 1.68.168-5.228.504-10.393 1.176-12.094.651-1.659 1.428-3.527 2.184-4.703.525-.819.525-.651.504-.672zm82.472 0c0 .02-.168-.105.336.672.756 1.176 1.533 3.044 2.184 4.703.672 1.722 1.113 6.887 1.344 12.094a10.446 10.446 0 00-2.184-1.68c-6.299-3.611-11.4 7.39-13.605-5.71l1.343-1.177c2.75-2.75 5.711-5.459 8.063-7.222a32.236 32.236 0 012.52-1.68zM72.73 43h26.54c-3.192 6.887-7.895 20.64-7.895 43 0 31.284 10.477 42.286 16.797 46.191-2.646 3.822-5.123 7.265-6.887 9.91l-.504-.503s-5.5-7.223-14.781-7.223c-9.28 0-14.781 7.223-14.781 7.223l-.504.504c-1.764-2.646-4.241-6.09-6.887-9.91 6.32-3.906 16.797-14.908 16.797-46.192 0-22.36-4.703-36.113-7.895-43zM37.29 63.996c6.886 6.992 12.975 15.537 16.964 25.195.84-1.89 2.687-3.191 4.871-3.191a5.385 5.385 0 015.375 5.375 5.385 5.385 0 01-5.375 5.375c-.777 0-1.512-.21-2.184-.504.084.294.252.546.336.84 4.494 13.563 5.627 24.733 3.192 30.234-9.721-13.9-22.34-31.074-32.922-42.664 2.267-7.894 5.732-14.781 9.742-20.66zm97.253 0c4.073 5.879 7.622 12.724 9.91 20.66-10.582 11.59-23.2 28.765-32.922 42.664-2.435-5.5-1.302-16.67 3.192-30.234.084-.294.252-.546.336-.84-.672.294-1.407.504-2.184.504a5.385 5.385 0 01-5.375-5.375A5.385 5.385 0 01112.875 86c2.184 0 4.031 1.302 4.871 3.191 3.99-9.616 9.952-18.224 16.797-25.195zM86 145.125c2.415 0 4.346 1.974 5.375 2.855v2.184c-1.533.21-3.254.336-5.375.336-2.12 0-3.842-.126-5.375-.336v-2.184c1.029-.881 2.96-2.855 5.375-2.855z"
              class="fill-current text-teal-900"
            />
          </g>
        </svg>
        <h5 class="ml-1 text-xl leading-none text-teal-900">
          {{ userName }}
        </h5>
      </div>
      <span class="text-xs leading-none text-gray-500">{{
        createdOn | formatDate
      }}</span>
    </div>
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
    <div class="px-4 flex w-full">
      <div
        class="mt-4 py-4 w-full border-t border-gray-300 flex justify-evenly font-semibold text-sm"
      >
        <a class="flex items-center">
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
          <p class="ml-2 text-gray-800">Comments {{ postComments }}</p></a
        >

        <a
          @click="likePost(postId, postLikes)"
          class="flex items-center cursor-pointer"
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
          <p class="ml-2 text-gray-800">Likes {{ postLikes }}</p></a
        >
        <a
          v-if="isPostMine(userId)"
          @click="deletePost(postId)"
          class="flex items-center cursor-pointer"
        >
          <svg
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
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          <p class="ml-2 text-red-800">Delete</p>
        </a>
      </div>
    </div>
    <CommentModal
      :post="post"
      :postId="postId"
      :currentUser="currentUser"
      :postComments="postComments"
    ></CommentModal>
  </div>
</template>

<script>
import moment from "moment";
import * as fb from "../firebase";
import { mapState } from "vuex";
import CommentModal from "@/components/CommentModal";

export default {
  components: {
    CommentModal,
  },
  props: [
    "post",
    "postId",
    "userName",
    "createdOn",
    "postContent",
    "userId",
    "postComments",
    "postLikes",
  ],
  data() {
    return {
      // postComments: [],
      showFullPost: false,
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", { id });
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    isPostMine(userId) {
      if (userId == `${this.currentUser}`) {
        return true;
      } else {
        return false;
      }
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
