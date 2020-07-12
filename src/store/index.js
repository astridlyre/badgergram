/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;
    post.authorId = doc.userId;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});

fb.commentsCollection.orderBy("createdOn", "asc").onSnapshot((snapshot) => {
  let commentsArray = [];

  snapshot.forEach((doc) => {
    let comment = doc.data();
    comment.id = doc.id;

    commentsArray.push(comment);
  });

  store.commit("setComments", commentsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    comments: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
    setComments(state, val) {
      state.comments = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      //sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        bio: "",
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    // eslint-disable-next-line no-unused-vars
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
      });
    },
    async deletePost({ state, commit }, post) {
      // delete post in firebase
      const docId = `${post.id}`;

      await fb.postsCollection.doc(docId).delete();
      const postLikes = await fb.likesCollection
        .where("postId", "==", docId)
        .get();
      postLikes.forEach((doc) => {
        fb.likesCollection.doc(doc.id).delete();
      });
      const postComments = await fb.commentsCollection
        .where("postId", "==", docId)
        .get();
      postComments.forEach((doc) => {
        fb.commentsCollection.doc(doc.id).delete();
      });
    },
    async deleteComment({ state, commit }, comment) {
      // delete comment in firebase
      const docId = `${comment.commentId}`;
      const postId = `${comment.postId}`;

      await fb.commentsCollection.doc(docId).delete();

      await fb.postsCollection.doc(postId).update({
        comments: parseInt(this.post.comments) - 1,
      });
    },
    // eslint-disable-next-line no-unused-vars
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid;
      const docId = `${userId}_${post.id}`;

      //check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get();
      if (doc.exists) {
        return;
      }
      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId,
      });

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1,
      });
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        bio: user.bio,
      });

      dispatch("fetchUserProfile", { uid: userId });

      // update all posts by user
      const postDocs = await fb.postsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });

      // update all comments by user
      const commentDocs = await fb.commentsCollection
        .where("userId", "==", userId)
        .get();
      commentDocs.forEach((doc) => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect
      commit("setUserProfile", {});
      router.push("/login");
    },
  },
  modules: {},
});

export default store;
