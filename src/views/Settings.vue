<template>
  <section
    class="p-4 h-screen max-w-full bg-teal-900 flex flex-col justify-center items-center"
  >
    <div class="p-4 bg-gray-100 rounded flex flex-col items-start relative">
      <h3 class="mt-4 w-full font-bold text-lg text-teal-900">Settings</h3>

      <transition name="fade">
        <p
          v-if="showSuccess"
          class="text-teal-700 absolute inset-x-0 text-center transition-all"
        >
          Profile updated!
        </p>
      </transition>

      <form @submit.prevent class="mt-4 w-full">
        <ProfilePicModal></ProfilePicModal>
        <div class="w-full">
          <label for="name" class="text-teal-900">Name</label>
          <input
            v-model.trim="name"
            type="text"
            :placeholder="userProfile.name"
            id="name"
            class="ml-2 form-inputtext-teal-900"
          />
        </div>
        <div class="mt-4 w-full">
          <label for="name" class="text-teal-900"
            >Bio (Max 140 characters)</label
          >
          <textarea
            v-model.trim="bio"
            class="form-textarea block w-full resize-none text-teal-900"
            rows="3"
            id="bio"
            :placeholder="userProfile.bio"
            maxlength="140"
          ></textarea>
        </div>
        <!-- <div
          class="mt-4 w-full"
          v-for="friend in friends"
          :key="friendId"
        ></div> -->
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
import ProfilePicModal from "@/components/ProfilePicModal";

export default {
  components: {
    ProfilePicModal,
  },
  data() {
    return {
      name: "",
      bio: "",
      picUrl: "",
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
        bio: this.bio !== "" ? this.bio : this.userProfile.bio,
        picUrl: this.picUrl !== "" ? this.picUrl : this.userProfile.picUrl,
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
