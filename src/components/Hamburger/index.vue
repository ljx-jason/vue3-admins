<template>
  <div class="hamburger-wrapper" @click="toggleClick">
    <div :class="['i-svg:collapse', { hamburger: true, 'is-active': isActive }, 'hamburger--white']" />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store";
// import { LayoutEnum } from "@/enums/LayoutEnum";

defineProps({
  isActive: { type: Boolean, required: true },
});

const emit = defineEmits(["toggleClick"]);

const settingsStore = useSettingsStore();
// const layout = computed(() => settingsStore.layout);

function toggleClick() {
  emit("toggleClick");
}
</script>

<style scoped lang="scss">
.hamburger-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  cursor: pointer;

  .hamburger {
    vertical-align: middle;
    transform: scaleX(-1);
    transition: transform 0.3s ease;

    &--white {
      color: #fff;
    }

    &.is-active {
      transform: scaleX(1);
    }
  }
}
</style>
