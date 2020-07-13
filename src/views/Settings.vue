<template>
  <section
    class="p-4 h-screen max-w-full bg-teal-900 flex flex-col justify-center items-center"
  >
    <div class="p-4 bg-gray-100 rounded flex flex-col items-start relative">
      <div class="flex items-center">
        <img
          :src="userProfile.picUrl"
          id="profilePic"
          alt="Current Profile Pic"
          class="w-12 h-12 border-2 border-teal-900 rounded-full"
        />
        <h3 class="ml-2 w-full font-bold text-lg text-teal-900">
          {{ userProfile.name }}
        </h3>
      </div>

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
      <div class="mt-4 w-full flex items-center justify-end">
        <transition name="fade">
          <p
            v-if="showSuccess"
            class="mr-4 text-teal-600 font-semibold transition-all"
          >
            Profile updated!
          </p>
        </transition>
        <button
          @click="updateProfile()"
          class="self-end px-2 py-1 bg-teal-900 text-sm text-teal-100 font-semibold rounded hover:bg-teal-800"
        >
          Update Profile
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "../firebase";
import ProfilePicModal from "@/components/ProfilePicModal";

export default {
  components: {
    ProfilePicModal,
  },
  data() {
    return {
      name: "",
      bio: "",
      showSuccess: false,
      picUrl: "",
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    currentUser: function() {
      return fb.auth.currentUser.uid;
    },
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
    async updatePic() {
      const profilePicRef = fb.storageRef.child(`${this.currentUser}.png`);

      const picUrl = await profilePicRef.getDownloadURL().then(function(url) {
        return url;
      });
      this.picUrl = picUrl;
    },
  },
  created() {
    this.updatePic();
  },
};
</script>

<style></style>
