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

fb.messagesCollection.orderBy("createdOn", "asc").onSnapshot((snapshot) => {
  let messagesArray = [];

  snapshot.forEach((doc) => {
    let message = doc.data();
    message.id = doc.id;
    message.authorId = doc.userId;

    messagesArray.push(message);
  });

  store.commit("setMessages", messagesArray);
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

fb.usersCollection.onSnapshot((snapshot) => {
  let usersArray = [];

  snapshot.forEach((doc) => {
    let user = doc.data();
    user.id = doc.id;

    usersArray.push(user);
  });

  store.commit("setUsers", usersArray);
});

fb.friendRequestsCollection.onSnapshot((snapshot) => {
  let requestsArray = [];

  snapshot.forEach((doc) => {
    let request = doc.data();
    request.id = doc.id;

    requestsArray.push(request);
  });

  store.commit("setFriendRequests", requestsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    comments: [],
    users: [],
    friendRequests: [],
    messages: [],
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
    setUsers(state, val) {
      state.users = val;
    },
    setFriendRequests(state, val) {
      state.friendRequests = val;
    },
    setMessages(state, val) {
      state.messages = val;
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
        bio: "a badgerly bio",
        picUrl: `https://firebasestorage.googleapis.com/v0/b/furrygram-65a95.appspot.com/o/default.png?alt=media&token=ed9049f6-d22f-4ff0-b951-af57c5089b87`,
        title: "a new badger",
        gender: "badger",
        website: "https://badbadger.netlify.app",
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
        userPic: state.userProfile.picUrl,
        comments: 0,
        reactions: {
          likes: 0,
          nopes: 0,
          loves: 0,
        },
      });
    },
    async deletePost({ state, commit }, post) {
      // delete post in firebase
      const docId = `${post.id}`;

      await fb.postsCollection.doc(docId).delete();
      const postReactions = await fb.reactionsCollection
        .where("postId", "==", docId)
        .get();
      postReactions.forEach((doc) => {
        fb.reactionsCollection.doc(doc.id).delete();
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

      await fb.commentsCollection.doc(docId).delete();
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        bio: user.bio,
        picUrl: user.picUrl,
        title: user.title,
        gender: user.gender,
        website: user.website,
      });

      dispatch("fetchUserProfile", { uid: userId });

      // update all posts by user
      const postDocs = await fb.postsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name,
          userPic: user.picUrl,
        });
      });

      // update all comments by user
      const commentDocs = await fb.commentsCollection
        .where("userId", "==", userId)
        .get();
      commentDocs.forEach((doc) => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name,
          userPic: user.picUrl,
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
