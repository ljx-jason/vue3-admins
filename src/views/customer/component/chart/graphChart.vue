<script setup lang="ts">
defineOptions({
  name: "GraphChart",
  inheritAttrs: false,
});
const chartOptions = ref();
const props = defineProps({
  cusLabel: {
    type: Boolean,
    default: false,
  },
  activeName: {
    type: String,
    default: "",
  },
  layout: {
    type: String,
    default: "force",
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
watch(
  () => props.activeName,
  () => {
    updateChartOptions(props.chartData);
  }
);

const updateChartOptions = (data: any) => {
  console.log("Updating chart options");

  chartOptions.value = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    legend: {
      x: "center",
      show: true,
    },

    series: [
      {
        type: "graph",
        layout: props.layout,
        symbolSize: 100,

        // edgeSymbol: ["circle", "arrow"],

        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
            },
            formatter: "{c}",
          },
        },
        focusNodeAdjacency: true,
        roam: false,
        categories: data.categories,
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
              if (props.cusLabel) {
                return "{name|" + params.data.name + "}";
              } else {
                return (
                  "{name|" +
                  params.data.name +
                  "}\n{num1|" +
                  "资金总额:" +
                  params.data.num1 +
                  "}\n{num2|" +
                  "负债总额:" +
                  params.data.num2 +
                  "}"
                );
              }
            },
          },
        },
        force: {
          repulsion: 3000,
          layoutAnimation: true,
          edgeLength: 200,
        },
        tooltip: {
          show: false,
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
  width: 100%;
  height: 100%;
}
</style>
