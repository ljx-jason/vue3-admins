<script setup lang="ts">
defineOptions({
  name: "LineChart",
  inheritAttrs: false,
});
const chartOptions = ref();
const props = defineProps({
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
    title: {
      show: false,
      text: "AUM趋势图",
      textStyle: { color: "#303331", fontSize: 16 },
      top: "2%",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      right: "5%", //设置适当调整工具框的left位置
      top: 3,
    },
    grid: {
      top: "middle",
      left: "3%",
      right: "4%",
      bottom: "3%",
      height: "80%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.XData,
      axisLine: {
        lineStyle: {
          color: "rgba(193, 207, 220, 1)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "rgba(0, 0, 0, 1)",
        },
      },
    },
    yAxis: [
      {
        name: "",
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(0, 0, 0, 1)",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#cdd5e2",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(193, 207, 220, 1)",
          },
        },
      },
    ],
    series: [
      {
        name: "AUM",
        type: "line",
        data: data.valueData,
        symbolSize: 9, //标记的大小
        lineStyle: {
          normal: {
            width: 2,
            color: "#3E81F2",
            shadowColor: "rgba(22, 161, 250, 0.5)",
            shadowBlur: 10,
            shadowOffsetY: 7,
          },
        },
        itemStyle: {
          normal: {
            color: "rgba(22, 161, 250, 1)",
          },
        },
        smooth: true,
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
