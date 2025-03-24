<template>
  <el-config-provider :locale="zhCn" :size="size">
    <!-- 开启水印 -->
    <!-- <el-watermark
      :font="{ color: 'rgba(0, 0, 0, 0.15)' }"
      :content="watermarkEnabled ? defaultSettings.watermarkContent : ''"
      :z-index="9999"
      class="wh-full"
    > -->
    <router-view />
    <!-- </el-watermark> -->
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
// import defaultSettings from "@/settings";
import { SizeEnum } from "@/enums/SizeEnum";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const appStore = useAppStore();
// const settingsStore = useSettingsStore();

const size = computed(() => appStore.size as SizeEnum);
// const watermarkEnabled = computed(() => settingsStore.watermarkEnabled);
</script>
