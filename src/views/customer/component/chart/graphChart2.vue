<script setup lang="ts">
defineOptions({
  name: "GraphChart2",
  inheritAttrs: false,
});
const chartOptions = ref();
const props = defineProps({
  chartData: {
    type: Object,
    default: () => {
      return {
        dataLink: [],
        dataRel: [],
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
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    legend: {
      x: "right",
      show: true,
    },
    grid: {
      top: 80,
      bottom: 0,
      left: 40,
      right: 40,
    },
    tooltip: {
      formatter: function (params: any) {
        console.log(params);
        const { name, num1, num2 } = params.data;
        return name + " - " + "资产总额:" + num1 + " - " + "负债总额:" + num2;
      },
    },
    series: [
      {
        type: "graph",
        layout: "circular",
        symbolSize: 130,

        edgeSymbol: ["", "arrow"],

        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
            },
            formatter: "{c}",
          },
        },
        focusNodeAdjacency: false,
        roam: false,
        categories: [
          {
            name: "正常客户",
            itemStyle: {
              normal: {
                color: "#3E81F2",
              },
            },
          },
          {
            name: "灰名单客户",
            itemStyle: {
              normal: {
                color: "#999999",
              },
            },
          },
          {
            name: "黑名单客户",
            itemStyle: {
              normal: {
                color: "#666666",
              },
            },
          },
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
            rich: {
              name: {
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 20,
                align: "center",
                color: "#fff",
              },
              num1: {
                fontSize: 12,
                lineHeight: 20,
                align: "center",
                color: "#fff",
              },
              num2: {
                fontSize: 12,
                lineHeight: 20,
                align: "center",
                color: "#fff",
              },
            },
            formatter: (params: any) => {
              return (
                "{name|" +
                params.data.name +
                "}\n{num1|" +
                "资产总额:" +
                params.data.num1 +
                "}\n{num2|" +
                "负债总额:" +
                params.data.num2 +
                "}"
              );
            },
          },
        },
        force: {
          repulsion: 1000,
          layoutAnimation: true,
          edgeLength: 200,
        },
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0.3,
          },
        },
        data: data.dataRel,
        links: data.dataLink,
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
  height: 100%;
  width: 100%;
}
</style>
