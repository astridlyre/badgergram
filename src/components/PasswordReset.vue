<template>
  <div class="absolute bg-teal-800 inset-0 w-full h-full min-h-full">
    <div @click="$emit('close')" class="flex justify-end p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-current h-6 w-6 text-gray-100 cursor-pointer"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
    <div class="mt-8 flex flex-col items-center w-full">
      <h3 class="text-3xl text-center text-gray-100">
        Reset Password
      </h3>
      <div v-if="!showSuccess" class="p-4">
        <p class="text-sm mt-4 text-gray-100">
          Enter your email to reset your password
        </p>
        <form @submit.prevent>
          <div class="flex items-center py-2 mt-4">
            <input
              v-model.trim="email"
              type="email"
              placeholder="Email"
              class="appearance-none placeholder-gray-500 bg-transparent border-b border-b-1 border-gray-100 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
            />
          </div>
        </form>

        <button
          @click="resetPassword()"
          class="w-full bg-gray-100 rounded-sm text-teal-800 text-sm font-semibold py-2 mt-4 shadow-sm hover:bg-gray-200 focus:bg-gray-200"
        >
          Reset
        </button>
        <p v-if="errorMsg !== ''" class="text-sm max-w-full mt-4">
          {{ errorMsg }}
        </p>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: "",
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";

      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>
