<script setup lang="ts">
defineOptions({
  name: "CustomerDetail",
  inheritAttrs: false,
});
import { signProductList } from "@/data/index.js";
const route = useRoute();
const router = useRouter();
const { custIsn, custTp, ctfNo } = route.query;
type ComponentKeys =
  | "BaseInfo"
  | "FinancialInfo"
  | "HoldProduct"
  | "CusBenefit"
  | "RiskRemind"
  | "CusDynamics"
  | "RelationshipView";
const examineRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const drawerVisible = ref(false);
const feedbackTypeFormVisible = ref(false);
const alldata = reactive<any>({});
const feedbackTypeForm = ref({
  method: "",
});
const time = ref(new Date());
const loading = ref(false);
const timeList = reactive<any>([]);
const activeName = ref<ComponentKeys>("BaseInfo");
// const activeTab = ref(1);
const certNoShow = ref("");
const contNumShow = ref("");
const feedbackTypeRef = ref();
const componentsMap: Record<ComponentKeys, any> = {
  BaseInfo: defineAsyncComponent(() => import("./component/baseInfo.vue")),
  FinancialInfo: defineAsyncComponent(() => import("./component/financialInfo.vue")),
  HoldProduct: defineAsyncComponent(() => import("./component/holdProduct.vue")),
  CusBenefit: defineAsyncComponent(() => import("./component/cusBenefit.vue")),
  RiskRemind: defineAsyncComponent(() => import("./component/riskRemind.vue")),
  CusDynamics: defineAsyncComponent(() => import("./component/cusDynamics.vue")),
  RelationshipView: defineAsyncComponent(() => import("./component/relationshipView.vue")),
};
const currentTabComponent = computed(() => componentsMap[activeName.value]);

const labelList = [
  {
    label: "基础信息",
    name: "BaseInfo",
    icon: "Memo",
  },
  {
    label: "财务信息",
    name: "FinancialInfo",
    icon: "Coin",
  },
  {
    label: "持有产品",
    name: "HoldProduct",
    icon: "Box",
  },
  {
    label: "客户权益",
    name: "CusBenefit",
    icon: "Money",
  },
  {
    label: "风险信息",
    name: "RiskRemind",
    icon: "Sunrise",
  },
  {
    label: "服务历史",
    name: "CusDynamics",
    icon: "Postcard",
  },
  {
    label: "关系图谱",
    name: "RelationshipView",
    icon: "DataAnalysis",
  },
];
const rules = {
  type: [{ required: true, message: "请选择反馈类型", trigger: "change" }],
  method: [{ required: true, message: "请选择反馈方式", trigger: "change" }],
};

const showInfo = (type: any) => {
  if (type == 1) {
    //   this.$api
    //     .custDetailShow({ hideStr: alldata.contNumHide })
    //     .then((result) => {
    //       if (result.code == 0) {
    //         contNumShow.value = result.data.relStr;
    //       }
    //     });
  } else {
    //   this.$api
    //     .custDetailShow({ hideStr: alldata.certNoHide })
    //     .then((result) => {
    //       if (result.code == 0) {
    //         certNoShow.value = result.data.relStr;
    //       }
    //     });
  }
};

const handleScroll = (e: any) => {
  if (e.target.scrollTop > 300) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};
const handleRead = () => {
  activeName.value = "CusDynamics";
  examineRef.value?.scrollTo({
    top: examineRef.value?.scrollHeight,
    behavior: "smooth",
  });
};
const notRead = computed(() => {
  if (
    alldata.dedqckdqNotDeal ||
    alldata.delcywdqNotDeal ||
    alldata.bxqjNotDeal ||
    alldata.cklsNotDeal ||
    alldata.cxgzNotDeal
  ) {
    return true;
  }
  return false;
});

// 营销反馈
const feedback = (type: any) => {
  // this.$api
  //   .checkTask({
  //     custIsn,
  //     ctfNo,
  //   })
  //   .then((res: any) => {
  //     if (res.data && res.data.result > 0) {
  //       return ElMessage.warning(
  //         "客户有待营销的精准营销活动，请在活动入口进行反馈~"
  //       );
  //     } else {
  if (type === "1") {
    jump(type);
  } else {
    feedbackTypeFormVisible.value = true;
  }
  //   }
  // });
};
const jump = (type: string) => {
  const params = {
    cust_type: custTp,
    cust_id: custIsn,
    cust_idcard: ctfNo,
    form_type: "2",
    subType: type === "1" ? "kyc" : "",
  };
  router.push({
    path: "/marketing/feedback",
    query: params,
  });
};
// 生命周期
// const drawerControl = () => {};
// 资产配置
const jumpDrawer2 = () => { };
const handleClick = (tab: any) => {
  activeName.value = tab.paneName;
};
const feedbackTypeSubmit = () => {
  feedbackTypeRef.value?.validate((valid: boolean) => {
    if (valid) {
      let subType = "";
      if (feedbackTypeForm.value.method === "kyc") {
        subType = "1";
      } else {
        subType = "";
      }
      feedbackTypeFormVisible.value = false;
      jump(subType);
    } else {
      return false;
    }
  });
};
const changeYear = (val: any) => {
  getTimeLine(new Date(val).getFullYear());
};
watch(
  () => drawerVisible,
  (newVal) => {
    if (newVal) {
      time.value = new Date();
      getTimeLine(new Date().getFullYear());
    }
  }
);

const getTimeLine = (time: any) => {
  // loading.value = true
  const params = {
    dataDtYear: time,
    custIsn,
    certNo: ctfNo,
    custTp,
  };
  // this.$api.custLifeCycle(params).then((res: any) => {
  //   if (res.code == 0) {
  //     Object.assign(timeList, res.data)
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};
</script>

<template>
  <div ref="examine" @scroll="handleScroll">
    <div v-if="alldata" class="count">
      <div class="right">
        <div class="top">
          <div class="ava">
            <div>
              <div class="avatar">
                <img v-if="alldata.gnd === '女'" src="@/assets/customer/w.png" />
                <img v-else src="@/assets/customer/m.png" />
              </div>
            </div>
            <div class="name">
              <div class="head">
                {{ alldata.custNm }}
                <img v-if="alldata.gnd === '女'" src="@/assets/customer/woman.png" style="width: 16px" />

                <img v-else src="@/assets/customer/man.png" style="width: 16px" />
                <div class="avatar-level">
                  <img v-if="alldata.custLvl" src="@/assets/customer/3.png" width="16" />
                  {{ alldata.custLvl
                  }}{{ alldata.lvlFullNm === "富裕客户" ? "潜力客户" : alldata.lvlFullNm }}
                </div>
                <div v-if="notRead" class="tips" @click="handleRead">
                  <i class="el-icon-warning"></i>
                  消息未处理
                </div>
              </div>
              <div class="level">
                <span>客户内码：</span>
                <span class="val">{{ alldata.custIsn }}</span>
                <span class="t2">年龄：</span>
                <span class="val">{{ alldata.age }}</span>
              </div>
              <div class="level">
                <span>证件号码：</span>
                <span class="val">
                  {{ certNoShow || alldata.certNo }}
                  <i class="el-icon-view icons" @click="showInfo(2)"></i>
                </span>
                <span class="t2">联系电话：</span>
                <span class="val">
                  {{ contNumShow || alldata.contNum }}
                  <i class="el-icon-view icons" @click="showInfo(1)"></i>
                </span>
              </div>
              <div class="level">
                画像标签：
                <el-tag v-for="(item, index) in alldata.custTagInfoVo?.keyTags" :key="index">
                  {{ item }}
                </el-tag>
              </div>
            </div>
            <div class="btn-group">
              <div @click="feedback('0')">
                <i class="el-icon-s-promotion"></i>
                营销触达
              </div>
              <div @click="feedback('1')">
                <i class="el-icon-s-order"></i>
                KYC采集
              </div>
              <div @click="drawerVisible = true">
                <i class="el-icon-share"></i>
                生命周期
              </div>
              <div @click="jumpDrawer2">
                <i class="el-icon-s-custom"></i>
                资产配置
              </div>
            </div>
            <div class="cloudy"></div>
          </div>
          <div class="content-list">
            <div class="top-title">基本信息</div>
            <div class="cusinfo">
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/12.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">联系地址:</span>
                  <span class="des">
                    {{ alldata.cntctAddr }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/12.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">客户生日:</span>
                  <span class="des">
                    {{ alldata.bthDt }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/7.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">婚姻状况:</span>
                  <span class="des">
                    {{ alldata.mrneSt }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/9.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">风险评估:</span>
                  <span class="des">
                    {{ alldata.riskEval }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/11.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">最高学历:</span>
                  <span class="des">
                    {{ alldata.highstEducDgre }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/10.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">职业:</span>
                  <span class="des">
                    {{ alldata.voctn }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/8.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">年收入:</span>
                  <span class="des">
                    {{ alldata.yrIncm }}
                  </span>
                </div>
              </div>
              <div class="cusinfo-item">
                <!-- <img class="img" src="@/assets/info/12.png" /> -->
                <div class="cusinfo-item-des">
                  <span class="title">工作单位:</span>
                  <span class="des">
                    {{ alldata.workUnit }}
                  </span>
                </div>
              </div>
            </div>
            <div class="lin-box">
              <div class="lin-msg lin">
                <div class="lin-left">
                  <div>AUM资产余额 (万元)</div>
                  <div>{{ alldata.custAumBal }}</div>
                </div>
                <div class="lin-center">
                  <div class="des">
                    <div class="des-title">比上日</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.balRatnLastDay) < 0,
                    }">
                      {{ alldata.balRatnLastDay || 0 }}
                    </div>
                  </div>
                </div>
                <div class="lin-right">
                  <div class="des">
                    <div class="des-title">比上月</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.balRatnLastMth) < 0,
                    }">
                      {{ alldata.balRatnLastMth || 0 }}
                    </div>
                  </div>
                  <!-- <img src="@/assets/overview/13.png" alt /> -->
                </div>
              </div>
              <div class="lin-msg lin">
                <div class="lin-left">
                  <div>存款余额 (万元)</div>
                  <div>{{ alldata.depBal }}</div>
                </div>
                <div class="lin-center">
                  <div class="des">
                    <div class="des-title">比上日</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.depRatnBalRatnLastDay) < 0,
                    }">
                      {{ alldata.depRatnBalRatnLastDay || 0 }}
                    </div>
                  </div>
                </div>
                <div class="lin-right">
                  <div class="des">
                    <div class="des-title">比上月</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.depRatnBalRatnLastMth) < 0,
                    }">
                      {{ alldata.depRatnBalRatnLastMth || 0 }}
                    </div>
                  </div>
                  <!-- <img src="@/assets/overview/14.png" alt /> -->
                </div>
              </div>
              <div class="lin-msg lin">
                <div class="lin-left">
                  <div>财富AUM资产余额 (万元)</div>
                  <div>{{ alldata.frtnAumBal }}</div>
                </div>
                <div class="lin-center">
                  <div class="des">
                    <div class="des-title">比上日</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.frtnAumLastDay) < 0,
                    }">
                      {{ alldata.frtnAumLastDay || 0 }}
                    </div>
                  </div>
                </div>
                <div class="lin-right">
                  <div class="des">
                    <div class="des-title">比上月</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.frtnAumLastMth) < 0,
                    }">
                      {{ alldata.frtnAumLastMth || 0 }}
                    </div>
                  </div>
                  <!-- <img src="@/assets/overview/16.png" alt /> -->
                </div>
              </div>
              <div class="lin-msg lin">
                <div class="lin-left">
                  <div>贷款余额 (万元)</div>
                  <div>{{ alldata.loanBal }}</div>
                </div>
                <div class="lin-center">
                  <div class="des">
                    <div class="des-title">比上日</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.loanBalCmprLd) < 0,
                    }">
                      {{ alldata.loanBalCmprLd || 0 }}
                    </div>
                  </div>
                </div>
                <div class="lin-right">
                  <div class="des">
                    <div class="des-title">比上月</div>
                    <div class="num" :class="{
                      resStyle: Number(alldata.loanBalCmprLm) < 0,
                    }">
                      {{ alldata.loanBalCmprLm || 0 }}
                    </div>
                  </div>
                  <!-- <img src="@/assets/overview/15.png" alt /> -->
                </div>
              </div>
            </div>
            <div class="top-title">关联度持有情况</div>
            <div class="pro-list">
              <div v-for="item in signProductList" :key="item.prop" class="pro-list-item" :class="{
                gray: alldata[item.prop] == '未办理' || alldata[item.prop] == null,
                blue: alldata[item.prop] == '已办理',
              }">
                <span class="pro-list-title">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-tabs ref="tabs" v-model="activeName" class="tabsContent" @tab-click="handleClick">
            <el-tab-pane v-for="item in labelList" :key="item.name" :name="item.name">
              <template #label>
                <span>
                  <el-icon class="custom-tabs-label">
                    <Component :is="item.icon" />
                  </el-icon>
                  <span class="custom-tabs-label-text">{{ item.label }}</span>
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <component :is="currentTabComponent" :custDetail="route.query"></component>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据" class="empty"></el-empty>
    <el-dialog v-model="feedbackTypeFormVisible" title="请选择" width="400" :modal="false">
      <el-form ref="feedbackTypeRef" :model="feedbackTypeForm" :rules="rules">
        <el-form-item label="反馈方式" prop="method">
          <el-radio-group v-model="feedbackTypeForm.method">
            <el-radio label="1">走访反馈</el-radio>
            <el-radio label="0">电访反馈</el-radio>
            <el-radio label="kyc">KYC反馈</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="padding-right: var(--el-dialog-padding-primary)">
          <el-button @click="feedbackTypeFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="feedbackTypeSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- <el-drawer :destroy-on-close="true" :modal-append-to-body="false" title="营销记录详情" size="100%" v-model="drawer"
      :modal="false" :with-header="false">
      <MarketingRecordDetails :mfId="mfId" @closepop="closepop"></MarketingRecordDetails>
    </el-drawer> -->
    <el-drawer v-model="drawerVisible" :append-to-body="true" title="生命周期事件" size="50%" :modal="false"
      :destroy-on-close="true">
      <div class="view-timeLine">
        <span class="demonstration">选择年份:</span>
        <el-date-picker v-model="time" type="year" placeholder="选择年" @change="changeYear"></el-date-picker>
        <div v-loading="loading" class="timeLine-box" element-loading-text="加载中">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in timeList" :key="index" :timestamp="item.dataDt" placement="top"
              :color="item.color">
              <el-card>
                <div class="e-line">{{ item.infoTp }}</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.icons {
  margin-left: 2px;
  cursor: pointer;
}

.tips {
  margin-left: 20px;
  font-size: 12px;
  color: #e67a3c;
  cursor: pointer;

  i {
    margin-right: 5px;
  }
}

.ava {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  // background: url("~@/assets/qy/bg.png") no-repeat;
  // background-size: 100% 100%;
  // border-radius: 6px;

  .avatar {
    width: calc(80px);
    height: calc(78px);
    z-index: 10;

    >img {
      width: 100%;
      height: 100%;
    }
  }

  .avatar-level {
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: 12px;

    // font-weight: bold;
    img {
      margin-right: 5px;
    }
  }

  .name {
    margin-left: 20px;
    margin-right: 40px;
    color: #333;
    font-weight: bolder;
    text-align: left;

    .head {
      display: flex;
      align-items: center;
      font-size: 20px;

      &>img {
        margin-left: 10px;
      }
    }

    .level {
      margin-top: 15px;

      img {
        position: relative;
        //   width: calc(32px / 2);
        //   height: calc(28px / 2);
        top: 3px;
      }

      font-size: 14px;
      color: #666;
      font-weight: normal;

      .val {
        display: inline-block;
        min-width: 200px;
        font-weight: bold;
      }

      :deep(.el-tag) {
        // display: inline-block;
        // background: #a0daf5;
        margin-right: 8px;
        height: 22px;
        padding: 2px 8px;
        font-size: 12px;
        border-radius: 17px;
        // margin-left: 8px;
        border: none;
        // color: #409EFF;
        text-align: center;
        // transition: transform 0.3s ease, box-shadow 0.3s ease;
        // animation: tagBounce 1s ease forwards;
      }
    }
  }

  .navBox {
    margin-right: 40px;

    .type {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .title {
        color: #666666;
        font-size: 16px;
      }

      .des {
        font-weight: bolder;
        font-size: 16px;
        color: #333333;
      }
    }
  }

  .btn-group {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    &>div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 40px;
      background-color: #6dadf3;
      color: #fff;

      &:hover {
        background: #6a9ffa;
        color: #fff;
      }

      cursor: pointer;
      border-radius: 8px;
      // box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.5);
    }
  }

  // .tagBox {
  //   display: flex;
  //   flex-wrap: wrap;
  //   gap: 8px; /* 标签间距 */
  //   justify-content: flex-start;
  //   // max-width: 30%;
  //   margin-top: 8px;

  // }
}

.pro-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;

  /* 可选的间距 */
  &-item {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    text-align: center;
    padding: 15px 0;
    border-radius: 4px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      /* 放大效果 */
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      /* 渐进的阴影 */
    }

    .pro-list-title {
      font-weight: 600;
      font-size: 14px;
      color: #fff;
    }

    // .pro-list-value {
    //   font-weight: bold;
    //   font-size: 14px;
    //   color: #999999;
    //   margin-left: 18px;
    // }
  }

  .gray {
    background: #ddd;
  }

  .blue {
    background: #639efa;
  }
}

// @keyframes tagBounce {
//   0% {
//     transform: scale(0.5);
//     opacity: 0;
//   }
//   50% {
//     transform: scale(1.3);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// }
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
}

.count {
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
  padding: 10px;
  background-color: #f0f2f5;
  height: auto;

  .right {
    width: 100%;

    .top {
      width: 100%;
      padding: 10px;
      background: url("@/assets/customer/bg.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 6px;

      .top-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 15px;
        text-align: left;
        color: #333333;
      }

      .cusinfo {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* 定义4列，每列平均分配剩余空间 */
        // grid-gap: 5px;

        /* 设置列之间的间隙为20px */
        .cusinfo-item {
          display: flex;
          align-items: center;
          // background: rgba(255, 255, 255, 0.32);
          // box-shadow: 0px 0px 12px 0px rgba(148, 166, 198, 0.26);
          // border-radius: 6px;
          padding: 10px;

          // border: 1px solid #ffffff;
          // transition: transform 0.3s ease, box-shadow 0.3s ease;
          // justify-content: space-between;
          // &:hover {
          //   transform: scale(1.05); /* 放大效果 */
          //   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* 渐进的阴影 */
          // }
          .img {
            width: 20px;
            height: 18px;
          }

          .cusinfo-item-des {
            // margin-left: 10px;

            .title {
              display: inline-block;
              min-width: 60px;
              text-align: right;
              color: #666666;
              font-size: 14px;
            }

            .des {
              font-weight: bold;
              font-size: 14px;
              color: #333333;
            }
          }
        }
      }

      .lines {
        height: 1px;
        background: #ebedf0;
        margin: 10px 0;
      }
    }

    .lin-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      /* 定义4列，每列平均分配剩余空间 */
      grid-gap: 10px;
      /* 设置列之间的间隙为20px */
      margin-top: 20px;
      margin-bottom: 15px;

      .lin-msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;

        .lin-left {
          text-align: left;

          >div:first-child {
            font-size: 14px;
            color: #666666;
            margin-bottom: 10px;
          }

          >div:nth-child(2) {
            font-size: 18px;
            font-weight: bold;
          }
        }

        .lin-center,
        .lin-right {

          // margin-left: 15%;
          .des {
            margin-bottom: 5px;
            font-size: 14px;
            text-align: center;

            .des-title {
              margin-right: 3px;
              margin-bottom: 10px;
              font-weight: 400;
              font-size: 14px;
              color: #666666;

              // &::before {
              //   content: "●";
              //   margin-right: 5px;
              //   font-size: 14px;
              //   color: #cccccc;
              // }
            }

            .num {
              font-size: 14px;
              // font-weight: bold;

              // color: #23c876;
              color: #e83e3e;

              &::before {
                content: "+";
                margin-right: -3px;
              }
            }

            .resStyle {
              // color: #e83e3e;
              color: #23c876;

              &::before {
                content: "";
                margin-right: 0 !important;
              }
            }
          }
        }
      }

      .lin {
        padding: 20px 30px 20px 20px;
        margin-bottom: 10px;
        background-color: rgba($color: #fff, $alpha: 0.5);
        // background: linear-gradient(100deg, #d7e6ff 0%, #f1f6ff 100%);
        // background-size: 100% 100%;
        border-radius: 6px;
        // transition: transform 0.3s ease, box-shadow 0.3s ease;
        //   &:hover {
        //     transform: scale(1.05); /* 放大效果 */
        //     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* 渐进的阴影 */
        //   }
      }
    }

    .msg {
      grid-template-columns: repeat(5, 1fr) !important;

      .lin {
        padding: 10px 30px;
        // background: linear-gradient(100deg, #d7e6ff 0%, #f1f6ff 100%) !important;
      }

      .lin-right {
        width: calc(100px / 2) !important;
        height: calc(98px / 2) !important;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .bottom {
      width: 100%;
      border-radius: 6px;
      padding: 10px 20px;
      background: #fff;
    }
  }
}

.t2 {
  margin-left: 20px;
}

:deep(.el-descriptions) {
  margin-bottom: 20px;

  .el-descriptions-item__cell {
    width: 100px !important;
  }

  .green {
    color: #2564d3;
  }

  .red {
    color: #e54646;
  }
}

:deep(.box-card) {
  margin-bottom: 20px;

  .el-card__header {
    .clearfix {
      display: flex !important;
      justify-content: space-between;
    }
  }

  .el-card__body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .el-tag--mini {
      min-height: 36px;
      padding: 8px;
      margin-bottom: 5px;
      margin-right: 10px;
      background-color: #4484f1;
      color: #fff;
    }
  }
}

.el-pagination {
  margin-top: 10px;
}

.border1 {
  border-bottom: 1px solid #ebedf0;
}

.type-buttom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 定义4列，每列平均分配剩余空间 */
  grid-gap: 20px;

  /* 设置列之间的间隙为20px */
  .tab {
    background: #f2f4f7;
    border-radius: 6px;
    font-weight: 400;
    font-size: 16px;
    color: #828588;
    padding: 8px 0;
    cursor: pointer;
  }

  .active {
    background: #3e81f2;
    color: #fff;
  }
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
}

.view-timeLine {
  height: 100%;
  text-align: left;
  padding-left: 20px;
  padding-bottom: 30px;

  .timeLine-box {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: 100%;
    margin-top: 20px;
  }
}

.e-line {
  font-size: 16px;
  font-weight: bold;
}
</style>
<style lang="scss">
.tabType {
  color: #67c23a;
}

.custom-tabs-label {
  vertical-align: middle;
}

.custom-tabs-label-text {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
<style lang="scss">
.cloudy {
  -webkit-animation: cloudy 5s ease-in-out infinite;
  animation: cloudy 5s ease-in-out infinite;
  background: #ffffff;
  border-radius: 50%;
  box-shadow:
    #ffffff 65px -15px 0 -5px,
    #ffffff 25px -25px,
    #ffffff 30px 10px,
    #ffffff 60px 15px 0 -10px,
    #ffffff 85px 5px 0 -5px;
  height: 50px;
  width: 50px;
  // margin-left: 30%;
  // margin-right: 100px;
  // margin-top: 35px;
  // z-index: -999;
  position: absolute;
  top: 50%;
  right: 39%;
  transform: translateY(-50%);
}

@-webkit-keyframes cloudy {
  50% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
}

@keyframes cloudy {
  50% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
}

@-webkit-keyframes cloudy_shadow {
  50% {
    -webkit-transform: translateY(30px) scale(1);
    transform: translateY(30px) scale(1);
    opacity: 0.05;
  }
}

@keyframes cloudy_shadow {
  50% {
    -webkit-transform: translateY(30px) scale(1);
    transform: translateY(30px) scale(1);
    opacity: 0.05;
  }
}

.content-list {
  padding: 20px;
  background-color: rgba($color: #fff, $alpha: 0.68);
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.12);
}
</style>
