<template>
  <div class="login">
    <!-- 登录页内容 -->
    <div class="login-container w-full">
      <div class="login-img w-60% pl-6 pr-6">
        <img src="@/assets/images/login.svg" class="w-full h-full" alt="login" />
      </div>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginRules">
          <div class="form-title">
            <h2 class="flex-center">
              <img src="@/assets/logo.png" class="w40px h40px mr15px" alt="logo" />
              {{ defaultSettings.title }}
            </h2>
          </div>

          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <User />
              </el-icon>
              <el-input ref="username" v-model="loginFormData.username" placeholder="请输入用户名" name="username"
                class="h-[40px]" />
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-tooltip :visible="isCapslock" content="大写已锁定" placement="right">
            <el-form-item prop="password">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <Lock />
                </el-icon>
                <el-input v-model="loginFormData.password" placeholder="请输入密码" type="password" name="password"
                  class="h-[40px] pr-2" show-password @keyup="checkCapslock" @keyup.enter="handleLoginSubmit" />
              </div>
            </el-form-item>
          </el-tooltip>

          <!-- 登录按钮 -->
          <el-button :loading="loading" type="primary" size="large" class="w-full mt-10px"
            @click.prevent="handleLoginSubmit">
            登录
          </el-button>
        </el-form>
        <div class="tips">
          * 温馨提示：建议使用谷歌、Microsoft Edge，版本 80 及以上浏览器，360浏览器请使用极速模式
        </div>
      </div>
    </div>

    <!-- 登录页底部 -->
    <!-- <div class="login-footer">zjjzfy</div> -->
  </div>
</template>

<script setup lang="ts">
import { LocationQuery, useRoute } from "vue-router";

import { type LoginFormData } from "@/api/auth";
import router from "@/router";

import type { FormInstance } from "element-plus";

import defaultSettings from "@/settings";

import { useUserStore, useDictStore } from "@/store";

const userStore = useUserStore();
// const settingsStore = useSettingsStore();
const dictStore = useDictStore();

const route = useRoute();
const loginFormRef = ref<FormInstance>();

const loading = ref(false); // 按钮 loading 状态
const isCapslock = ref(false); // 是否大写锁定

const loginFormData = ref<LoginFormData>({
  username: "admin",
  password: "123456",
  captchaKey: "",
  captchaCode: "",
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入用户名",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码",
      },
      {
        min: 6,
        message: "密码长度不能小于6位",
        trigger: "blur",
      },
    ],
  };
});

// 登录
async function handleLoginSubmit() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginFormData.value)
        .then(async () => {
          await userStore.getUserInfo();
          // 需要在路由跳转前加载字典数据，否则会出现字典数据未加载完成导致页面渲染异常
          await dictStore.loadDictionaries();
          // 跳转到登录前的页面
          const { path, queryParams } = parseRedirect();
          router.push({ path: path, query: queryParams });
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

/**
 * 解析 redirect 字符串 为 path 和  queryParams
 *
 * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;
  const redirect = (query.redirect as string) ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}

// 检查输入大小写
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;

  .login-container {
    display: flex;
    align-items: center;
    max-width: 900px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: var(--el-box-shadow-light);

    .login-img {
      background-image: linear-gradient(to bottom right, #60a5fa, #bfdbfe);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 460px;
    padding: 0 50px;
    background-color: #fff;

    @media (width <=460px) {
      width: 100%;
      padding: 20px;
    }

    .form-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 20px;
      text-align: center;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .captcha-img {
      height: 48px;
      cursor: pointer;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    .third-party-login {
      display: flex;
      justify-content: center;
      width: 100%;
      color: var(--el-text-color-secondary);

      *:not(:first-child) {
        margin-left: 20px;
      }

      .icon {
        cursor: pointer;
      }
    }

    .tips {
      margin-top: 30px;
      font-family:
        Inter, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
        "微软雅黑", Arial, sans-serif;
      font-size: 12px;
      color: #a8abb2;
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    color: #a8abb2;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
