<template lang="html">
  <div class="container">
    <div class="col-md-offset-4 col-md-4">
      <card>
        <h2>Register</h2>

        <form name="signinForm" novalidate>
          <div class="form-element dark">
            <label for="email">Email</label>
            <input name="email" type="email" v-model="form.email" required>
          </div>

          <div class="form-element dark">
            <label for="password">Password</label>
            <input name="password" type="password" v-model="form.password" required>
          </div>

          <div class="row margin-top-50">
            <div class="col-xs-12 text-right">
              <uiv-btn type="primary" @click="onSubmit">Register</uiv-btn>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card';
import { mapState } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('auth/register', this.form);
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: #ffffff;
}
</style>
