<template>
  <div class="logo">
    <div class="w30px h30px">
      <router-link to="/"><img src="@/assets/logo.png" class="w100% h100%" /></router-link>
    </div>
    <div class="title">
      {{ defaultSettings.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultSettings from "@/settings";
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-self: flex-start;
  width: calc($sidebar-width - 25px);

  .title {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    color: $sidebar-logo-text-color;
  }
}
</style>
