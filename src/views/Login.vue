<template>
  <div
    :style="cssBg"
    class="bg-cover bg-center flex items-center justify-center min-h-screen border-l-8 border-r-8 border-orange-900"
  >
    <main
      class="bg-gray-900 bg-opacity-75 text-gray-100 p-8 rounded-sm w-5/6 max-w-sm relative"
    >
      <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset>
      <section>
        <div class="">
          <h1 class="font-thin text-3xl text-center">Sign In</h1>
        </div>
        <form class="w-full mt-4" @submit.prevent>
          <div class="flex items-center py-2 w-full">
            <input
              type="text"
              placeholder="Email"
              id="email1"
              required
              class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600"
              v-model.trim="loginForm.email"
            />
          </div>
          <div class="flex items-center py-2 w-full">
            <input
              type="password"
              placeholder="Password"
              id="password1"
              required
              class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600 "
              v-model.trim="loginForm.password"
            />
          </div>
          <div class="flex-col flex items-center justify-between py-2">
            <label for="keepSignedIn" class="text-xs">
              <input
                type="checkbox"
                name="keepSignedIn"
                id="keepSignedIn"
                class="form-checkbox text-orange-600"
              /><span class="ml-2 font-thin">Keep me signed in</span></label
            >
            <a
              @click="togglePasswordReset()"
              class="mt-2 font-thin text-xs text-orange-600"
              >Forgot your password?</a
            >
          </div>
          <button
            class="w-full bg-orange-600 rounded-sm text-gray-900 text-sm font-semibold py-2 mt-2"
            type="button"
            @click="login()"
          >
            Sign In
          </button>
        </form>
        <div class="mt-8 flex justify-center items-center py-4">
          <div class="w-1/4 flex-shrink h-px bg-gray-700"></div>
          <h3 class="text-xs flex-shrink-0 font-thin px-2">
            New on our platform?
          </h3>
          <div class="w-1/4 flex-shrink h-px bg-gray-700"></div>
        </div>
        <button
          @click="toggle()"
          class="w-full bg-gray-400 rounded-sm text-gray-900 text-sm font-semibold py-2"
          type="button"
        >
          Create an Account
        </button>
      </section>

      <section
        v-show="showSignupForm"
        class="absolute inset-0 bg-gray-900 text-gray-100 p-8"
      >
        <div @click="toggle()" class="w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current h-6 w-6 text-gray-100 -mr-4 -mt-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="">
          <h1 class="font-thin text-3xl text-center">Get Started</h1>
        </div>
        <form @submit.prevent class="w-full mt-8">
          <div class="flex items-center py-2">
            <label for="name" class="w-full">
              <input
                v-model.trim="signupForm.name"
                type="text"
                placeholder="Name"
                id="name"
                required
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600"
              />
            </label>
          </div>
          <div class="flex items-center py-2">
            <label for="email2" class="w-full">
              <input
                v-model.trim="signupForm.email"
                type="text"
                placeholder="Email"
                id="email2"
                required
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600"
              />
            </label>
          </div>
          <div class="flex items-center py-2">
            <label for="password2" class="w-full">
              <input
                v-model.trim="signupForm.password"
                type="password"
                placeholder="Password (6+ char)"
                id="password2"
                required
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600"
              />
            </label>
          </div>
          <div class="flex items-center py-2">
            <label for="passwordCheck" class="w-full">
              <input
                v-model.trim="signupForm.passwordCheck"
                type="password"
                placeholder="Confirm Password"
                id="passwordCheck"
                required
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-gray-800 w-full text-gray-100 py-1 px-2 leading-tight focus:outline-none focus:border-orange-600"
              />
            </label>
          </div>
          <button
            @click="signup()"
            type="button"
            class="mt-8 w-full bg-orange-600 rounded-sm text-gray-900 text-sm font-semibold py-2 mt-4"
          >
            Sign Up
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";

export default {
  components: {
    PasswordReset,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      cssBg: {
        backgroundImage: `url(${require("@/assets/img/bg.jpg")})`,
      },
      showSignupForm: false,
      showPasswordReset: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      });
    },
    toggle() {
      this.showSignupForm = !this.showSignupForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
  },
};
</script>

<style></style>
