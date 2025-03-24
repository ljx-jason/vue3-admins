<script setup lang="ts">
defineOptions({
  name: "BarChart",
  inheritAttrs: false,
});
import * as echarts from "echarts"; // 导入 ECharts
const chartOptions = ref();
const props = defineProps({
  grid: {
    type: Object,
    default: () => {
      return {
        top: 50,
        bottom: 40,
        left: 40,
        right: 40,
      };
    },
  },
  title: {
    type: String,
    default: "创利收",
  },
  chartData: {
    type: Object,
    default: () => {
      return {
        XData: [],
        valueData: [],
      };
    },
  },
});
onMounted(() => {
  updateChartOptions(props.chartData);
});

watch(
  () => props.chartData,
  (newVal) => {
    updateChartOptions(newVal);
  },
  { deep: true }
);

const updateChartOptions = (data: any) => {
  console.log("Updating chart options");

  chartOptions.value = {
    grid: props.grid,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    calculable: true,
    legend: {
      show: false,
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          // rotate: 45 // 旋转角度
        },
        data: data.XData,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "",
      },
    ],
    series: [
      {
        name: props.title,
        type: "bar",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#4B87FFFF" },
            { offset: 1, color: "#82BCFFFF" },
          ]),
        },
        label: {
          show: true, // 显示数值
          position: "top", // 数值位置：'top' 或 'inside'
          fontSize: 14, // 数值的字体大小
          color: "#333", // 数值字体颜色
        },
        data: data.valueData,
      },
    ],
  };
};
</script>

<template>
  <ECharts :options="chartOptions" class="Hchart" />
</template>

<style lang="scss" scoped>
.Hchart {
  width: 100%;
  height: 100%;
}
</style>
