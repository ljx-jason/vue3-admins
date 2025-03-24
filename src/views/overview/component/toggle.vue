<script setup lang="ts">
defineOptions({
  name: "Toggle",
});

const emit = defineEmits(["changeView"]);

const isHovered = ref(false);
const radio = ref("1");

watch(
  () => radio.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      emit("changeView", newValue);
    }
  }
);

const toggleDrawer = () => {
  isHovered.value = true;
};
</script>

<template>
  <div>
    <div class="circle-container">
      <div class="arrow-left" @click.stop="toggleDrawer">
        <!-- <i class="el-icon-arrow-left"></i> -->
        <span>切换</span>
      </div>
      <el-drawer
        v-model="isHovered"
        :destroy-on-close="true"
        title="请选择视图"
        size="15%"
        :modal="false"
        class="drawer"
      >
        <div>
          <el-radio-group v-model="radio">
            <el-radio value="1" border>网点</el-radio>
            <el-radio value="2" border>个人</el-radio>
          </el-radio-group>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle-container {
  transition: all 0.3s ease;
}

.drawer {
  text-align: left;
}

:deep(.el-drawer.rtl) {
  position: absolute;
  height: 30%;
  right: 0;
  top: 15%;
  border-radius: 10px;
}

.arrow-left {
  position: fixed;
  right: 20px;
  top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border: 5px solid #fff;
  color: #fff;
  border-radius: 50%;
  background-color: #3e81f2;
  cursor: pointer;
}
</style>
