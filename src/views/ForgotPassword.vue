<template lang="html">
  <div class="container">
    <div class="col-md-offset-4 col-md-4">
      <card>
        <h2>Forgot Password</h2>

        <form name="form" novalidate>
          <div class="form-element dark">
            <label for="email">Your Email</label>
            <input name="email" type="email" v-model="form.email" required>
          </div>

          <div class="row margin-top-30">
            <div class="col-xs-12 text-right">
              <uiv-btn type="primary" @click="onSubmit" :disabled="loader">Reset Password</uiv-btn>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      loader: false,
      form: {
        email: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.loader = true;
      await this.$store.dispatch('auth/forgotPassword', this.form);
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
h2{
  color: #ffffff;
}

.forgot-password {
  position: absolute;
  right: 0;
  bottom: -24px;
  background: transparent;
  border: none;
  color: #5d5d61;
}
</style>
