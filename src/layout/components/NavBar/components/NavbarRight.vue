<template>
  <div class="navbar__right navbar__right--white">
    <!-- <Fullscreen /> -->

    <!-- 用户头像（个人中心、注销登录等） -->
    <el-dropdown trigger="click">
      <div class="user-profile">
        <img class="user-profile__avatar" :src="avatar" />
        <span class="user-profile__name mr5px">{{ userStore.userInfo.username }}</span>
        <el-icon>
          <ArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleBox('ACCOUNT')">
            <el-icon>
              <User />
            </el-icon>
            用户信息
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleBox('PASSWORD')">
            <el-icon>
              <EditPen />
            </el-icon>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <el-icon>
              <SwitchButton />
            </el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置面板 -->
    <!-- <div v-if="defaultSettings.showSettings" @click="settingStore.settingsVisible = true">
      <div class="i-svg:setting" />
    </div> -->
  </div>

  <el-dialog v-model="dialog.visible" :title="dialog.title" :width="500">
    <!-- 修改密码 -->
    <el-form v-if="dialog.type === 'PASSWORD'" ref="passwordChangeFormRef" :model="passwordChangeForm"
      :rules="passwordChangeRules" label-position="top" style="width: 90%; margin: 0 auto">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="passwordChangeForm.oldPassword" type="password" show-password prefix-icon="Unlock"
          placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <strength-meter v-model="passwordChangeForm.newPassword" placeholder="请输入新密码 6-20 数字+字母" autocomplete="off"
          :maxLength="20" :minLength="6" @score="handlePassScore">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Unlock />
            </el-icon>
          </template>
        </strength-meter>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordChangeForm.confirmPassword" placeholder="请确认密码" type="password" show-password
          prefix-icon="Unlock" />
      </el-form-item>
    </el-form>
    <!-- 用户信息 -->
    <el-descriptions v-else :column="1" border label-width="150">
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <User />
          </el-icon>
          用户名
        </template>
        {{ userProfile.username }}
        <!-- <el-icon v-if="userProfile.gender === 1" class="align-middle color-blue">
          <Male />
        </el-icon>
        <el-icon v-else class="align-middle color-pink">
          <Female />
        </el-icon> -->
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Monitor />
          </el-icon>
          柜员号
        </template>
        {{ userProfile.userId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="i-svg:tree" />
          归属机构
        </template>
        {{ userProfile.orgName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <School />
          </el-icon>
          机构号
        </template>
        {{ userProfile.orgNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Discount />
          </el-icon>
          权限
        </template>
        {{ permiss(userProfile.permissions) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="i-svg:role" />
          角色
        </template>
        {{ userProfile.roleNames ? userProfile.roleNames.join(",") : "-" }}
      </el-descriptions-item>
    </el-descriptions>
    <template v-if="dialog.type === 'PASSWORD'" #footer>
      <span class="dialog-footer">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
// import defaultSettings from "@/settings";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { useAppStore, useSettingsStore, useUserStore, useTagsViewStore } from "@/store";
import UserAPI, { PasswordChangeForm } from "@/api/system/user";
import avatar from "@/assets/images/ava.png";

const StrengthMeter = defineAsyncComponent(() => import("@/components/StrengthMeter/index.vue"));

const appStore = useAppStore();
// const settingStore = useSettingsStore();
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();

const route = useRoute();
const router = useRouter();
// const isDesktop = computed(() => appStore.device === DeviceEnum.DESKTOP);

// 密码强度得分
const score = ref("0");

const userProfile = computed(() => userStore.userInfo);
const permiss = computed(() => (val: any) => {
  if (val) {
    if (val.includes("HEAD")) {
      return "总行";
    } else if (val.includes("BRANCH")) {
      return "支行";
    } else if (val.includes("PRESENT")) {
      return "网点";
    } else if (val.includes("PERSONAL")) {
      return "客户经理";
    } else {
      return "";
    }
  } else {
    return "-";
  }
});

const dialog = reactive({
  visible: false,
  title: "修改密码",
  type: "ACCOUNT",
});

// 处理密码强度得分变化事件
const handlePassScore = (e) => {
  score.value = e;
};

const passwordChangeForm = reactive<PasswordChangeForm>({});
const passwordChangeFormRef = ref();
// 修改密码校验规则
const passwordChangeRules = reactive({
  oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "用户密码长度必须介于 6 和 20 之间",
      trigger: "blur",
    },
    {
      validator: (_rule, _value, callback) => {
        if (Number(score.value) < 2) {
          callback("密码强度太低");
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  confirmPassword: [{ required: true, message: "请再次输入新密码", trigger: "blur" }],
});

// 打开弹框
function handleBox(type: string) {
  dialog.type = type;
  dialog.visible = true;
  switch (type) {
    case "ACCOUNT":
      dialog.title = "用户信息";
      break;
    case "PASSWORD":
      dialog.title = "修改密码";
      break;
  }
}

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (!passwordChangeFormRef.value?.validate()) return;
  await passwordChangeFormRef.value?.validate(
    (valid: boolean) => {
      if (valid) {
        if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
          ElMessage.error("两次输入的密码不一致");
          return;
        }
        UserAPI.changePassword(passwordChangeForm).then(() => {
          ElMessage.success("密码修改成功");
          dialog.visible = false;
        });
      }
    }
  );
};

/**
 * 打开个人中心页面
 */
// function handleProfileClick() {
//   router.push({ name: "Profile" });
// }

/**
 * 注销登出
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false,
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<style lang="scss" scoped>
.navbar__right {
  display: flex;
  align-items: center;
  justify-content: center;

  &>* {
    display: inline-block;
    min-width: 40px;
    height: $navbar-height;
    line-height: $navbar-height;
    color: #fff;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgb(0 0 0 / 8%);
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 13px;

    &__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    &__name {
      margin-left: 10px;
    }
  }
}

.layout-top .navbar__right--white>*,
.layout-mix .navbar__right--white>* {
  color: #fff;
}

.dark .navbar__right>*:hover {
  color: #ccc;
}
</style>
