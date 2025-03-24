<script setup lang="ts">
defineOptions({
  name: "RiskRemind",
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
const loading = ref(false);
const campCustInfoDtlVo = ref<any>({});
const riskInfoSttnVo = ref<any>({});
const depDtlInfoVoList = ref<any>([]);
onMounted(() => {
  reqCusValueInfo();
});

const reqCusValueInfo = () => {
  // loading.value = true;
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusRiskRemindAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo,
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     campCustInfoDtlVo.value = res.data?.campCustInfoDtlVo;
  //     riskInfoSttnVo.value = res.data?.riskInfoSttnVo
  //     depDtlInfoVoList.value = res.data?.depDtlInfoVoList
  //   }
  // }).finally(() => {
  //   loading.value = false;
  // });
};
</script>

<template>
  <div v-loading="loading" class="view-container">
    <div class="part">
      <div class="top-title">九要素信息</div>
      <el-descriptions title="" label-width="120" :column="3" border>
        <el-descriptions-item label="姓名">{{ campCustInfoDtlVo.nmNineElmn }}</el-descriptions-item>
        <el-descriptions-item label="国籍">
          {{ campCustInfoDtlVo.natnNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ campCustInfoDtlVo.gndNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="证件类型">
          {{ campCustInfoDtlVo.ctfTpNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="证件号">
          {{ campCustInfoDtlVo.ctfNoNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="证件期限">
          {{ campCustInfoDtlVo.expryDtNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          {{ campCustInfoDtlVo.addrNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ campCustInfoDtlVo.cntctMethNineElmn }}
        </el-descriptions-item>
        <el-descriptions-item label="职业">
          {{ campCustInfoDtlVo.voctnNineElmn }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">风险信息</div>
      <el-descriptions title="" label-width="150" :column="2" border>
        <el-descriptions-item label="欠款类别">
          {{ riskInfoSttnVo.arrrAmtCgy }}
        </el-descriptions-item>
        <el-descriptions-item label="不生息余额（元）">
          {{ riskInfoSttnVo.nonOccurAccumIntAmt }}
        </el-descriptions-item>
        <el-descriptions-item label="欠息金额（元）">
          {{ riskInfoSttnVo.dbIntAmt }}
        </el-descriptions-item>
        <el-descriptions-item label="风险评分等级">
          {{ riskInfoSttnVo.riskScorLvl }}
        </el-descriptions-item>
        <el-descriptions-item label="欠息次数（次） ">
          {{ riskInfoSttnVo.dbIntTms }}
        </el-descriptions-item>
        <el-descriptions-item label="本年欠息次数（次）">
          {{ riskInfoSttnVo.crnYrDbIntTms }}
        </el-descriptions-item>
        <el-descriptions-item label="欠息天数（天）">
          {{ riskInfoSttnVo.dbIntDays }}
        </el-descriptions-item>
        <el-descriptions-item label="最长欠息天数（天）">
          {{ riskInfoSttnVo.lngstDbIntDays }}
        </el-descriptions-item>
        <el-descriptions-item label="四级形态">{{ riskInfoSttnVo.flForm }}</el-descriptions-item>
        <el-descriptions-item label="五级形态">
          {{ riskInfoSttnVo.fiveLvlForm }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="评级">{{
          riskInfoSttnVo.rtg
        }}</el-descriptions-item>
        <el-descriptions-item label="评级日期">{{
          riskInfoSttnVo.rtgDt
        }}</el-descriptions-item> -->
        <el-descriptions-item label="征信">{{ riskInfoSttnVo.crInfo }}</el-descriptions-item>
        <el-descriptions-item label="征信日期">{{ riskInfoSttnVo.crInfoDt }}</el-descriptions-item>
        <el-descriptions-item label="风险点">{{ riskInfoSttnVo.riskPoint }}</el-descriptions-item>
        <el-descriptions-item label="近两年征信逾期次数">
          {{ riskInfoSttnVo.rcntTwoYrCrInfoOdueTms }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">账号异常状态</div>
      <el-table ref="multipleTable" :data="depDtlInfoVoList">
        <el-table-column prop="acctNo" label="账号"></el-table-column>
        <el-table-column prop="acctSta" label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
