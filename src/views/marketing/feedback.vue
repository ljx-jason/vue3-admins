<script setup lang="ts">
defineOptions({
  name: "Feedback",
  inheritAttrs: false,
});
import {
  religionSource,
  investmentManagerSource,
  // investmentHorizon,
  investmentPreference,
  // slphData,
  yhData,
  activyData,
  timeData,
  riskData,
} from "@/data/index.js";

const route = useRoute();

const kycFormSet = reactive<any>({
  prmtRsdeAddr: "",
  faith: "",
  chnCalBth: "",
  invstExper: [],
  exstgFincAst: "",
  acptInvstTerm: [],
  invstPref: [],
  salonPref: [],
  mainBank: [],
  opnAcBane: "",
  faceToMainBankEval: "",
  lbySttnAndLoanBank: "",
  othrBankCustLvl: "",
  faceToOthrBankHostSvcEval: "",
  rmkInfo: "",
  // photo: ["123"],
  salonPrefOther: "",
  intPrefOther: "",
  intPref: [],
});
const formSet = reactive<any>({});
const kycForm = ref();
const forms = ref();

const isShowFaithOther = ref(false);
const isShowOther = ref(false);
const isShowIntPrefOther = ref(false);
const isShowMainBankOther = ref(false);
const showCalendar = ref(false);
const treeOptions = reactive([]);
const options = reactive<any>([]);

const validateAmount = (rule: any, value: any, callback: any) => {
  if (value === "" || value === null || value === undefined) {
    callback();
  } else if (!/^\d+(\.\d+)?$/.test(value)) {
    // 保留两位小数
    // !/^\d+(\.\d{1,2})?$/.test(value)
    callback(new Error("请输入正确的金额"));
  } else {
    callback();
  }
};
const amountRules = computed(() => rules.amount);
const rules = {
  amount: [
    // 金额字段的校验规则
    // { required: true, message: '请输入金额', trigger: 'blur' },
    { validator: validateAmount, trigger: "blur" },
  ],
};
onMounted(() => {
  getFeedbackType();
  getTreeList();
  getFeedbackInfo();
});
const getTreeList = () => {
  // hobby().then((res: any) => {
  //   if (res.code) {
  //     Object.assign(treeOptions, res.data)
  //   }
  // })
};
const getFeedbackType = () => {
  // getFeedbackTypeAPI.then((res: any) => {
  //   if (res.code == 0 && res.data) {
  //     Object.assign(options, res.data.result)
  //   }
  // })
};
const getFeedbackInfo = () => {
  if (route.query.subType === "kyc") {
    getFeedbackKyc();
  } else {
    getFeedbackEcho();
  }
};
const getFeedbackEcho = async () => {
  const { cust_id, cust_idcard } = route.query;
  // let data = {
  //   custId: cust_id,
  //   custIdcard: cust_idcard,
  // };
  // const res = await this.$api.marketingFeedbackEcho(data);
  // if (res.code == 0) {
  //   Object.assign(formSet, res.data)
  //   if (res.data?.zdyDate) {
  //     showCalendar.value = true;
  //   } else {
  //     showCalendar.value = false;
  //   }
  // }
};
const getFeedbackKyc = async () => {
  const { cust_id, cust_type, cust_idcard } = route.query;
  // let data = {
  //   custIsn: cust_id,
  //   custTp: cust_type || "1",
  //   certNo: cust_idcard,
  // };
  // const res = await this.$api.custKycInfoAPI(data);
  // if (res.code == 0) {
  //   Object.assign(kycFormSet, res.data)
  //   // 多选回显list
  //   if (res.data.intPref) {
  //     kycFormSet.intPref = res.data.intPref.split(",");
  //   }
  //   if (res.data.salonPref) {
  //     kycFormSet.salonPref = res.data.salonPref.split(",");
  //   }
  //   if (res.data.mainBank) {
  //     kycFormSet.mainBank = res.data.mainBank.split(",");
  //   }
  //   if (res.data.invstExper) {
  //     kycFormSet.invstExper = res.data.invstExper.split(",");
  //   }
  //   if (res.data.acptInvstTerm) {
  //     kycFormSet.acptInvstTerm = res.data.acptInvstTerm.split(",");
  //   }
  //   if (res.data.invstPref) {
  //     kycFormSet.invstPref = res.data.invstPref.split(",");
  //   }

  //   // 其他回显
  //   if (res.data.salonPrefOther) {
  //     isShowOther.value = true;
  //   }
  //   if (res.data.intPrefOther) {
  //     isShowIntPrefOther.value = true;
  //   }
  //   if (res.data.faithOther) {
  //     isShowFaithOther.value = true;
  //   }
  //   if (res.data.mainBankOther) {
  //     isShowMainBankOther.value = true;
  //   }
  // }
};
const submitFormKyc = () => {
  kycFormSet.value.validate(async (valid: any) => {
    const { cust_type, cust_id, cust_idcard, actvyId, nmlstld } = route.query;
    let data = {
      nmlstld,
      type: route.query.subType,
      custTp: cust_type || "1",
      custIsn: cust_id,
      ctfNo: cust_idcard,
      ...kycFormSet,
      fromType: route.query.form_type, // 1精准营销，2每日任务, 4 重要提醒
    };
    if (actvyId) {
      data = { ...data, actvyId };
    }
    // 多选拼接
    if (kycFormSet.intPref.length) {
      data.intPref = kycFormSet.intPref.join(",");
    }
    if (kycFormSet.salonPref.length) {
      data.salonPref = kycFormSet.salonPref.join(",");
    }
    if (kycFormSet.mainBank) {
      data.mainBank = kycFormSet.mainBank.join(",");
    }
    if (kycFormSet.invstExper) {
      data.invstExper = kycFormSet.invstExper.join(",");
    }
    if (kycFormSet.acptInvstTerm) {
      data.acptInvstTerm = kycFormSet.acptInvstTerm.join(",");
    }
    if (kycFormSet.invstPref) {
      data.invstPref = kycFormSet.invstPref.join(",");
    }
    console.log("data", data);
    if (valid) {
      // let res = { code: 1, msg: "" };
      // if (props.feedbackIdForm.actvyCgy) {
      //   res = await this.$api.actvyAddKyc({
      //     ...data,
      //     nmlstId: props.feedbackIdForm.nmlstld,
      //     fromType: props.feedbackIdForm.actvyCgy === "0" ? "5" : "6",
      //   });
      // } else {
      //   res = await this.$api.kycFeedbackAddAPI(data);
      // }
      // if (res.code == 0) {
      //  ElMessage.success(res.msg || "保存成功");
      // }
    } else {
      return false;
    }
  });
};
const submitForm = () => {
  forms.value.validate(async (valid: any) => {
    const { cust_type, cust_id, cust_idcard, actvyId } = route.query;
    let data = {
      type: route.query.subType,
      custType: cust_type || "1",
      custId: cust_id,
      custIdcard: cust_idcard,
      ...formSet,
      fromType: route.query.form_type, // 1精准营销，2每日任务, 4 重要提醒
    };
    if (actvyId) {
      data = { ...data, actvyId };
    }
    if (data.stringReserve === "99") {
      if (!data.zdyDate) {
        ElMessage.warning("请选择自定义日期");
        return;
      }
    }
    console.log("data", data);
    if (valid) {
      // let res = { code: 1, msg: "" };
      // if (props.feedbackIdForm.actvyCgy) {
      //   res = await this.$api.activityFeedback({
      //     ...data,
      //     nmlstId: props.feedbackIdForm.nmlstld,
      //     fromType: props.feedbackIdForm.actvyCgy === "0" ? "5" : "6",
      //   });
      // } else {
      //   res = await this.$api.marketingFeedbackAddAPI(data);
      // }
      // if (res.code == 0) {
      //  ElMessage.success(res.msg || "保存成功");
      // }
    } else {
      return false;
    }
  });
};
const onDateChangeY = (date: any) => {
  if (date) {
    kycFormSet.chnCalBth = "L" + date;
  }
};
const faithChange = (val: string) => {
  if (val === "其他") {
    isShowFaithOther.value = true;
  } else {
    isShowFaithOther.value = false;
  }
};

const handleSelectTree = (raw: any) => {
  if (raw.label === "其他") {
    isShowIntPrefOther.value = true;
  }
};
const mainBankChange = (val: any) => {
  if (val.includes("其他银行")) {
    isShowMainBankOther.value = true;
  } else {
    isShowMainBankOther.value = false;
  }
};
const changeOther = (val: any) => {
  if (val.includes("其他")) {
    isShowOther.value = true;
  } else {
    isShowOther.value = false;
  }
};
const handleZdy = (val: any) => {
  if (val === "99") {
    showCalendar.value = true;
  } else {
    showCalendar.value = false;
  }
};
</script>

<template>
  <div class="feedback">
    <el-card class="form-box">
      <div v-if="route.query.subType === 'kyc'">
        <el-form ref="kycForm" :model="kycFormSet" :rules="rules" label-width="160px" class="demo-ruleForm"
          :inline="true">
          <div class="top-title">个人信息</div>
          <el-form-item label="常住地址" prop="prmtRsdeAddr">
            <el-input v-model="kycFormSet.prmtRsdeAddr" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <div class="gird2">
            <el-form-item label="农历生日" prop="chnCalBth">
              <el-date-picker v-model="kycFormSet.grianCaldarBth" style="width: 100%" type="date" placeholder="选择日期"
                value-format="yyyy-MM-dd" @change="onDateChangeY"></el-date-picker>
            </el-form-item>
            <el-form-item label="阳历生日" prop="grianCaldarBth">
              <el-date-picker v-model="kycFormSet.grianCaldarBth" style="width: 100%" type="date" placeholder="选择日期"
                value-format="yyyy-MM-dd" @change="onDateChangeY"></el-date-picker>
            </el-form-item>
            <el-form-item label="家庭成员情况" prop="famMbrSttn">
              <el-input v-model="kycFormSet.famMbrSttn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="信仰" prop="faith">
              <el-select v-model="kycFormSet.faith" placeholder="请选择" @change="faithChange">
                <el-option v-for="item in religionSource" :key="item.text" :label="item.value"
                  :value="item.text"></el-option>
              </el-select>
              <el-input v-if="isShowFaithOther" v-model="kycFormSet.faithOther" placeholder="请输入其他信仰"></el-input>
            </el-form-item>
            <el-form-item label="兴趣爱好" prop="intPref">
              <el-tree-select v-model="kycFormSet.intPref" :data="treeOptions" :render-after-expand="false"
                show-checkbox @select="handleSelectTree" />
              <el-input v-if="isShowIntPrefOther" v-model="kycFormSet.intPrefOther" placeholder="请输入其他兴趣爱好"></el-input>
            </el-form-item>
            <el-form-item label="活动偏好" prop="salonPref">
              <el-select v-model="kycFormSet.salonPref" placeholder="请选择" multiple collapse-tags @change="changeOther">
                <el-option v-for="item in activyData" :key="item.text" :label="item.value"
                  :value="item.text"></el-option>
              </el-select>
              <el-input v-if="isShowOther" v-model="kycFormSet.salonPrefOther" placeholder="请输入其他活动偏好"></el-input>
            </el-form-item>
          </div>
          <div class="top-title">资产负债情况</div>
          <div class="gird2">
            <el-form-item label="家庭资产情况" prop="famAstSttn">
              <el-input v-model="kycFormSet.famAstSttn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="家庭负债情况" prop="famLbySttn">
              <el-input v-model="kycFormSet.famLbySttn" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="top-title">投资情况</div>
          <div class="gird2">
            <el-form-item label="过往投资经历" prop="invstExper">
              <el-select v-model="kycFormSet.invstExper" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in investmentManagerSource" :key="item.text" :label="item.value"
                  :value="item.text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资产品偏好" prop="invstPref">
              <el-select v-model="kycFormSet.invstPref" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in investmentPreference" :key="item.text" :label="item.value"
                  :value="item.text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资风险偏好" prop="invstRiskPref">
              <el-select v-model="kycFormSet.invstRiskPref" placeholder="请选择">
                <el-option v-for="item in riskData" :key="item.text" :label="item.value" :value="item.text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资期限偏好" prop="acptInvstTerm">
              <el-select v-model="kycFormSet.acptInvstTerm" placeholder="请选择" multiple collapse-tags>
                <el-option v-for="item in timeData" :key="item.text" :label="item.value" :value="item.text"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="top-title">往来银行</div>
          <div class="gird2">
            <el-form-item label="主要来往银行" prop="mainBank">
              <el-select v-model="kycFormSet.mainBank" placeholder="请选择" multiple collapse-tags
                @change="mainBankChange">
                <el-option v-for="item in yhData" :key="item.text" :label="item.value" :value="item.text"></el-option>
              </el-select>
              <el-input v-if="isShowMainBankOther" v-model="kycFormSet.mainBankOther" placeholder="请输入其他银行"></el-input>
            </el-form-item>
            <el-form-item label="主要来往银行评价" prop="faceToMainBankEval">
              <el-input v-model="kycFormSet.faceToMainBankEval" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="他行存放资产(万元)" prop="othrBankStoreAst">
              <el-input v-model="kycFormSet.othrBankStoreAst" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="他行产品情况" prop="othrBankProdSttn">
              <el-input v-model="kycFormSet.othrBankProdSttn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="他行客户级别" prop="othrBankCustLvl">
              <el-input v-model="kycFormSet.othrBankCustLvl" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="top-title">其他情况</div>
          <el-form-item label="备注" prop="rmkInfo">
            <el-input v-model="kycFormSet.rmkInfo" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <el-descriptions title="" label-width="120" :column="3" border>
          <el-descriptions-item label="营销人员">{{ kycFormSet.campMngrNm }}</el-descriptions-item>
          <el-descriptions-item label="柜员号">{{ kycFormSet.updPrsn }}</el-descriptions-item>
          <el-descriptions-item label="营销时间">{{ kycFormSet.updTm }}</el-descriptions-item>
          <el-descriptions-item label="经纬度">
            {{ kycFormSet.wgsLng }}&nbsp;&nbsp;{{ kycFormSet.lgtdLatd }}
          </el-descriptions-item>
          <el-descriptions-item label="定位">{{ kycFormSet.orintt }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else>
        <el-form ref="forms" :model="formSet" :rules="rules" label-width="120px" class="demo-ruleForm" :inline="true">
          <div class="gird2">
            <el-form-item label="存款(万元)" prop="deposit" :rules="amountRules">
              <el-input v-model="formSet.deposit" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="理财(万元)" prop="financing" :rules="amountRules">
              <el-input v-model="formSet.financing" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="基金(万元)" prop="fund" :rules="amountRules">
              <el-input v-model="formSet.fund" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="保险(万元)" prop="insurance" :rules="amountRules">
              <el-input v-model="formSet.insurance" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="贵金属(万元)" prop="nobleMetal" :rules="amountRules">
              <el-input v-model="formSet.nobleMetal" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="贷款(万元)" prop="loan" :rules="amountRules">
              <el-input v-model="formSet.loan" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="借记卡" prop="debitCard">
              <el-select v-model="formSet.debitCard" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="养老代发" prop="rtAgntPay">
              <el-select v-model="formSet.rtAgntPay" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收单商户" prop="aqrgMcht">
              <el-select v-model="formSet.aqrgMcht" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="三代社保卡" prop="socialSecurityCard">
              <el-select v-model="formSet.socialSecurityCard" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公积金建缴" prop="pbcFndCrtPay">
              <el-select v-model="formSet.pbcFndCrtPay" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信用卡" prop="creditCard">
              <el-select v-model="formSet.creditCard" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水电燃签约" prop="wtrElecGasAgncRpmt">
              <el-select v-model="formSet.wtrElecGasAgncRpmt" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="丰收互联" prop="fshl">
              <el-select v-model="formSet.fshl" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数字人民币" prop="digitalYuan">
              <el-select v-model="formSet.digitalYuan" placeholder="请选择">
                <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="持续跟踪" prop="stringReserve" style="text-align: left">
            <el-radio-group v-model="formSet.stringReserve" @change="handleZdy">
              <el-radio label="3">三天后回访</el-radio>
              <el-radio label="6">六天后回访</el-radio>
              <el-radio label="9">九天后回访</el-radio>
              <el-radio label="99">自定义日期再回访</el-radio>
              <el-date-picker v-if="showCalendar" v-model="formSet.zdyDate" style="text-align: left" type="date"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formSet.remark" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row justify="center">
        <el-col :span="12" style="text-align: center; margin-top: 20px">
          <el-button v-if="route.query.subType === 'kyc'" type="primary" @click="submitFormKyc()">
            提交
          </el-button>
          <el-button v-else type="primary" @click="submitForm()">提交</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.feedback {
  padding: 10px;
}

.demo-ruleForm {
  .el-form-item {
    display: flex;
    align-items: center;

    :deep(.el-form-item__content) {
      flex: 1;

      .el-select {
        width: 100%;
      }

      .el-treeSelect {
        width: 100%;
      }
    }
  }
}

.submit-btn {
  padding: 10px 40px;
}

.gird2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 5px;
}
</style>
