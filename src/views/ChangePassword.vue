<template lang="html">
  <div class="container">
    <div class="col-md-offset-4 col-md-4">
      <card>
        <h2>Change Password</h2>

        <form name="form" novalidate>
          <div class="form-element dark">
            <label for="password">New Password</label>
            <input name="password" type="password" v-model="form.newPassword" required>
          </div>

          <div class="row margin-top-30">
            <div class="col-xs-12 text-right">
              <uiv-btn type="primary" @click="onSubmit" :disabled="loader">Change Password</uiv-btn>
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
  name: 'ChangePassword',
  data() {
    return {
      loader: true,
      form: {
        newPassword: ''
      }
    }
  },
  async mounted() {
    const { resetToken } = this.$route.params;
    await this.$store.dispatch('auth/resetPassword', resetToken);
    this.loader = false;
  },
  methods: {
    async onSubmit() {
      const { resetToken } = this.$route.params;
      this.loader = true;
      await this.$store.dispatch('auth/changePassword', {
        newPassword: this.form.newPassword,
        token: resetToken
      });
      this.loader = false;
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
