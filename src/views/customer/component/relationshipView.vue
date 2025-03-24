<script setup lang="ts">
defineOptions({
  name: "relationshipView",
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
import GraphChart from "./chart/graphChart.vue";
import GraphChart2 from "./chart/graphChart2.vue";
const loading = ref(false);
const cusLabel = ref(false);
const activeName = ref("famRelView");
const famTrSaBsnSttnVo = ref<any>({});
const famRelVoList = ref<any>([]);
const campCustFixAstInfoVoList = ref<any>([]);
const valueInfo = ref<any>({});
const dataLink = reactive<any>([]);
const dataRel = reactive<any>([]);
const categories = reactive<any>([]);
const tabs = [
  { label: "家庭关系", name: "famRelView" },
  { label: "担保关系", name: "grtRelView" },
  { label: "资金关系", name: "fndRelView" },
];

const tabHandleClick = (tab: any) => {
  activeName.value = tab.paneName;
};
</script>

<template>
  <div v-loading="loading" class="view-container">
    <el-tabs v-model="activeName" type="card" style="margin-top: 2px" class="cusTabs center-tabs"
      @tab-click="tabHandleClick">
      <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <div v-if="activeName == 'famRelView'" class="parts part2">
      <div class="part-left">
        <GraphChart v-if="dataRel.length > 0" ref="GraphChart" ele="relationshipView" :chartData="{
          dataLink,
          dataRel,
          categories,
        }" :activeName="activeName" :cusLabel="cusLabel" />
        <el-empty v-else description="暂无数据" style="margin: 0 auto"></el-empty>
      </div>
      <div class="part-right">
        <div class="top-title">家庭在我行业务办理情况</div>
        <el-descriptions title="" :column="1" label-width="180" border>
          <el-descriptions-item label="最新数据时间">
            {{ famTrSaBsnSttnVo.ltstDataTm }}
          </el-descriptions-item>
          <el-descriptions-item label="我行资产总额(元)">
            {{ famTrSaBsnSttnVo.custAstTotVal }}
          </el-descriptions-item>
          <el-descriptions-item label="我行贷款销售总额(元)">
            {{ famTrSaBsnSttnVo.loanCrTotVal }}
          </el-descriptions-item>
          <el-descriptions-item label="我行贷款余额(元)">
            {{ famTrSaBsnSttnVo.loanBal }}
          </el-descriptions-item>
          <el-descriptions-item label="我行贷记卡授信总额(元)">
            {{ famTrSaBsnSttnVo.crCardCrTotVal }}
          </el-descriptions-item>
          <el-descriptions-item label="我行当前贷款逾期笔数">
            {{ famTrSaBsnSttnVo.loanOdueQty }}
          </el-descriptions-item>
          <el-descriptions-item label="我行当前逾期总额(元)">
            {{ famTrSaBsnSttnVo.loanOdueTotVal }}
          </el-descriptions-item>
          <el-descriptions-item label="在我行提供担保客户数">
            {{ famTrSaBsnSttnVo.guaCustNbr }}
          </el-descriptions-item>
          <el-descriptions-item label="担保总额(元)">
            {{ famTrSaBsnSttnVo.guaTotVal }}
          </el-descriptions-item>
          <el-descriptions-item label="在我行中间业务签约总数">
            {{ famTrSaBsnSttnVo.midBsnSignNbr }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div v-if="activeName == 'grtRelView'" class="parts part2">
      <GraphChart2 v-if="dataRel.length > 0" ele="grtRelView2" :chartData="{
        dataLink,
        dataRel,
      }" />
      <el-empty v-else description="暂无数据" style="margin: 0 auto"></el-empty>
    </div>
    <div v-if="activeName == 'fndRelView'" class="parts part3">
      <GraphChart v-if="dataRel.length > 0" ref="GraphChart" ele="relationshipView3" :chartData="{
        dataLink,
        dataRel,
        categories,
      }" :activeName="activeName" :cusLabel="cusLabel" />
      <el-empty v-else description="暂无数据" style="margin: 0 auto"></el-empty>
    </div>
    <div class="part">
      <div class="top-title">收入信息</div>
      <el-descriptions title="" :column="2" label-width="120" border>
        <el-descriptions-item label="年收入(万元)">{{ valueInfo.income }}</el-descriptions-item>
        <!-- <el-descriptions-item label="其他收入">{{
          valueInfo.othrIncm
        }}</el-descriptions-item> -->
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">家庭信息</div>
      <el-descriptions v-for="(item, index) in famRelVoList" :key="index" title="" :column="2" label-width="120" border>
        <el-descriptions-item label="关系">{{ item.relTp }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ item.relPrsnNm }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ item.relPrsnCertNo }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ item.relPrsnCntctNo }}
        </el-descriptions-item>
        <el-descriptions-item label="工作单位">{{ item.relPrsnWorkUnit }}</el-descriptions-item>
        <el-descriptions-item label="年收入(万元)">{{ item.relPrsnYrIncm }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">家庭经营情况</div>
      <el-descriptions title="" :column="2" label-width="120" border>
        <el-descriptions-item label="是否经营">{{ valueInfo.ifOpr }}</el-descriptions-item>
        <el-descriptions-item label="单位名称">{{ valueInfo.unitMingc }}</el-descriptions-item>
        <el-descriptions-item label="主营业务">{{ valueInfo.mainBsn }}</el-descriptions-item>
        <el-descriptions-item label="开办日期">
          {{ valueInfo.strtDt }}
        </el-descriptions-item>
        <el-descriptions-item label="累计投入(万元)">{{ valueInfo.acmInput }}</el-descriptions-item>
        <el-descriptions-item label="股份占比">{{ valueInfo.shrRatio }}</el-descriptions-item>
        <el-descriptions-item label="雇佣人数">{{ valueInfo.empNbr }}</el-descriptions-item>
        <el-descriptions-item label="年销售额(万元)">
          {{ valueInfo.yrSaleAmt }}
        </el-descriptions-item>
        <el-descriptions-item label="成本支出(万元)">{{ valueInfo.costExpn }}</el-descriptions-item>
        <el-descriptions-item label="净利润(万元)">{{ valueInfo.netPft }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-if="campCustFixAstInfoVoList && campCustFixAstInfoVoList.length" class="part">
      <div class="top-title">资产情况</div>
      <el-descriptions v-for="(item, index) in campCustFixAstInfoVoList" :key="index" title="" :column="2"
        label-width="120" border>
        <el-descriptions-item label="资产类型">{{ item.astTp }}</el-descriptions-item>
        <el-descriptions-item label="评估价值">{{ item.evalVal }}</el-descriptions-item>
        <el-descriptions-item label="是否有抵押">{{ item.ifExstMrgt }}</el-descriptions-item>
        <el-descriptions-item label="资产详情">
          {{ item.astDtl }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- <div class="part">
      <div class="top-title">负债情况（除本行贷款外）</div>
      <el-descriptions title="" :column="2" size="medium" border>
        <el-descriptions-item label="其他负债">{{
          valueInfo.othrLby
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">其他情况</div>
      <el-descriptions title="" :column="2" size="medium" border>
        <el-descriptions-item label="备注">{{
          valueInfo.rmkInfo
        }}</el-descriptions-item>
      </el-descriptions>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.parts {
  display: flex;

  .part-left {
    width: 60%;
    height: 500px;
  }

  .part-right {
    width: 39%;
    margin-left: 20px;
  }
}

.part3 {
  height: 700px;
}

.part2 {
  height: 700px;
}
</style>
