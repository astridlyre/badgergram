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
        <div
          class="w-full flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center sm:items-start"
        >
          <div class="mt-2 flex flex-col w-full sm:w-1/2">
            <label for="name" class="text-teal-900">Name</label>
            <input
              v-model.trim="name"
              type="text"
              :placeholder="userProfile.name"
              id="name"
              maxlength="25"
              class="form-input text-teal-900 sm:mr-1"
            />
          </div>
          <div class="mt-2 flex flex-col w-full sm:w-1/2">
            <label for="name" class="text-teal-900 sm:ml-1">Title</label>
            <input
              v-model.trim="title"
              type="text"
              :placeholder="userProfile.title"
              id="name"
              maxlength="50"
              class="form-input text-teal-900 sm:ml-1"
            />
          </div>
          <div class="mt-2 flex flex-col w-full sm:w-1/2">
            <label for="name" class="text-teal-900">Gender</label>
            <input
              v-model.trim="gender"
              type="text"
              :placeholder="userProfile.gender"
              id="name"
              maxlength="25"
              class="form-input text-teal-900 sm:mr-1"
            />
          </div>
          <div class="mt-2 flex flex-col w-full sm:w-1/2">
            <label for="name" class="text-teal-900 sm:ml-1">Website</label>
            <input
              v-model.trim="website"
              type="text"
              :placeholder="userProfile.website"
              id="name"
              maxlength="100"
              class="form-input text-teal-900 sm:ml-1"
            />
          </div>
          <div class="mt-2 flex flex-col w-full sm:w-1/2 sm:w-full">
            <label for="name" class="text-teal-900">Short Bio</label>
            <textarea
              v-model.trim="bio"
              class="form-textarea block w-full resize-none text-teal-900"
              rows="3"
              id="bio"
              :placeholder="userProfile.bio"
              maxlength="300"
            ></textarea>
          </div>
          <!-- <div
            v-for="friend in friendsList"
            :key="friend"
            class="mt-2 flex flex-col w-full sm:w-1/2 sm:w-full"
          >
            <h5 for="name" class="text-teal-900">{{ friend }}</h5>
            
          </div> -->
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
      title: "",
      gender: "",
      website: "",
      showSuccess: false,
      picUrl: "",
      // friends: [],
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
        title: this.title !== "" ? this.title : this.userProfile.title,
        gender: this.gender !== "" ? this.gender : this.userProfile.gender,
        website: this.website !== "" ? this.website : this.userProfile.website,
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
    // async getFriendsList(friends) {
    //    const friendsList = await fb.usersCollection
    //     .where("userId", "==", docId)
    //     .get();
    //   postComments.forEach((doc) => {
    //     fb.commentsCollection.doc(doc.id).delete();
    //   });
    // }
  },
  created() {
    this.updatePic();
    // this.getFriendsList();
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
