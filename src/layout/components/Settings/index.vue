<template>
  <el-drawer v-model="settingsVisible" size="300" :title="$t('settings.project')">
    <el-divider>主题</el-divider>

    <el-divider>接口</el-divider>

    <div class="py-1 flex-x-between">
      <span class="text-xs">主题颜色</span>
      <ThemeColorPicker v-model="settingsStore.themeColor" @update:model-value="changeThemeColor" />
    </div>

    <div class="py-1 flex-x-between">
      <span class="text-xs">{{ $t("settings.tagsView") }}</span>
      <el-switch v-model="settingsStore.tagsView" />
    </div>

    <div class="py-1 flex-x-between">
      <span class="text-xs">{{ $t("settings.sidebarLogo") }}</span>
      <el-switch v-model="settingsStore.sidebarLogo" />
    </div>

    <div class="py-1 flex-x-between">
      <span class="text-xs">{{ $t("settings.watermark") }}</span>
      <el-switch v-model="settingsStore.watermarkEnabled" />
    </div>
    <div class="py-1 flex-x-between">
      <span class="text-xs">{{ $t("settings.sidebarColorScheme") }}</span>
      <el-radio-group v-model="sidebarColor" @change="changeSidebarColor">
        <el-radio :value="SidebarColorEnum.CLASSIC_BLUE">{{ $t("settings.classicBlue") }}</el-radio>
        <el-radio :value="SidebarColorEnum.MINIMAL_WHITE">
          {{ $t("settings.minimalWhite") }}
        </el-radio>
      </el-radio-group>
    </div>

    <el-divider>{{ $t("settings.navigation") }}</el-divider>

    <LayoutSelect v-model="settingsStore.layout" @update:model-value="changeLayout" />
  </el-drawer>
</template>

<script setup lang="ts">
import { LayoutEnum } from "@/enums/LayoutEnum";
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarColor = ref(settingsStore.sidebarColorScheme);

const settingsVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set() {
    settingsStore.settingsVisible = false;
  },
});

/**
 * 更改侧边栏颜色
 *
 * @param val 颜色方案名称
 */
const changeSidebarColor = (val: any) => {
  settingsStore.changeSidebarColor(val);
};
/**
 *  切换主题颜色
 *
 * @param color 颜色
 */
function changeThemeColor(color: string) {
  settingsStore.changeThemeColor(color);
}

/**
 * 切换布局
 *
 * @param layout 布局  LayoutEnum
 */
function changeLayout(layout: LayoutEnum) {
  settingsStore.changeLayout(layout);
  if (layout === LayoutEnum.MIX) {
    route.name && againActiveTop(route.name as string);
  }
}

/**
 * 重新激活顶部菜单
 *
 * @param routeName 路由名称
 */
function againActiveTop(routeName: string) {
  const parent = findOutermostParent(permissionStore.routes, routeName);
  if (appStore.activeTopMenuPath !== parent.path) {
    appStore.activeTopMenu(parent.path);
  }
}

/**
 * 查找最外层父级
 *
 * @param tree 树形数据
 * @param findName 查找的名称
 */
function findOutermostParent(tree: any[], findName: string) {
  let parentMap: any = {};

  function buildParentMap(node: any, parent: any) {
    parentMap[node.name] = parent;

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        buildParentMap(node.children[i], node);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    buildParentMap(tree[i], null);
  }

  let currentNode = parentMap[findName];
  while (currentNode) {
    if (!parentMap[currentNode.name]) {
      return currentNode;
    }
    currentNode = parentMap[currentNode.name];
  }

  return null;
}
</script>

<style lang="scss" scoped></style>
