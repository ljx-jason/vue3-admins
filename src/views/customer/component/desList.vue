<script setup lang="ts">
defineOptions({
  name: "DesList",
  inheritAttrs: false,
});

// 定义 desList 中每个元素的结构
interface DesListItem {
  prop: string; // 对应 dataObj 的键
  title: string; // 显示的标题
}
// 定义 Props 的类型
interface Props {
  dataObj: Record<string, any>; // 动态键值对
  desList: DesListItem[]; // desList 类型
  labelWidth?: string; // 可选的字符串类型
}

// 使用 withDefaults 为 Props 设置默认值
withDefaults(defineProps<Props>(), {
  dataObj: () => ({}), // 默认为空对象
  desList: () => [], // 默认为空数组
  labelWidth: "120px", // 默认宽度
});
</script>

<template>
  <div class="des-list">
    <div v-for="item in desList" :key="item.prop" class="des-list-item">
      <span class="des-list-title" :style="`width:${labelWidth}`">{{ item.title }}</span>
      <span class="des-list-value">{{ dataObj[item.prop] }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.des-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;

  &-item {
    display: flex;
    width: calc(100% / 3 - 20px);
    margin-bottom: 20px;

    .des-list-title {
      font-size: 14px;
      font-weight: 400;
      color: #666666;

      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      &::before {
        margin-right: 5px;

        font-size: 14px;
        color: #cccccc;
        content: "●";
      }
    }

    .des-list-value {
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      // margin-left: 5px;
    }
  }
}
</style>
