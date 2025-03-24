<script setup lang="ts">
defineOptions({
  name: "Descriptions",
  inheritAttrs: false,
});
interface ListInfoItem {
  prop: string; // 数据字段名
  label: string; // 字段标签
}
defineProps<{
  dataObg: Record<string, any>; // 数据对象，键值对形式
  listInfo: ListInfoItem[]; // 使用接口定义数组类型
}>();
</script>

<template>
  <div class="container">
    <div v-for="item in listInfo" :key="item.prop" class="tab-item">
      <div class="label">{{ item.label }}</div>
      <div class="value">{{ dataObg[item.prop] }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 定义4列，每列平均分配剩余空间 */
  grid-gap: 20px;
  margin-top: 20px;

  /* 设置列之间的间隙为20px */
  .tab-item {
    padding: 15px;
    background-color: #f8f8f8;
    border-radius: 6px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      /* 放大效果 */
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
      /* 渐进的阴影 */
    }

    .label {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
    }

    .value {
      margin-top: 5px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }
  }
}
</style>
