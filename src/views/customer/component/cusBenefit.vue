<script setup lang="ts">
defineOptions({
  name: "CusBenefit",
  inheritAttrs: false,
});
const props = defineProps({
  custDetail: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
import BarChart from "./chart/barChart.vue";
// import { mapChartData } from "@/utils/mapChartData";
import CostList from "./integral/costList.vue";
import GetList from "./integral/getList.vue";

const loading = ref(false);
const barChartData = reactive({
  XData: [],
  valueData: [],
});
const valueInfo = reactive<any>({});
const activeName = ref("0");

onMounted(() => {
  reqCusValueInfo();
});

const reqCusValueInfo = () => {
  // loading.value = true
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusEquityAPI({ custIsn, ctfNo, custTp }).then((res: any) => {
  //   if (res.code == 0) {
  //     const { pointList } = res.data;
  //     if (pointList && pointList.length > 0) {
  //       Object.assign(barChartData, mapChartData(pointList))
  //     }
  //     Object.assign(valueInfo, res.data)
  //   }
  // })
};
</script>

<template>
  <div v-loading="loading" class="view-container">
    <div class="part part1">
      <div class="part-left">
        <div class="top-title">富民豆生成情况(单位: 个)</div>
        <div class="left-wrap">
          <div class="left-wrap-item chart-wrap">
            <BarChart v-if="barChartData.XData.length > 0" title="富民豆" :chartData="barChartData" :grid="{
              top: 20,
              bottom: 20,
              left: 50,
              right: 10,
            }" />
            <el-empty v-else description="暂无数据"></el-empty>
          </div>
        </div>
      </div>
      <div class="part-right">
        <div class="top-title">客户富民豆</div>
        <div class="content-second">
          <div>
            <div class="des-title">
              <img src="@/assets/customer/3.png" />
              当前富民豆
            </div>
            <div class="num">{{ valueInfo?.eqtySttsVo?.unUse }}</div>
          </div>
          <div>
            <div class="des-title">
              <img src="@/assets/customer/4c.png" />
              本月即将过期
            </div>
            <div class="num">{{ valueInfo?.eqtySttsVo?.acmGet }}</div>
          </div>
          <div>
            <div class="des-title">
              <img src="@/assets/customer/5c.png" />
              总累计已消费
            </div>
            <div class="num">{{ valueInfo?.eqtySttsVo?.acmUse }}</div>
          </div>
          <div>
            <div class="des-title">
              <img src="@/assets/customer/4c.png" />
              总累计已过期
            </div>
            <div class="num">{{ valueInfo?.eqtySttsVo?.odueUnUse }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="part2">
      <el-tabs v-model="activeName">
        <el-tab-pane label="生成历史">
          <GetList :custDetail="props.custDetail" />
        </el-tab-pane>
        <el-tab-pane label="兑换历史">
          <CostList :custDetail="props.custDetail" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  .part1 {
    display: flex;
    grid-gap: 20px;
    justify-content: space-between;

    .part-left {
      display: flex;
      flex-direction: column;
      width: 60%;

      .left-wrap {
        display: flex;
        flex: 1;
        grid-gap: 10px;
        align-items: center;

        .chart-wrap {
          flex: 1;
          height: 100%;
        }

        :deep(.info-increase) {
          padding: 20px 10px;

          .basic-info-title {
            font-size: 13px;
          }
        }
      }
    }

    .part-right {
      flex: 1;
      margin-left: 20px;

      .content-second {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        padding: 20px;
        background-color: #f0f4fa;

        >div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100px;
          padding: 20px;
          color: #000;
          text-align: left;
          background-color: #fff;
          border-radius: 8px;

          .des-title {
            // margin-top: 20px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;

            >img {
              width: 16px;
              height: 14px;
              margin-right: 3px;
            }
          }

          .num {
            padding-left: 16px;
          }
        }
      }
    }
  }

  .part2 {
    margin-top: 40px;
  }
}
</style>
