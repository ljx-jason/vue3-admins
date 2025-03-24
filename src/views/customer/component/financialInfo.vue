<script setup lang="ts">
defineOptions({
  name: "FinancialInfo",
  inheritAttrs: false,
});
import Descriptions from "./descriptions.vue";
import LineChart from "./chart/lineChart.vue";
import BarChart from "./chart/barChart.vue";
import PieChart from "./chart/pieChart.vue";
import DesList from "./desList.vue";
// import { mapChartData } from "@/utils/mapChartData";

defineProps({
  custDetail: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
// const cusInfo = computed(() => {
//   return valueDatas;
// });

const loading = ref(false);
const valueDatas = reactive<any>({});
// const valueData = reactive<any>({});
const lineChartData = reactive({
  XData: [],
  valueData: [],
});
const barChartData = reactive({
  XData: [],
  valueData: [],
});
const pieChart1 = reactive({
  title: "",
  dataList: [],
  colorList: [],
  subtext: "",
});
const pieChart2 = reactive({ title: "", dataList: [], colorList: [], subtext: "" });
const pieChart3 = reactive({
  title: "",
  dataList: [],
  colorList: [],
  subtext: "",
});
const astCmprSttnVo = ref<any>({});
const othrBankCtgntLbyInfoVo = ref<any>({});
const desList = [
  {
    title: "我行合同近期到期日期",
    prop: "ourBankContractNearTermMatrtDt",
  },
  {
    title: "他行合同近期到期日期",
    prop: "othrBankContractNearTermMatrtDt",
  },
  // {
  //   title: "他行贷款近期到期日期",
  //   prop: "othrBankLoanRcntExpiDt",
  // },
  {
    title: "抵押余额（元）",
    prop: "mrgtBal",
    company: "万",
  },
  {
    title: "对外担保金额（元）",
    prop: "extnlGuaBal",
    company: "万",
  },
  {
    title: "对外担保户数",
    prop: "extnlGuaHousdNbr",
  },
  {
    title: "保证余额（元）",
    prop: "gnteeBal",
  },
  {
    title: "小贷公司融资家数",
    prop: "smllAgntCorpFncgHmNbr",
  },
  {
    title: "融资家数",
    prop: "fncgHmNbr",
  },

  {
    title: "按揭余额（元）",
    prop: "morBal",
  },
  {
    title: "循环未用信（元）",
    prop: "rvvlNoUseLetter",
  },
  {
    title: "按揭敞口（元）",
    prop: "morExpo",
  },

  {
    title: "信用余额（元）",
    prop: "crBal",
  },
];
const desLists = [
  {
    label: "客户层级",
    prop: "custLvl",
  },
  {
    label: "持有产品数",
    prop: "hldProdNo",
  },
  {
    label: "客户风险等级",
    prop: "custRiskLvl",
  },
  {
    label: "本月月日均AUM规模 (万元)",
    prop: "aumMthAvg",
  },
  {
    label: "AUM余额 (万元)",
    prop: "custAumBal",
  },
  {
    label: "贷款余额 (万元)",
    prop: "loanBal",
  },
  {
    label: "富民豆余额",
    prop: "fmdBal",
  },
  {
    label: "开户年限 (年)",
    prop: "opnPrd",
  },
];
const reqCusValueInfo = () => {
  // loading.value = true
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusFinanceInfoAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     const {
  //       astCmprSttnVo,
  //       custAstDtlVo,
  //       custLbyDtlVo,
  //       othrBankCtgntLbyInfoVo,
  //     } = res.data;
  //     astCmprSttnVo.value = astCmprSttnVo;
  //     Object.assign(pieChart1, {
  //       title: "当前总资产余额",
  //       subtext: custAstDtlVo.crnTotAstDist,
  //       colorList: ["#3E81F2", "#15CE8A", "#FBB907", "#FF8450", "#2ED6EF"],
  //       dataList: [
  //         { value: custAstDtlVo.depBal, name: "存款余额" },
  //         { value: custAstDtlVo.fincBal, name: "理财余额" },
  //         { value: custAstDtlVo.fndBal, name: "基金余额" },
  //         { value: custAstDtlVo.preMet, name: "贵金属" },
  //         { value: custAstDtlVo.insBal, name: "保险" },
  //       ],
  //     })
  //     Object.assign(pieChart2, {
  //       title: "当前存款总余额",
  //       subtext: custAstDtlVo.depBalDist,
  //       colorList: ["#3E81F2", "#BC77F7", "#9BD942", "#E4DD15", "#F85B5B"],
  //       dataList: [
  //         { value: custAstDtlVo.ordyCrn, name: "普通活期" },
  //         { value: custAstDtlVo.ordyFixBal, name: "普通定期" },
  //         { value: custAstDtlVo.dcb, name: "定存宝" },
  //         { value: custAstDtlVo.lgAmtDepRcpt, name: "大额存单" },
  //         { value: custAstDtlVo.ttf, name: "天天富" },
  //       ],
  //     })
  //     Object.assign(pieChart3, {
  //       title: "当前负债总余额",
  //       subtext: custLbyDtlVo.crnTotLbyDist,
  //       colorList: ["#3E81F2", "#2ED6EF", "#A2E7FD", "#C3DFF8"],
  //       dataList: [
  //         { value: custLbyDtlVo.crCardBal, name: "信用卡透支余额" },
  //         { value: custLbyDtlVo.crLoanBal, name: "信用贷款" },
  //         { value: custLbyDtlVo.ofstImpwnLoanBal, name: "抵质押贷款" },
  //         { value: custLbyDtlVo.gnteeLoanBal, name: "保证贷款" },
  //       ],
  //     })
  //     Object.assign(valueData, res.data)
  //     othrBankCtgntLbyInfoVo.value = othrBankCtgntLbyInfoVo;
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};
const reqCusValueInfos = () => {
  // loading.value = true
  // const { custIsn, ctfNo, custTp, } = props.custDetail;
  // cusValueInfoAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     const { aumList, custCntrbtList } = res.data;
  //     Object.assign(lineChartData, mapChartData(aumList))
  //     Object.assign(barChartData, mapChartData(custCntrbtList))
  //     Object.assign(valueDatas, res.data)
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};

onMounted(() => {
  reqCusValueInfo();
  reqCusValueInfos();
});
</script>

<template>
  <div v-loading="loading" class="view-container">
    <div class="part1">
      <div class="top-title">客户分层</div>
      <Descriptions :listInfo="desLists" :dataObg="valueDatas" />
      <div style="width: 100%; height: 300px">
        <div class="chart-title">AUM月日均趋势图</div>
        <LineChart v-if="lineChartData.XData.length > 0" :chartData="lineChartData" />
        <el-empty v-else description="暂无数据"></el-empty>
      </div>
    </div>
    <div class="part2">
      <div class="top-title">客户贡献</div>
      <div class="part2-content">
        <div class="part2-content-left">
          <el-card shadow="hover" class="ins-des" :class="{ riseStyle: Number(valueDatas.insCntrbt) > 0 }">
            <div class="title">代理保险销售手续费收入</div>
            <div class="num">{{ valueDatas.insCntrbt }}</div>
          </el-card>
          <el-card shadow="hover" class="ins-des" :class="{ riseStyle: Number(valueDatas.preMetCntrbt) > 0 }">
            <div class="title">代理贵金属销售手续费收入</div>
            <div class="num">{{ valueDatas.preMetCntrbt }}</div>
          </el-card>
          <el-card shadow="hover" class="ins-des" :class="{ riseStyle: Number(valueDatas.fndCntrbt) > 0 }">
            <div class="title">代理基金销售手续费收入</div>
            <div class="num">{{ valueDatas.fndCntrbt }}</div>
          </el-card>
        </div>
        <div class="part2-content-right">
          <div class="chart-title">近三年财富业务中收创利</div>
          <div style="width: 100%; height: 100%">
            <BarChart v-if="barChartData.XData.length > 0" :chartData="barChartData" />
            <el-empty v-else description="暂无数据"></el-empty>
          </div>
        </div>
      </div>
    </div>
    <div class="part">
      <div class="top-title">资产信息</div>
      <div class="part1-content">
        <div class="part1-content-1">
          <div class="info-increase">
            <div class="flex-box">
              <img class="info-increase-img" src="@/assets/customer/2.png" />
              <div class="basic-info">
                <div class="basic-info-title">总资产余额 (单位：万元)</div>
                <div class="basic-info-value">
                  <span>{{ astCmprSttnVo.totAstBal }}</span>
                </div>
              </div>
            </div>

            <div class="des-wrap">
              <div class="des">
                <span class="des-title">比上日</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.balRatnLastDay) < 0,
                }">
                  {{ astCmprSttnVo.balRatnLastDay }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比上月</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.balRatnLastMth) < 0,
                }">
                  {{ astCmprSttnVo.balRatnLastMth }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比上季</span>
                <span class="num" :class="{ resStyle: Number(astCmprSttnVo.balRatnUprQtr) < 0 }">
                  {{ astCmprSttnVo.balRatnUprQtr }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比年初</span>
                <span class="num" :class="{ resStyle: Number(astCmprSttnVo.balCompLastYr) < 0 }">
                  {{ astCmprSttnVo.balCompLastYr }}
                </span>
              </div>
            </div>
          </div>
          <div class="info-increase">
            <div class="flex-box">
              <img class="info-increase-img" src="@/assets/customer/1.png" />
              <div class="basic-info">
                <div class="basic-info-title">总资产日均 (单位：万元)</div>
                <div class="basic-info-value">
                  <span>{{ astCmprSttnVo.totAstAvPerDay }}</span>
                </div>
              </div>
            </div>

            <div class="des-wrap">
              <div class="des">
                <span class="des-title">比上日</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.avPerDayRatnLastDay) < 0,
                }">
                  {{ astCmprSttnVo.avPerDayRatnLastDay }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比上月</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.avPerDayRatnLastMth) < 0,
                }">
                  {{ astCmprSttnVo.avPerDayRatnLastMth }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比上季</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.avPerDayRatnUprQtr) < 0,
                }">
                  {{ astCmprSttnVo.avPerDayRatnUprQtr }}
                </span>
              </div>
              <div class="des">
                <span class="des-title">比年初</span>
                <span class="num" :class="{
                  resStyle: Number(astCmprSttnVo.avPerDayCompLastYr) < 0,
                }">
                  {{ astCmprSttnVo.avPerDayCompLastYr }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="part1-content-1">
          <div class="chart-wrap">
            <PieChart v-if="pieChart1.dataList.length > 0" :chartData="pieChart1" />
            <el-empty v-else description="暂无数据"></el-empty>
          </div>
          <div class="chart-wrap">
            <PieChart v-if="pieChart2.dataList.length > 0" :chartData="pieChart2" />
            <el-empty v-else description="暂无数据"></el-empty>
          </div>
        </div>
      </div>
    </div>
    <div class="part">
      <div class="top-title">负债信息</div>
      <div class="chart-wrap" style="width: 50%">
        <PieChart v-if="pieChart3.dataList.length > 0" ele="custLbyDtlVo" :chartData="pieChart3" />
        <el-empty v-else description="暂无数据"></el-empty>
      </div>
    </div>
    <div class="part">
      <div class="top-title">他行或有负债</div>
      <DesList :desList="desList" :dataObj="othrBankCtgntLbyInfoVo" labelWidth="200px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  text-align: left;

  .part1-content {
    &-1 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }
  }

  .chart-wrap {
    height: 300px;
  }
}

.chart-title {
  margin-top: 30px;
  text-align: left;
}

.part-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.part2 {
  &-content {
    display: flex;
    justify-content: space-between;

    &-left {
      width: 25%;

      .ins-des {
        margin-top: 20px;
        // padding: 20px;
        color: #fff;
        background-color: #f8f8f8;

        .num {
          font-size: 22px;
          font-weight: bold;
          color: #333333;
        }

        .title {
          margin-bottom: 3px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
        }
      }

      .riseStyle {
        background-color: #f8f8f8;
      }
    }

    &-right {
      width: 70%;
    }
  }
}

.chart-title {
  text-align: center;
}
</style>
