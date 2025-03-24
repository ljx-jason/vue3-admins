<script setup lang="ts">
defineOptions({
  name: "PieChart",
  inheritAttrs: false,
});
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
const chartOptions = ref();
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
    backgroundColor: "#fff",
    color: data.colorList,
    title: {
      text: data.title,
      x: "center", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      y: "center",
      textStyle: {
        color: "#666666",
        fontSize: 14,
        fontWeight: 400,
        textAlign: "center", // 确保文本水平居中
      },
      subtext: data.subtext,
      subtextStyle: {
        fontSize: 14.5,
        color: "#333333",
        fontWeight: "bold",
        textAlign: "center", // 确保副文本水平居中
      },
    },
    tooltip: {
      show: true,
      formatter: " {b}：{c}元  \t{d}%",
    },
    legend: {
      icon: "circle",
      top: "center",
      right: "5%",
      itemHeight: 12,
      itemWidth: 12,
      itemGap: 15,
      y: "20%",
      width: 20,
      padding: [50, 20, 20],
      textStyle: {
        rich: {
          name1: {
            fontSize: 12,
            fontWeight: "bold",
            color: "#333333",
          },
        },
      },
      formatter: function (name: string) {
        let fdata = data.dataList;
        // console.log(data, 'data')
        let total = 0;
        let tarValue;
        for (let i = 0; i < fdata.length; i++) {
          total += fdata[i].value;
          if (fdata[i].name == name) {
            tarValue = fdata[i].value;
          }
        }
        if (total <= 0) {
          total = 1;
        }
        let p = Math.round((tarValue / total) * 100); //占比
        return `${name}  {name1| ${p}%}`;
      },
    },
    series: [
      {
        type: "pie",
        // startAngle:45,
        radius: ["65%", "80%"],
        center: ["50%", "50%"],
        clockwise: true,
        zIndex: 4,
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        labelLine: {
          //label线的长度
          show: false,
        },
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderColor: "#fff",
          },
        },
        data: data.dataList,
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
