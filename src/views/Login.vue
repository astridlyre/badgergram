<template>
  <div class="flex items-center justify-center min-h-screen">
    <main class="bg-gray-100 text-gray-800 p-8 rounded w-5/6 max-w-sm relative">
      <transition name="fade">
        <PasswordReset
          v-if="showPasswordReset"
          @close="togglePasswordReset()"
        ></PasswordReset>
      </transition>
      <section>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 172 172"
            class="w-8 h-8"
          >
            <g fill="none" stroke-miterlimit="10">
              <path d="M0 172V0h172v172z" />
              <path
                d="M45.016 21.5c-4.661 0-7.874 3.254-9.575 5.879-1.7 2.624-2.645 5.29-3.191 6.719-2.54 6.55-2.352 14.99-2.184 21.5-5.753 7.705-10.939 17.07-13.773 28.554l-.672 3.024 2.016 2.015c17.657 18.435 49.215 66.684 49.215 66.684l.671 1.008 1.008.672s1.974 1.133 4.871 2.015c2.898.882 7.055 1.68 12.598 1.68 5.543 0 9.7-.798 12.598-1.68 2.897-.882 4.87-2.015 4.87-2.015l1.009-.672.671-1.008s31.558-48.249 49.215-66.684l2.016-2.015-.672-3.024c-2.792-11.296-7.957-20.576-13.605-28.218.168-6.53.399-15.223-2.184-21.836-.546-1.428-1.49-4.095-3.191-6.72-1.701-2.624-4.913-5.878-9.575-5.878-2.876 0-3.611.798-4.87 1.512-1.26.714-2.604 1.616-4.032 2.687-2.31 1.743-4.997 4.115-7.559 6.551H61.31c-2.478-2.352-5.081-4.62-7.391-6.383a38.322 38.322 0 00-4.031-2.687c-1.26-.735-1.848-1.68-4.871-1.68zm-.168 11.086c.693.42 1.448 1.029 2.52 1.848 2.393 1.805 5.29 4.45 7.894 7.054L56.942 43h.167C54.78 55.66 49.257 44.785 43 48.375c-.735.42-1.386 1.07-2.016 1.68.168-5.228.504-10.393 1.176-12.094.651-1.659 1.428-3.527 2.184-4.703.525-.819.525-.651.504-.672zm82.472 0c0 .02-.168-.105.336.672.756 1.176 1.533 3.044 2.184 4.703.672 1.722 1.113 6.887 1.344 12.094a10.446 10.446 0 00-2.184-1.68c-6.299-3.611-11.4 7.39-13.605-5.71l1.343-1.177c2.75-2.75 5.711-5.459 8.063-7.222a32.236 32.236 0 012.52-1.68zM72.73 43h26.54c-3.192 6.887-7.895 20.64-7.895 43 0 31.284 10.477 42.286 16.797 46.191-2.646 3.822-5.123 7.265-6.887 9.91l-.504-.503s-5.5-7.223-14.781-7.223c-9.28 0-14.781 7.223-14.781 7.223l-.504.504c-1.764-2.646-4.241-6.09-6.887-9.91 6.32-3.906 16.797-14.908 16.797-46.192 0-22.36-4.703-36.113-7.895-43zM37.29 63.996c6.886 6.992 12.975 15.537 16.964 25.195.84-1.89 2.687-3.191 4.871-3.191a5.385 5.385 0 015.375 5.375 5.385 5.385 0 01-5.375 5.375c-.777 0-1.512-.21-2.184-.504.084.294.252.546.336.84 4.494 13.563 5.627 24.733 3.192 30.234-9.721-13.9-22.34-31.074-32.922-42.664 2.267-7.894 5.732-14.781 9.742-20.66zm97.253 0c4.073 5.879 7.622 12.724 9.91 20.66-10.582 11.59-23.2 28.765-32.922 42.664-2.435-5.5-1.302-16.67 3.192-30.234.084-.294.252-.546.336-.84-.672.294-1.407.504-2.184.504a5.385 5.385 0 01-5.375-5.375A5.385 5.385 0 01112.875 86c2.184 0 4.031 1.302 4.871 3.191 3.99-9.616 9.952-18.224 16.797-25.195zM86 145.125c2.415 0 4.346 1.974 5.375 2.855v2.184c-1.533.21-3.254.336-5.375.336-2.12 0-3.842-.126-5.375-.336v-2.184c1.029-.881 2.96-2.855 5.375-2.855z"
                class="fill-current text-teal-900"
              />
            </g>
          </svg>
          <h3 class="ml-1 text-xl text-teal-600 hidden md:block">
            bad<span class="text-teal-900">badger</span>
          </h3>
          <h3 class="ml-1 text-xl text-teal-600 md:hidden">
            b<span class="text-teal-900">b</span>
          </h3>
        </div>
        <div class="mt-4 w-full flex items-center justify-center">
          <h1 class="text-3xl text-center text-teal-900">Sign In</h1>
        </div>
        <form class="w-full mt-4" @submit.prevent="login()">
          <div class="flex items-center py-2 w-full">
            <input
              type="text"
              placeholder="Email"
              id="email1"
              required
              class="appearance-none font-thin bg-transparent placeholder-gray-800 border-b border-b-1 border-gray-800 w-full text-teal-900 py-1 px-2 leading-tight focus:outline-none focus:border-teal-800"
              v-model.trim="loginForm.email"
            />
          </div>
          <div class="flex items-center py-2 w-full">
            <input
              type="password"
              placeholder="Password"
              id="password1"
              required
              class="appearance-none font-thin bg-transparent placeholder-gray-800 border-b border-b-1 border-gray-800 w-full text-teal-900 py-1 px-2 leading-tight focus:outline-none focus:border-teal-800 "
              v-model.trim="loginForm.password"
              v-on:keyup.enter="login()"
            />
          </div>
          <div class="flex-col flex items-center justify-between py-2">
            <label for="keepSignedIn" class="text-xs cursor-pointer">
              <input
                type="checkbox"
                name="keepSignedIn"
                id="keepSignedIn"
                class="form-checkbox shadow-sm text-teal-900 cursor-pointer"
              /><span class="ml-2">Keep me signed in</span></label
            >
            <a
              @click="togglePasswordReset()"
              class="mt-2 font-thin text-xs text-teal-900 hover:text-teal-800 cursor-pointer"
              >Forgot your password?</a
            >
          </div>
          <button
            class="w-full bg-teal-800 rounded text-gray-100 text-sm font-semibold py-2 mt-2 shadow-sm hover:bg-teal-900"
            type="submit"
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
          class="w-full bg-gray-300 rounded-sm text-teal-800 text-sm font-semibold py-2 shadow-sm hover:text-teal-800 hover:bg-gray-400"
          type="button"
        >
          Create an Account
        </button>
      </section>

      <transition name="fade">
        <section
          v-show="showSignupForm"
          class="absolute inset-0 bg-teal-800 text-gray-100 p-8"
        >
          <button
            @click="toggle()"
            class="flex absolute right-0 top-0 p-2 mt-6 mr-6 focus:outline-none cursor-pointer"
          >
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
          </button>
          <div class="mt-8">
            <h1 class="text-3xl text-center">Get Started</h1>
          </div>
          <form @submit.prevent="signup()" class="w-full mt-8">
            <div class="flex items-center py-2">
              <label for="name" class="w-full">
                <input
                  v-model.trim="signupForm.name"
                  type="text"
                  placeholder="Name"
                  id="name"
                  required
                  class="appearance-none placeholder-gray-500 bg-transparent border-b border-b-1 border-gray-100 w-full text-teal-100 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
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
                  class="appearance-none placeholder-gray-500 bg-transparent border-b border-b-1 border-gray-100 w-full text-teal-100 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
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
                  class="appearance-none placeholder-gray-500 bg-transparent border-b border-b-1 border-gray-100 w-full text-teal-100 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
                />
              </label>
            </div>
            <div class="flex items-center py-2 relative">
              <label for="passwordCheck" class="w-full">
                <input
                  v-model.trim="signupForm.passwordCheck"
                  type="password"
                  placeholder="Confirm Password"
                  id="passwordCheck"
                  required
                  class="appearance-none placeholder-gray-500 bg-transparent border-b border-b-1 border-gray-100 w-full text-teal-100 py-1 px-2 leading-tight focus:outline-none focus:border-teal-200"
                />
              </label>
              <transition name="fade">
                <p
                  v-if="!passwordsMatch"
                  class="block absolute mt-8 font-semibold text-sm text-red-700"
                >
                  Passwords do not match!
                </p></transition
              >
            </div>
            <button
              @click="signup()"
              v-on:keyup.enter="signup()"
              type="submit"
              class="mt-8 w-full bg-gray-100 rounded-sm text-teal-800 text-sm font-semibold py-2 mt-4 shadow-sm hover:bg-gray-200 focus:bg-gray-200"
            >
              Sign Up
            </button>
          </form>
        </section>
      </transition>
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
      passwordsMatch: true,
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
      if (
        `${this.signupForm.password}` !== `${this.signupForm.passwordCheck}`
      ) {
        this.passwordsMatch = false;
        setTimeout(() => {
          this.passwordsMatch = true;
        }, 3000);
        return;
      }

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
