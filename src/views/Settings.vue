<template>
  <section
    class="p-4 min-h-screen max-w-full bg-teal-900 flex justify-center items-start"
  >
    <div
      class="mt-20 p-4 w-full bg-gray-100 rounded flex flex-col items-start relative shadow"
    >
      <div class="flex w-full flex-wrap">
        <div class="w-full flex items-center">
          <img
            :src="userProfile.picUrl"
            id="profilePic"
            alt="Current Profile Pic"
            class="w-12 h-12 border-2 border-teal-900 rounded-full"
          />
          <h3 class="ml-2 font-bold text-lg text-teal-900">
            {{ userProfile.name }}
          </h3>
          <transition name="fade">
            <p
              v-if="showSuccess"
              class="ml-4 text-teal-600 font-semibold transition-all"
            >
              Profile updated!
            </p>
          </transition>
        </div>
        <button
          @click="updateProfile()"
          class="mt-2 self-end w-1/2 sm:w-1/4 px-2 py-1 bg-teal-900 text-sm text-gray-100 font-semibold rounded hover:bg-teal-800 shadow-sm"
        >
          Update Profile
        </button>
      </div>

      <form @submit.prevent class="mt-4 w-full">
        <ProfilePicModal></ProfilePicModal>
        <div class="w-full flex flex-col items-center">
          <label style="width: 250px;" for="name" class="text-teal-900"
            >Name</label
          >
          <input
            v-model.trim="name"
            type="text"
            :placeholder="userProfile.name"
            id="name"
            maxlength="25"
            style="width: 250px"
            class="form-input text-teal-900"
          />
          <div class="mt-2">
            <label for="name" class="text-teal-900">Short Bio</label>
            <textarea
              v-model.trim="bio"
              class="form-textarea block w-full resize-none text-teal-900"
              rows="3"
              id="bio"
              style="width: 250px;"
              :placeholder="userProfile.bio"
              maxlength="140"
            ></textarea>
          </div>
        </div>
      </form>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
