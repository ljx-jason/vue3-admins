<script setup lang="ts">
defineOptions({
  name: "IncreaseDes",
  inheritAttrs: false,
});

defineProps({
  title: {
    type: String,
    default: "",
  },
  isOne: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: "",
  },
  isSlot: {
    type: Boolean,
    default: false,
  },
  v1: {
    type: [Number, String],
    default: "",
  },
  v2: {
    type: [Number, String],
    default: "",
  },
  v3: {
    type: [Number, String],
    default: "",
  },
  v4: {
    type: [Number, String],
    default: "",
  },
  v5: {
    type: [Number, String],
    default: "",
  },
});
</script>

<template>
  <div class="info-increase">
    <div class="flex-box">
      <img class="info-increase-img" :src="img" />
      <div class="basic-info">
        <div class="basic-info-title">{{ title }}</div>
        <div class="basic-info-value">
          <span>{{ v1 }}</span>
        </div>
      </div>
    </div>

    <div v-if="!isSlot" class="des-wrap" :class="isOne ? 'one' : ''">
      <div v-if="v2" class="des">
        <span class="des-title">比上日</span>
        <span
          class="num"
          :class="{
            resStyle: Number(v2) < 0,
          }"
        >
          {{ v2 }}
        </span>
      </div>
      <div v-if="v3" class="des">
        <span class="des-title">比上月</span>
        <span
          class="num"
          :class="{
            resStyle: Number(v3) < 0,
          }"
        >
          {{ v3 }}
        </span>
      </div>
      <div v-if="v4" class="des">
        <span class="des-title">比上季</span>
        <span class="num" :class="{ resStyle: Number(v4) < 0 }">{{ v4 }}</span>
      </div>
      <div v-if="v5" class="des">
        <span class="des-title">比年初</span>
        <span class="num" :class="{ resStyle: Number(v5) < 0 }">{{ v5 }}</span>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style lang="scss" scoped>
.one {
  display: inline-block;
  grid-gap: 0;
}
</style>
