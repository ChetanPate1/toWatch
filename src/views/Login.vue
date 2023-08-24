<template>
  <div class="grid place-items-center h-screen">
    <tw-card class="w-screen text-left">
      <h2 class="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
   
      <form name="signinForm" novalidate>
        <div class="mb-4">
          <tw-form-label id="email">Email</tw-form-label>
          <tw-form-field id="email" v-model="form.email"></tw-form-field>
        </div>
  
        <div class="mb-4">
          <div class="grid grid-cols-2">
            <tw-form-label id="password">Password</tw-form-label>
            <button class="text-right text-xs hover:text-indigo-600" type="button"
              @click="$router.push({ name: 'forgotPassword' })">Forgotten your password?</button>
          </div>
          <tw-form-field id="password" v-model="form.password"></tw-form-field>
        </div>
  
        <tw-button type="button" @click="onLogin" class="w-full mt-7">Sign in</tw-button>
      </form>
    </tw-card>
  </div>
</template>

<script>
import TwCard from '@/components/TwCard';
import TwFormLabel from '@/components/TwFormLabel.vue';
import TwFormField from '@/components/TwFormField.vue';
import TwButton from '@/components/TwButton';

import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      token: ({ storage }) => storage.token
    })
  },
  mounted() {
    const { token } = this.$route.params;

    if (token) {
      this.$store.dispatch('auth/verifyEmail', token);
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch('auth/signUserIn', this.form);
    }
  },
  components: {
    TwCard,
    TwFormLabel,
    TwFormField,
    TwButton
  }
}
</script>
