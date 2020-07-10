<template>
  <section
    class="p-4 h-screen max-w-full flex flex-col justify-center items-center"
  >
    <div class="p-4 bg-gray-100 rounded flex flex-col items-start relative">
      <h3 class="mt-4 w-full font-bold text-lg">Settings</h3>
      <p class="text-gray-700">Update your profile</p>

      <transition name="fade">
        <p
          v-if="showSuccess"
          class="text-green-500 absolute inset-x-0 text-center transition-all"
        >
          Profile updated!
        </p>
      </transition>

      <form
        @submit.prevent
        class="mt-4 w-full flex items-center justify-between"
      >
        <label for="name">Name</label>
        <input
          v-model.trim="name"
          type="text"
          :placeholder="userProfile.name"
          id="name"
          class="ml-2 form-input"
        />
      </form>
      <button
        @click="updateProfile()"
        class="mt-4 self-end px-2 py-1 bg-gray-400 text-sm font-semibold rounded"
      >
        Update Profile
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
      });

      this.name = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
</script>

<style></style>
