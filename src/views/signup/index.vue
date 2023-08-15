<template>
    <div class="view-account">
      <div class="view-account-header"></div>
      <div class="view-account-container">
        <div class="view-account-top">
          <div class="view-account-top-desc">Register</div>
        </div>
        <n-alert
          v-if="hasSignUpError"
          title="Sign Up Error!"
          type="error"
          class="login-alert"
          closable
          :bordered="false"
        >Sign Up Error
      <ul>
        <li v-if="!user.email">Email is required</li>    
        <li v-if="user.password && user.password.length < 6">Password must be length of 6</li>    
      </ul></n-alert>
        <div class="view-account-form">
          <n-form ref="formRef" label-placement="left" size="large" :model="user" :rules="rules">
            <n-form-item path="email">
              <n-input v-model:value="user.email" placeholder="Email">
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <MailOpenOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="name">
              <n-input v-model:value="user.name" placeholder="Name">
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
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
                type="info"
                @click="signUp"
                size="large"
                :loading="loading"
                block
              >Sign Up</n-button>
            </n-form-item>
            <n-form-item>
              <n-button
                type="primary"
                @click="$router.push('login')"
                size="large"
                :loading="loading"
                block
              >Login</n-button>
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
        hasSignUpError: false,
        user: {
          email: null,
          name: null,
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
      signUp () {
        this.hasSignUpError = false;
        if (this.user.email !== '' && this.user.password.length >= 6) {
          this.$auth
            .signup(this.user)
            .then(() => {
              this.$router.push({
                name: "home"
              });
            })
            .catch(() => {
              this.hasSignUpError = true;
            });
        } else {
          this.hasSignUpError = true;
        }
      },
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