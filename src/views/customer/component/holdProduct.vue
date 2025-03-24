<script setup lang="ts">
defineOptions({
  name: "HoldProduct",
  inheritAttrs: false,
});
defineProps({
  custDetail: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
import high from "@/assets/customer/high.png";
import mid from "@/assets/customer/mid.png";
import low from "@/assets/customer/low.png";
import img3 from "@/assets/customer/3c.png";
import img4 from "@/assets/customer/4.png";
import img5 from "@/assets/customer/5.png";
import img6 from "@/assets/customer/6.png";
import img7 from "@/assets/customer/7.png";
import img8 from "@/assets/customer/8.png";
import img9 from "@/assets/customer/9.png";
import img10 from "@/assets/customer/10.png";
import img11 from "@/assets/customer/11.png";
import img12 from "@/assets/customer/12.png";
import IncreaseDes from "./increaseDes.vue";

const router = useRouter();
const loading = ref(false);
const fndBal = ref(0);
const preMet = ref(0);
const depCmprSttnVo = reactive<any>({});
const depDtlInfoVoList = reactive<any>([]);
const loanAcctDtlVoList = reactive<any>([]);

const custLbyDtlVo = ref<any>({});
const fincSttnVo = ref<any>({});
const fincDtlVoList = ref([]);
const fndDtlVoList = ref([]);
const preMetDtlVoList = ref([]);
const relLvlProdDtlVoList = ref([]);
const depProdInfoVoList = ref([]);
const fndProdInfoVoList = ref([]);
const fincProdInfoVoList = ref([]);
const insProdInfoVoList = ref([]);
// const preMetProdInfoVoList = ref([]);

onMounted(() => {
  reqCusValueInfo();
  reqCusValueInfos();
});
const reqCusValueInfo = () => {
  // loading.value = true
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusHoldProdAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo,
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     const {
  //       // hldProdDtlVo,
  //       depCmprSttnVo,
  //       depDtlInfoVoList,
  //       custLbyDtlVo,
  //       loanAcctDtlVoList,
  //       fincSttnVo,
  //       fincDtlVoList,
  //       fincBal,
  //       fndDtlVoList,
  //       fndBal,
  //       preMet,
  //       preMetDtlVoList,
  //       relLvlProdDtlVoList,
  //     } = res.data;
  //     Object.assign(depDtlInfoVoList, res.data?.depDtlInfoVoList.filter((item: any) => item.bal > 0))
  //     Object.assign(depCmprSttnVo, res.data?.depCmprSttnVo)
  //     Object.assign(custLbyDtlVo.value, res.data?.custLbyDtlVo)
  //     Object.assign(loanAcctDtlVoList, res.data?.loanAcctDtlVoList)
  //     Object.assign(fincSttnVo.value, res.data?.fincSttnVo)
  //     Object.assign(fincDtlVoList.value, res.data?.fincDtlVoList)
  //     Object.assign(fincBal.value, res.data?.fincBal)
  //     Object.assign(fndDtlVoList.value, res.data?.fndDtlVoList)
  //     Object.assign(fndBal.value, res.data?.fndBal)
  //     Object.assign(preMet.value, res.data?.preMet)
  //     Object.assign(preMetDtlVoList.value, res.data?.preMetDtlVoList)
  //     Object.assign(relLvlProdDtlVoList.value, res.data?.relLvlProdDtlVoList)
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};
const reqCusValueInfos = () => {
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusProdRecommendAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo,
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     Object.assign(depProdInfoVoList.value, res.data?.depProdInfoVoList)
  //     Object.assign(fndProdInfoVoList.value, res.data?.fndProdInfoVoList)
  //     Object.assign(fincProdInfoVoList.value, res.data?.fincProdInfoVoList)
  //     Object.assign(insProdInfoVoList.value, res.data?.insProdInfoVoList)
  //     Object.assign(preMetProdInfoVoList.value, res.data?.preMetProdInfoVoList)
  //   }
  // })
};
const handleClick = (row: any, type: string) => {
  if (type == "存款") {
    router.push({
      path: "/depositProducts",
      query: {
        prodNo: row.prodNo,
      },
    });
  } else if (type == "理财") {
    router.push({
      path: "/financialProducts",
      query: {
        prodNo: row.prodIdentn,
      },
    });
  } else if (type == "基金") {
    router.push({
      path: "/fundProducts",
      query: {
        prodNo: row.prodNo,
      },
    });
  } else if (type == "保险") {
    router.push({
      path: "/insuranceProducts",
      query: {
        prodNo: row.prodNo,
      },
    });
  } else if (type == "贵金属") {
    router.push({
      path: "/nobleMetal",
      query: {
        prodNo: row.prodCode,
      },
    });
  }
};
</script>

<template>
  <div v-loading="loading" class="view-container">
    <div class="part">
      <div class="top-title">存款产品</div>
      <div class="increase-wrap">
        <IncreaseDes title="余额(元)" :img="img3" :v1="depCmprSttnVo.depBal" :v2="depCmprSttnVo.balRatnLastDay"
          :v3="depCmprSttnVo.balRatnLastMth" :v4="depCmprSttnVo.balRatnUprQtr" :v5="depCmprSttnVo.balCompLastYr" />
        <IncreaseDes :isOne="true" title="月日均(元)" :img="img4" :v1="depCmprSttnVo.depMthAvg"
          :v3="depCmprSttnVo.mthAvgRatnLastMth" />
        <IncreaseDes title="近6个月日均(元)" :img="img5" :v1="depCmprSttnVo.rcnt6mthAvg" />
      </div>
      <div class="increase-wrap">
        <IncreaseDes title="年日均(元)" :img="img6" :v1="depCmprSttnVo.depYearAvg" :v2="depCmprSttnVo.yearAvgRatnLastDay"
          :v3="depCmprSttnVo.yearAvgRatnLastMth" :v4="depCmprSttnVo.yearAvgRatnUprQtr"
          :v5="depCmprSttnVo.yearAvgCompLastYr" />
        <IncreaseDes :isOne="true" title="季度日均(元)" :img="img7" :v1="depCmprSttnVo.depQuarterAvg"
          :v4="depCmprSttnVo.quarterAvgRatnUprQtr" />
        <IncreaseDes title="近12个月日均(元)" :img="img8" :v1="depCmprSttnVo.rcnt12mthAvg" />
      </div>
      <el-table ref="multipleTable" :data="depDtlInfoVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="acctTp" label="账户类型"></el-table-column>
        <el-table-column prop="rate" label="利率"></el-table-column>
        <el-table-column prop="opnOrg" min-width="150" label="开户机构"></el-table-column>
        <el-table-column prop="cardId" label="卡号/账号">
          <template #default="scope">
            <div>
              {{ scope.row.cardId || scope.row.acctNo || "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bal" label="余额(元)"></el-table-column>
        <el-table-column prop="opnDt" label="开户日期"></el-table-column>
        <el-table-column prop="matrtDt" label="到期日期"></el-table-column>
      </el-table>
    </div>
    <div class="part dk">
      <div class="top-title">贷款产品</div>
      <IncreaseDes title="有效合同金额(元)" :img="img9" :isSlot="true" :v1="custLbyDtlVo.loanBal">
        <template #default>
          <div class="des-wrap des-wrap2">
            <div class="des">
              <span class="des-title">贷款余额(元)</span>
              <span class="num">{{ custLbyDtlVo.loanBal }}</span>
            </div>
            <div class="des">
              <span class="des-title">按揭贷款(元)</span>
              <span class="num">{{ custLbyDtlVo.morLoanBal }}</span>
            </div>
            <div class="des">
              <span class="des-title">抵押贷款(元)</span>
              <span class="num">{{ custLbyDtlVo.ofstImpwnLoanBal }}</span>
            </div>
            <div class="des">
              <span class="des-title">信用卡透支余额(元)</span>
              <span class="num">{{ custLbyDtlVo.crCardBal }}</span>
            </div>
            <div class="des">
              <span class="des-title">信用贷款(元)</span>
              <span class="num">{{ custLbyDtlVo.crLoanBal }}</span>
            </div>
            <div class="des">
              <span class="des-title">线上贷款(元)</span>
              <span class="num">{{ custLbyDtlVo.onlLoan }}</span>
            </div>
            <div class="des">
              <span class="des-title">担保贷款(元)</span>
              <span class="num">{{ custLbyDtlVo.gnteeLoanBal }}</span>
            </div>
          </div>
        </template>
      </IncreaseDes>
      <el-table ref="multipleTable" :data="loanAcctDtlVoList" style="width: 100%">
        <el-table-column prop="acctNo" label="账号"></el-table-column>
        <el-table-column prop="contractNo" label="合同号"></el-table-column>
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="mgtCrPrsn" label="贷款人"></el-table-column>
        <el-table-column prop="loanOrg" label="机构"></el-table-column>
        <el-table-column prop="contractAmt" label="合同金额"></el-table-column>
        <el-table-column prop="execRate" label="执行利率"></el-table-column>
        <el-table-column prop="guaMeth" label="担保方式"></el-table-column>
        <el-table-column prop="strtDt" label="起始日期"></el-table-column>
        <el-table-column prop="matrtDt" label="到期日期"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">理财产品</div>
      <div class="increase-wrap">
        <IncreaseDes title="余额(元)" :img="img10" :v1="fincSttnVo.fincBal" :v2="fincSttnVo.balRatnLastDay"
          :v3="fincSttnVo.balRatnLastMth" :v4="fincSttnVo.balRatnUprQtr" :v5="fincSttnVo.balCompLastYr" />
        <IncreaseDes :isOne="true" title="月日均(元)" :img="img4" :v1="fincSttnVo.fincMthAvg"
          :v3="fincSttnVo.mthAvgRatnLastMth" />
        <IncreaseDes title="近6个月日均(元)" :img="img5" :v1="fincSttnVo.rcnt6mthAvg" />
      </div>
      <div class="increase-wrap">
        <IncreaseDes title="年日均(元)" :img="img6" :v1="fincSttnVo.fincYearAvg" :v2="fincSttnVo.yearAvgRatnLastDay"
          :v3="fincSttnVo.yearAvgRatnLastMth" :v4="fincSttnVo.yearAvgRatnUprQtr" :v5="fincSttnVo.yearAvgCompLastYr" />
        <IncreaseDes :isOne="true" title="季度日均(元)" :img="img7" :v1="fincSttnVo.fincQuarterAvg"
          :v4="fincSttnVo.quarterAvgRatnUprQtr" />
        <IncreaseDes title="近12个月日均(元)" :img="img8" :v1="fincSttnVo.rcnt12mthAvg" />
      </div>
      <el-table ref="multipleTable" :data="fincDtlVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <!-- <el-table-column prop="prodCode" label="产品代码"> </el-table-column> -->
        <el-table-column prop="fondDt" label="成立日期"></el-table-column>
        <el-table-column prop="expiDt" label="到期日期"></el-table-column>
        <el-table-column prop="tm" label="期限"></el-table-column>
        <el-table-column prop="fundAcctNo" label="理财账号"></el-table-column>
        <el-table-column prop="prchQuota" label="申购金额(元)"></el-table-column>
        <el-table-column prop="bal" label="市值"></el-table-column>
        <el-table-column prop="txnOrg" label="交易机构"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">基金产品</div>
      <div class="increase-wrap" style="display: inline-block">
        <IncreaseDes title="基金余额(元)" :img="img11" :v1="fndBal == null ? '0' : fndBal" />
      </div>

      <el-table ref="multipleTable" :data="fndDtlVoList" style="width: 100%">
        <el-table-column prop="prodCode" label="基金代码"></el-table-column>
        <!-- <el-table-column prop="prodTp" label="产品类型"> </el-table-column> -->
        <el-table-column prop="crnShr" label="当前份额"></el-table-column>
        <el-table-column prop="crnNetVal" label="当前净值"></el-table-column>
        <el-table-column prop="fixInvst" label="定投"></el-table-column>
        <el-table-column prop="crnMktVal" label="当前市值"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">贵金属产品</div>
      <div class="increase-wrap" style="display: inline-block">
        <IncreaseDes title="贵金属余额(元)" :img="img12" :v1="preMet == null ? '0' : preMet" />
      </div>

      <el-table ref="multipleTable" :data="preMetDtlVoList" style="width: 100%">
        <el-table-column prop="txnDt" label="交易日期"></el-table-column>
        <el-table-column prop="pdCgy" label="产品类别"></el-table-column>
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="prodPrc" label="产品单价"></el-table-column>
        <el-table-column prop="ifAlrdyDrawGold" label="是否已提金"></el-table-column>
        <el-table-column prop="txnOrg" label="交易机构"></el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">关联度产品</div>

      <el-table ref="multipleTable" :data="relLvlProdDtlVoList" style="width: 100%">
        <el-table-column prop="bidCardId" label="绑定卡号"></el-table-column>
        <el-table-column prop="prodTp" label="产品类别"></el-table-column>
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="signOrg" label="签约机构"></el-table-column>
        <el-table-column prop="crnYrAgntPayAmt" label="本年操作金额"></el-table-column>
        <el-table-column prop="lmAgntPayAmt" label="上月操作金额"></el-table-column>
        <el-table-column prop="signDt" label="签约时间"></el-table-column>
      </el-table>
    </div>
    <div class="divider">
      <el-divider content-position="center">
        <i class="el-icon-news"></i>
        产品推荐
      </el-divider>
    </div>
    <div class="part">
      <div class="top-title">存款产品</div>
      <el-table ref="multipleTable" :data="depProdInfoVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="prodNo" label="产品编号"></el-table-column>
        <el-table-column prop="minRate" label="年利率"></el-table-column>
        <el-table-column prop="strtPrchAmt" label="起购金额"></el-table-column>
        <el-table-column prop="prodTerm" label="产品期限" width="160px">
          <template #default="scope">
            {{ scope.row.prodTerm + scope.row.termUnit }}
          </template>
        </el-table-column>
        <el-table-column prop="strtSllTm" label="销售时间" width="160px">
          <template #default="scope">{{ scope.row.strtSllTm }}~{{ scope.row.clsTm }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row, '存款')">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">基金产品</div>
      <el-table ref="multipleTable" :data="fndProdInfoVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="prodCode" label="产品代码"></el-table-column>
        <el-table-column prop="fndTp" label="基金类型"></el-table-column>
        <el-table-column prop="riskLvl" label="风险等级">
          <template #default="scope">
            <div class="risklv">
              <img :src="scope.row.riskLvl.includes('高')
                  ? high
                  : scope.row.riskLvl.includes('中')
                    ? mid
                    : low
                " />
              <span>{{ scope.row.riskLvl }}等风险</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ltstNetVal" label="最新净值"></el-table-column>
        <el-table-column prop="acmNetVal" label="累计净值"></el-table-column>
        <el-table-column prop="rcnt3mthUpVal" label="近3月"></el-table-column>
        <el-table-column prop="rcnt6mthUpVal" label="近6月"></el-table-column>
        <el-table-column prop="rcnt1yrUpVal" label="近1年"></el-table-column>
        <el-table-column prop="thisYrSincUpVal" label="今年以来"></el-table-column>
        <el-table-column prop="fondDt" label="成立时间"></el-table-column>

        <el-table-column label="操作" fixed="right" width="100">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row, '基金')">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">理财产品</div>
      <el-table ref="multipleTable" :data="fincProdInfoVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="prodIdentn" label="产品代码"></el-table-column>
        <el-table-column prop="riskLvl" label="风险等级">
          <template #default="scope">
            <div class="risklv">
              <img :src="scope.row.riskLvl.includes('高')
                  ? high
                  : scope.row.riskLvl.includes('中')
                    ? mid
                    : low
                " />
              <span>{{ scope.row.riskLvl }}等风险</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="crnMktVal" label="当前市值"></el-table-column>
        <el-table-column prop="strtPrchAmt" label="起购金额"></el-table-column>
        <el-table-column prop="opnCnfrmDay" label="到期日/开放确认日"></el-table-column>
        <el-table-column prop="prodTerm" label="产品期限"></el-table-column>

        <el-table-column prop="strtSllTm" label="销售时间" width="200px">
          <template #default="scope">{{ scope.row.strtSllTm }}~{{ scope.row.clsTm }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row, '理财')">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="part">
      <div class="top-title">保险产品</div>
      <el-table ref="multipleTable" :data="insProdInfoVoList" style="width: 100%">
        <el-table-column prop="prodNm" label="产品名称"></el-table-column>
        <el-table-column prop="prodNo" label="产品编号"></el-table-column>
        <el-table-column prop="prodTp" label="保险类型"></el-table-column>
        <el-table-column prop="insCmpny" label="保险公司"></el-table-column>
        <el-table-column prop="payMeth" label="缴费方式"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row, '保险')">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  .part {
    margin-bottom: 30px;
  }

  .risklv {
    display: flex;
    align-items: center;

    >img {
      width: 22px;
      height: 22px;
      margin-right: 3px;
    }
  }
}

.des-wrap2 {
  display: grid;
  grid-template-columns: repeat(7, 1fr) !important;
  /* 定义4列，每列平均分配剩余空间 */
  grid-gap: 10px !important;
  background-color: #fff !important;
  border-radius: 6px !important;
  padding: 15px !important;

  .num {
    margin-left: 2px;

    &::before {
      content: "" !important;
    }

    color: #3e81f2 !important;
  }
}

.increase-wrap {
  :deep(.info-increase) {
    padding: 20px;
  }
}

.dk {
  :deep(.info-increase) {
    justify-content: flex-start;
  }

  :deep(.des-wrap) {
    flex: 1;
  }
}

.divider {
  padding: 20px 0;
}

.el-divider__text,
.is-center {
  font-size: 24px;
}
</style>
