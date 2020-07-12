<template>
  <section
    class="p-4 h-screen max-w-full bg-teal-900 flex flex-col justify-center items-center"
  >
    <div class="p-4 bg-gray-100 rounded flex flex-col items-start relative">
      <h3 class="mt-4 w-full font-bold text-lg text-gray-800">Settings</h3>
      <p class="text-gray-900">Update your profile</p>

      <transition name="fade">
        <p
          v-if="showSuccess"
          class="text-teal-700 absolute inset-x-0 text-center transition-all"
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
          class="ml-2 form-input text-teal-900"
        />
      </form>
      <button
        @click="updateProfile()"
        class="mt-4 self-end px-2 py-1 bg-teal-900 text-sm text-teal-100 font-semibold rounded hover:bg-teal-800"
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
