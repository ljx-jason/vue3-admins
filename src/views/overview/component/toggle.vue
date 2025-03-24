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
  top: 15%;
  right: 0;
  height: 30%;
  border-radius: 10px;
}

.arrow-left {
  position: fixed;
  top: 120px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  color: #fff;
  cursor: pointer;
  background-color: #3e81f2;
  border: 5px solid #fff;
  border-radius: 50%;
}
</style>
