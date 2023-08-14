<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-desc">Login</div>
      </div>
      <n-alert
        v-if="hasLoginError"
        title="Login Error!"
        type="error"
        class="login-alert"
        closable
        :bordered="false"
      >Email or Password is incorrect</n-alert>
      <div class="view-account-form">
        <n-form ref="formRef" label-placement="left" size="large" :model="user" :rules="rules">
          <n-form-item path="Email">
            <n-input v-model:value="user.email" placeholder="Email">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <MailOpenOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="user.password"
              type="password"
              showPasswordOn="click"
              placeholder="Password"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="loading"
              block
            >Login</n-button>
          </n-form-item>
          <n-form-item>
            <n-button
              type="info"
              @click="$router.push('signup')"
              size="large"
              :loading="loading"
              block
            >Sign Up</n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script>
import { PersonOutline, LockClosedOutline, MailOpenOutline } from "@vicons/ionicons5";

export default {
  components: {
    PersonOutline,
    LockClosedOutline,
    MailOpenOutline
  },
  data() {
    return {
      loading: false,
      hasLoginError: false,
      user: {
        email: null,
        username: null,
        password: null
      },
      rules: {
        email: {
          required: true,
          message: "Email is Required.",
          trigger: "blur"
        },
        name: {
          required: true,
          message: "Name is Required.",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "Password is Required.",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    handleSubmit() {
      this.hasLoginError = false;
      this.$auth
        .login(this.user)
        .then(() => {
          this.$router.push({
            name: "home"
          });
        })
        .catch(() => {
          this.hasLoginError = true;
        });
    }
  }
};
</script>
<style scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
.view-account-container {
  flex: 1;
  padding: 32px 12px;
  max-width: 384px;
  min-width: 320px;
  margin: 0 auto;
}
.view-account-top {
  padding: 32px 0;
  text-align: center;
}
.view-account-top-desc {
  font-size: 20px;
  color: #808695;
}
.login-alert {
  margin-bottom: 20px;
}
.view-account-other {
  width: 100%;
}
.view-account .default-color {
  color: #515a6e;
}
.view-account .default-color .ant-checkbox-wrapper {
  color: #515a6e;
}
@media (min-width: 768px) {
  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>