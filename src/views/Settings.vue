<template>
  <section class="min-h-screen max-w-full flex justify-center items-start">
    <div
      class="mt-20 p-4 w-full bg-gray-100 rounded flex flex-col items-start relative shadow"
    >
      <div
        class="flex w-full justify-center flex-wrap sm:justify-start sm:w-1/2"
      >
        <div class="flex flex-col items-center relative">
          <div class="mb-6">
            <router-link
              :to="'/user/' + currentUser"
              class="p-4 flex items-center hover:bg-gray-300 rounded"
            >
              <img
                :src="userProfile.picUrl"
                id="profilePic"
                alt="Current Profile Pic"
                class="w-12 h-12 border-2 border-teal-900 rounded-full"
              />
              <h3 class="ml-2 font-semibold text-2xl text-teal-900">
                {{ userProfile.name }}
              </h3>
            </router-link>
            <button
              @click="updateProfile()"
              class="mt-2 self-end w-full px-2 py-1 bg-teal-900 text-sm text-gray-100 font-semibold rounded hover:bg-teal-800 shadow-sm"
            >
              Update Profile
            </button>
          </div>
          <transition name="fade">
            <p
              v-if="showSuccess"
              class="absolute bottom-0 text-sm text-teal-600 font-semibold transition-all"
            >
              Profile updated!
            </p>
          </transition>
        </div>
      </div>

      <form @submit.prevent class="w-full sm:flex sm:flex-wrap">
        <ProfilePicModal
          v-on:update-pic="updatePic()"
          :currentUser="currentUser"
        ></ProfilePicModal>
        <div
          class="w-full sm:w-1/2 flex-2 flex flex-col items-center sm:justify-between"
        >
          <div class="mt-2 flex flex-col w-full">
            <label for="name" class="text-teal-900">Name</label>
            <input
              v-model.trim="name"
              type="text"
              :placeholder="userProfile.name"
              id="name"
              maxlength="25"
              class="placeholder-gray-500 form-input text-gray-800"
            />
          </div>
          <div class="mt-2 flex flex-col w-full">
            <label for="name" class="text-teal-900">Title</label>
            <input
              v-model.trim="title"
              type="text"
              :placeholder="userProfile.title"
              id="name"
              maxlength="50"
              class="placeholder-gray-500 form-input text-gray-800"
            />
          </div>
          <div class="mt-2 flex flex-col w-full">
            <label for="name" class="text-teal-900">Gender</label>
            <input
              v-model.trim="gender"
              type="text"
              :placeholder="userProfile.gender"
              id="name"
              maxlength="25"
              class="placeholder-gray-500 form-input text-gray-800"
            />
          </div>
          <div class="mt-2 flex flex-col w-full">
            <label for="name" class="text-teal-900">Website</label>
            <input
              v-model.trim="website"
              type="text"
              :placeholder="userProfile.website"
              id="name"
              maxlength="100"
              class="placeholder-gray-500 form-input text-gray-800"
            />
          </div>
        </div>

        <div class="mt-2 sm:mt-4 flex flex-col w-full sm:w-1/2 sm:w-full">
          <label for="name" class="text-teal-900">Short Bio</label>
          <textarea
            v-model.trim="bio"
            class="placeholder-gray-500 form-textarea block w-full resize-none text-gray-800"
            rows="4"
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
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { storageRef, auth } from "@/firebase";
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
      // friends: [],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    currentUser: function() {
      return auth.currentUser.uid;
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
      const profilePicRef = storageRef.child(`${this.currentUser}.png`);

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
