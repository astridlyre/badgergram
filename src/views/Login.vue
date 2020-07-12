<template>
  <div class="flex items-center justify-center min-h-screen">
    <main
      class="bg-gray-100 bg-opacity-75 text-gray-800 p-8 rounded w-5/6 max-w-sm relative"
    >
      <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset>
      <section>
        <div class="">
          <h1 class="text-3xl text-center text-teal-900">Sign In</h1>
        </div>
        <form class="w-full mt-4" @submit.prevent>
          <div class="flex items-center py-2 w-full">
            <input
              type="text"
              placeholder="Email"
              id="email1"
              required
              class="appearance-none font-thin bg-transparent placeholder-gray-800 border-b border-b-1 border-gray-800 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-800"
              v-model.trim="loginForm.email"
            />
          </div>
          <div class="flex items-center py-2 w-full">
            <input
              type="password"
              placeholder="Password"
              id="password1"
              required
              class="appearance-none font-thin bg-transparent placeholder-gray-800 border-b border-b-1 border-gray-800 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-800 "
              v-model.trim="loginForm.password"
            />
          </div>
          <div class="flex-col flex items-center justify-between py-2">
            <label for="keepSignedIn" class="text-xs cursor-pointer">
              <input
                type="checkbox"
                name="keepSignedIn"
                id="keepSignedIn"
                class="form-checkbox text-teal-900"
              /><span class="ml-2">Keep me signed in</span></label
            >
            <a
              @click="togglePasswordReset()"
              class="mt-2 font-thin text-xs text-teal-900 hover:text-teal-800 cursor-pointer"
              >Forgot your password?</a
            >
          </div>
          <button
            class="w-full bg-teal-900 rounded text-teal-100 text-sm font-semibold py-2 mt-2 hover:bg-teal-800"
            type="button"
            @click="login()"
          >
            Sign In
          </button>
        </form>
        <div class="mt-8 flex justify-center items-center py-4">
          <div class="w-1/4 flex-shrink h-px bg-gray-800"></div>
          <h3 class="text-xs flex-shrink-0 px-2 text-gray-800">
            New to our platform?
          </h3>
          <div class="w-1/4 flex-shrink h-px bg-gray-800"></div>
        </div>
        <button
          @click="toggle()"
          class="w-full bg-teal-100 rounded-sm text-teal-900 text-sm font-semibold py-2 hover:text-teal-800 hover:bg-teal-200"
          type="button"
        >
          Create an Account
        </button>
      </section>

      <section
        v-show="showSignupForm"
        class="absolute inset-0 bg-teal-900 text-teal-100 p-8"
      >
        <div @click="toggle()" class="w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current h-6 w-6 text-teal-100 -mr-4 -mt-4"
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
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-teal-100 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
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
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-teal-100 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
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
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-teal-100 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
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
                class="appearance-none font-thin bg-transparent border-b border-b-1 border-teal-100 w-full text-gray-800 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
              />
            </label>
          </div>
          <button
            @click="signup()"
            type="button"
            class="mt-8 w-full bg-teal-100 rounded-sm text-teal-900 text-sm font-semibold py-2 mt-4 hover:bg-teal-200 hover:text-teal-800"
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
