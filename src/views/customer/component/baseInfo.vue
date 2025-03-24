<script setup lang="ts">
defineOptions({
  name: "BaseInfo",
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
import IncreaseDes from "./increaseDes.vue";
const loading = ref(false);
const srcImg = new URL("@/assets/customer/13.png", import.meta.url).href;
const valueInfoKyc = reactive<any>({});
const custMngmtRelVoList = reactive<any>([]);
const custGridInfoVoList = reactive<any>([]);
const campCustInfoDtlVo = reactive<any>({});

const reqCusValueInfoKyc = () => {
  // loading.value = true;
  // const { custIsn, ctfNo, custTp } = props.custDetail
  // getCusValueInfoKyc({ custIsn, ctfNo, custTp }).then((res: any) => {
  //   if (res.code == 0) {
  //     Object.assign(valueInfoKyc, res.data)
  //   }
  // }).finally(() => {
  //   loading.value = false;
  // })
};
const reqCusValueInfo = () => {
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // getCusValueInfoKyc({ custIsn, ctfNo, custTp }).then((res: any) => {
  //   if (res.code == 0) {
  //     const { custGridInfoVoList: gridData, custMngmtRelVoList: MngmtData } = res.data
  //     Object.assign(custGridInfoVoList, gridData)
  //     Object.assign(custMngmtRelVoList, MngmtData)
  //   }
  // })
};
const reqCusValueTag = () => {
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // getCusValueTag({ custIsn, ctfNo, custTp }).then((res: any) => {
  //   if (res.code == 0) {
  //     Object.assign(campCustInfoDtlVo, res.data)
};

onMounted(() => {
  reqCusValueInfoKyc();
  reqCusValueInfo();
  reqCusValueTag();
});
</script>

<template>
  <div v-loading="loading" class="view-container">
    <div class="part" style="margin-bottom: 20px">
      <IncreaseDes title="KYC完整度" :img="srcImg" :isSlot="true" :v1="valueInfoKyc.kycIntegrity">
        <template #default>
          <div class="kyc-progress">
            <div class="time">
              最近更新人员：{{ valueInfoKyc.campMngrNm }}/{{
                valueInfoKyc.updPrsn
              }}
              数据更新时间：{{ valueInfoKyc.updTm }}
            </div>
            <el-progress :text-inside="true" :stroke-width="15" :percentage="Number(valueInfoKyc.kycIntegrity ? valueInfoKyc.kycIntegrity.slice(0, -1) : 0)
              " :show-text="false"></el-progress>
          </div>
        </template>
      </IncreaseDes>
    </div>
    <div class="kyc">
      <div class="part">
        <div class="normal-title">个人信息</div>
        <el-descriptions title="" :column="2" label-width="150" border>
          <el-descriptions-item label="常住地址">
            {{ valueInfoKyc.prmtRsdeAddr }}
          </el-descriptions-item>

          <el-descriptions-item label="农历生日">{{ valueInfoKyc.chnCalBth }}</el-descriptions-item>
          <el-descriptions-item label="阳历生日">
            {{ valueInfoKyc.grianCaldarBth }}
          </el-descriptions-item>
          <el-descriptions-item label="家庭成员情况">
            {{ valueInfoKyc.famMbrSttn }}
          </el-descriptions-item>
          <el-descriptions-item label="信仰">{{ valueInfoKyc.faith }}</el-descriptions-item>
          <el-descriptions-item label="兴趣爱好">{{ valueInfoKyc.intPref }}</el-descriptions-item>
          <el-descriptions-item label="活动偏好">{{ valueInfoKyc.salonPref }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="part">
        <div class="normal-title">资产负债情况</div>
        <el-descriptions title="" label-width="150" :column="2" border>
          <el-descriptions-item label="家庭资产情况">
            {{ valueInfoKyc.famAstSttn }}
          </el-descriptions-item>
          <el-descriptions-item label="家庭负债情况">
            {{ valueInfoKyc.famLbySttn }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="part">
        <div class="normal-title">投资情况</div>
        <el-descriptions title="" label-width="150" :column="2" border>
          <el-descriptions-item label="过往投资经历">
            {{ valueInfoKyc.invstExper }}
          </el-descriptions-item>
          <el-descriptions-item label="投资产品偏好">
            {{ valueInfoKyc.invstPref }}
          </el-descriptions-item>
          <el-descriptions-item label="投资风险偏好">
            {{ valueInfoKyc.invstRiskPref }}
          </el-descriptions-item>
          <el-descriptions-item label="投资期限偏好">
            {{ valueInfoKyc.acptInvstTerm }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="part">
        <div class="normal-title">往来银行</div>
        <el-descriptions title="" label-width="150" :column="2" border>
          <el-descriptions-item label="主要来往银行">
            {{ valueInfoKyc.mainBank }}
          </el-descriptions-item>
          <el-descriptions-item label="主要来往银行评价">
            {{ valueInfoKyc.faceToMainBankEval }}
          </el-descriptions-item>
          <el-descriptions-item label="他行存放资产（万元）">
            {{ valueInfoKyc.othrBankStoreAst }}
          </el-descriptions-item>
          <el-descriptions-item label="他行产品情况">
            {{ valueInfoKyc.othrBankProdSttn }}
          </el-descriptions-item>
          <el-descriptions-item label="他行客户级别">
            {{ valueInfoKyc.othrBankCustLvl }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="part">
        <div class="normal-title">其他情况</div>
        <el-descriptions title="" label-width="150" :column="2" border>
          <el-descriptions-item label="备注">{{ valueInfoKyc.rmkInfo }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="part">
      <div class="top-title">管户信息</div>
      <el-descriptions v-for="(i, index) in custMngmtRelVoList" :key="index" title="" label-width="150" :column="2"
        border>
        <el-descriptions-item label="归属支行">
          {{
            i.blgLv1OrgNm && i.blgLv1OrgNm !== "\\N" && i.blgLv1OrgNm !== "" ? i.blgLv1OrgNm : "无"
          }}
        </el-descriptions-item>
        <el-descriptions-item label="归属网点">
          {{
            i.blgLv0OrgNm && i.blgLv0OrgNm !== "\\N" && i.blgLv0OrgNm !== "" ? i.blgLv0OrgNm : "无"
          }}
        </el-descriptions-item>
        <el-descriptions-item label="管户经理">
          {{ i.cstMngrNm && i.cstMngrNm !== "\\N" && i.cstMngrNm !== "" ? i.cstMngrNm : "无" }}
        </el-descriptions-item>
        <el-descriptions-item label="柜员号">
          {{ i.cstMngr && i.cstMngr !== "\\N" && i.cstMngr !== "" ? i.cstMngr : "无" }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">网格信息</div>
      <el-descriptions v-for="(i, index) in custGridInfoVoList" :key="index" title="" :column="2" label-width="150"
        border>
        <el-descriptions-item label="网格类型">
          {{ i.gridTp && i.gridTp !== "\\N" && i.gridTp !== "" ? i.gridTp : "无" }}
        </el-descriptions-item>
        <el-descriptions-item label="网格名称">
          {{ i.gridNm && i.gridNm !== "\\N" && i.gridNm !== "" ? i.gridNm : "无" }}
        </el-descriptions-item>
        <el-descriptions-item label="网格员">
          {{ i.gridPrsn && i.gridPrsn !== "\\N" && i.gridPrsn !== "" ? i.gridPrsn : "无" }}
        </el-descriptions-item>
        <el-descriptions-item label="柜员号">
          {{ i.tlrNo && i.tlrNo !== "\\N" && i.tlrNo !== "" ? i.tlrNo : "无" }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="part">
      <div class="top-title">客户偏好</div>
      <div v-for="item in campCustInfoDtlVo" :key="item.lblTp" class="tag-wrap">
        <span class="tag-title">{{ item.key }}:</span>
        <div class="tag-item">
          <el-tag v-for="list in item.list" :key="list">{{ list }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-wrap {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  .tag-title {
    margin-right: 10px;
  }

  .el-tag {
    margin-right: 10px;
  }
}

.kyc-progress {
  // width: 80%;
  flex: 1;
  margin-left: 40px;

  .time {
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    margin-bottom: 15px;
    text-align: right;
  }
}

.kyc {
  padding-top: 10px;
  margin-bottom: 15px;
  // border: 2px solid #ccc;

  // :deep(.el-descriptions__body) {
  //   background-color: #f8f8f8 !important;

  //   .el-descriptions-item__label.is-bordered-label {
  //     background-color: #f8f8f8 !important;
  //   }
  // }

  :deep(.el-descriptions--medium.is-bordered .el-descriptions-item__cell) {
    padding: 7px 10px;
  }

  .normal-title {
    margin-bottom: 10px !important;
  }

  // background-color: #f8f8f8 !important;
  // border-radius: 6px;
}
</style>
