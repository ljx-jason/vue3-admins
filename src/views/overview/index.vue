<template>
  <div class="overview">
    <div class="top">
      <!-- 日期面板 -->
      <div class="date-box">
        <Calendar :userObj="{
          level: orgLevel,
          subNo: branchNo,
          orgNo: orgNo,
          userId: managerNo,
        }" :pageType="pageType" @reflash="reflash" @showDraw="showDraw" />
      </div>
      <!-- 待办事项 -->
      <div class="todo-box">
        <div class="todo-head">
          <div class="com-title">待办事项</div>
          <div class="todo-nav">
            <el-button link type="primary" @click="handleTodo('tx')">重要提醒</el-button>
            <el-button link type="primary" class="todo-nav-btn-center" @click="handleTodo('gen')">
              一般提醒
            </el-button>
            <el-button link type="primary" @click="handleTodo('bus')">商机任务</el-button>
          </div>
        </div>
        <div v-if="todoType == 'tx'" class="todo-list">
          <div v-for="(item, index) in todoList" :key="item.id" class="todo-item" @click="todoJumpPage(index, 'tx')">
            <!-- <div class="current">总行下发</div> -->
            <div class="todo-img">
              <img :src="getImageUrl(index + 1)" alt />
            </div>
            <div class="todo-content">
              <div class="todo-title">{{ item.title }}</div>
              <div class="todo-value">
                <div>
                  待处理
                  <span class="num">{{ item.unfinished }}</span>
                </div>
                <div>
                  本月已处理
                  <span class="num">{{ item.accomplish }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="todoType == 'bus'" class="task-list">
          <div v-for="(item, index) in taskList2" :key="item.id" class="task-item">
            <div class="task-img">
              <el-progress type="circle" :percentage="getPercentage(item.accomplish, item.count)" :width="80"
                :show-text="false" :color="index == 1 ? '#FFAA33' : index == 2 ? '#00B8DF' : '#3e81f2'"></el-progress>
              <div class="child-tit">
                <div>任务数</div>
                <div>{{ item.count }}</div>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">{{ item.title }}</div>
              <div class="task-value">
                <div>
                  未营销
                  <span class="num">{{ item.unfinished }}</span>
                </div>
                <div class="alread">
                  今日已营销
                  <span class="num">{{ item.accomplish }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="todo-list">
          <div v-for="(item, index) in todoList2" :key="item.id" class="todo-item" @click="todoJumpPage(index, 'gen')">
            <!-- <div class="current">总行下发</div> -->
            <div class="todo-img">
              <img :src="getImageUrl(index + 1)" alt />
            </div>
            <div class="todo-content">
              <div class="todo-title">{{ item.title }}</div>
              <div class="todo-value">
                <div>
                  待处理
                  <span class="num">{{ item.unfinished }}</span>
                </div>
                <div>
                  本月已处理
                  <span class="num">{{ item.accomplish }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 每日任务 -->
      <div class="task-box">
        <div class="com-title">每日任务</div>
        <div class="task-list">
          <div v-for="(item, index) in taskList" :key="item.id" class="task-item" @click="taskJumpPage(index)">
            <div class="task-img">
              <el-progress type="circle" :percentage="getPercentage(item.finishCount, item.needCount)" :width="70"
                :show-text="false" :color="index == 1 ? '#FFAA33' : index == 2 ? '#00B8DF' : '#3e81f2'"></el-progress>
              <div class="child-tit">
                <div>总目标</div>
                <div>{{ item.needCount }}</div>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">{{ item.title }}</div>
              <div class="task-value">
                <div>
                  待完成
                  <span class="num">{{ item.waitCount }}</span>
                </div>
                <div class="alread">
                  已完成
                  <span class="num">{{ item.finishCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="myCust">
        <iframe style="width: 100%; height: 100%" :src="iframe1" frameborder="0" scrolling="auto"></iframe>
      </div>
      <!-- 分层统计 -->
      <div class="levelCount">
        <iframe style="width: 100%; height: 100%" :src="iframe2" frameborder="0" scrolling="auto"></iframe>
      </div>
    </div>
    <Toggle @changeView="changeView" />
    <!-- <el-drawer
      :destroy-on-close="true"
      :modal-append-to-body="true"
      title="客户详情"
      size="100%"
      :modal="false"
      :visible.sync="drawer"
      :with-header="false"
    >
      <Examine
        v-if="drawer"
        :custDetailQo="custDetailQo"
        @closepop="closepop"
      ></Examine>
    </el-drawer> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Overview",
  inheritAttrs: false,
});
import Calendar from "./component/calendar.vue"; // 引入 Calendar 组件
import Toggle from "./component/toggle.vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";

const orgLevel = ref("");
const branchNo = ref("");
const orgNo = ref("");
const managerNo = ref("");
const pageType = ref("1");
const formattedDate = ref("");
const todoType = ref("tx");

const taskList = ref([
  {
    id: 1,
    title: "每日营销",
    finishCount: 0,
    waitCount: 0,
    needCount: 0,
  },
  {
    id: 2,
    title: "活动开展量",
    finishCount: 0,
    waitCount: 0,
    needCount: 0,
  },
  {
    id: 3,
    title: "KYC采集",
    finishCount: 0,
    waitCount: 0,
    needCount: 0,
  },
  {
    id: 4,
    title: "持续跟踪",
    finishCount: 0,
    waitCount: 0,
    needCount: 0,
  },
]);

const taskList2 = ref([
  {
    id: 1,
    title: "总行商机",
    count: 0,
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 2,
    title: "支行商机",
    count: 0,
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 3,
    title: "个人商机",
    count: 0,
    accomplish: 0,
    unfinished: 0,
  },
]);

const todoList = ref([
  {
    id: 1,
    title: "大额定期存款到期",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 2,
    title: "大额理财业务到期",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 3,
    title: "保险期交提醒",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 4,
    title: "存款流失",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 5,
    title: "客户生日",
    accomplish: 0,
    unfinished: 0,
  },
]);

const todoList2 = ref([
  {
    id: 1,
    title: "大额存款流入流出",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 2,
    title: "客户层级变动",
    accomplish: 0,
    unfinished: 0,
  },
  {
    id: 3,
    title: "证件到期提醒",
    accomplish: 0,
    unfinished: 0,
  },
]);

const iframe1 = computed(() => {
  let fr = "";
  let str = "";
  const env = import.meta.env.MODE;
  if (pageType.value === "2") {
    str = "首页_管户概况_网点.frm";
  } else {
    str = "首页_管户概况.frm";
  }
  if (env == "production") {
    console.log(
      `http://lcreport.fumin.group/webroot/decision/view/report?viewlet=鹿城农商/客户关系管理系统/${str}`
    );
    fr = `http://lcreport.fumin.group/webroot/decision/view/report?viewlet=鹿城农商/客户关系管理系统/${str}`;
  } else {
    fr = `http://192.168.30.80:8088/webroot/decision/view/form?viewlet=lucheng/${str}`;
  }

  return (
    fr +
    "&userid=" +
    managerNo.value +
    "&auth=" +
    orgLevel.value +
    "&org_no=" +
    orgNo.value +
    "&branch_no=" +
    branchNo.value
  );
});

const iframe2 = computed(() => {
  let fr = "";
  let str = "";
  const env = import.meta.env.MODE;
  if (pageType.value === "2") {
    str = "首页_分层饼图_网点.frm";
  } else {
    str = "首页_分层饼图.frm";
  }
  if (env == "production") {
    console.log(
      `http://lcreport.data.view/webroot/decision/view/report?viewlet=鹿城农商/客户关系管理系统/${str}`
    );
    fr = `http://lcreport.data.view/webroot/decision/view/report?viewlet=鹿城农商/客户关系管理系统/${str}`;
  } else {
    fr = `http://192.168.30.80:8088/webroot/decision/view/form?viewlet=lucheng/${str}`;
  }

  return (
    fr +
    "&userid=" +
    managerNo.value +
    "&auth=" +
    orgLevel.value +
    "&org_no=" +
    orgNo.value +
    "&branch_no=" +
    orgNo.value
  );
});

const userStore = useUserStore();
const router = useRouter();

// 动态导入图片

// 获取图片 URL 的函数
const getImageUrl = (index: any) => {
  let path = "q" + index + ".png";
  const url = new URL(`@/assets/overview_new/${path}`, import.meta.url).href;
  return url;
};

onMounted(() => {
  try {
    let userMsg: any = userStore.userInfo;
    branchNo.value = userMsg.branch;
    orgNo.value = userMsg.orgNo;
    managerNo.value = userMsg.userId;

    if (userMsg.permissions && userMsg.permissions.length) {
      if (userMsg.permissions.includes("HEAD")) {
        orgLevel.value = "HEAD";
      } else if (userMsg.permissions.includes("BRANCH")) {
        orgLevel.value = "BRANCH";
      } else if (userMsg.permissions.includes("PRESENT")) {
        orgLevel.value = "PRESENT";
      } else if (userMsg.permissions.includes("PERSONAL")) {
        orgLevel.value = "PERSONAL";
      }
    } else {
      orgLevel.value = "PERSONAL";
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    formattedDate.value = `${year}-${month}-${day}`;
    reflash(undefined);
  } catch (error) {
    console.error(error);
  }
  window.addEventListener("message", handleMessage, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage, false);
});

const handleMessage = (event: any) => {
  // 处理接收到的消息
  if (event.data == "FineReport!") {
    router.push("/myCustomer");
  }
};

const changeView = (val: any) => {
  pageType.value = val;
  reflash(undefined);
};

const reflash = (date: any) => {
  if (date) {
    formattedDate.value = date.day;
  }
  getDayTask();
  getBacklog();
  getEasyBacklog();
  getBusData();
};
// 每日任务
const getDayTask = () => {
  // const params = {
  //   level: orgLevel.value,
  //   subNo: branchNo.value,
  //   orgNo: orgNo.value,
  //   userId: managerNo.value,
  //   pageType: pageType.value,
  //   taskDate: formattedDate.value,
  // };
  // this.$api.taskViewDailyTaskCount(params).then((res) => {
  //   if (res.code == 0) {
  //     taskList.value[0]["finishCount"] = res.data?.finishTelCount;
  //     taskList.value[0]["waitCount"] = res.data?.waitTelCount;
  //     taskList.value[0]["needCount"] = res.data?.needTelCount;
  //     taskList.value[1]["finishCount"] = res.data?.actDealCount;
  //     taskList.value[1]["waitCount"] = res.data?.actNotDealCount;
  //     taskList.value[1]["needCount"] = res.data?.actNeedCount;
  //     taskList.value[2]["finishCount"] = res.data?.finishKycCount;
  //     taskList.value[2]["waitCount"] = res.data?.waitKycCount;
  //     taskList.value[2]["needCount"] = res.data?.needKycCount;
  //     taskList.value[3]["finishCount"] = res.data?.trackDealCount;
  //     taskList.value[3]["waitCount"] = res.data?.trackNotDealCount;
  //     taskList.value[3]["needCount"] = res.data?.trackNeedCount;
  //   }
  // });
};

// 重要提醒
const getBacklog = () => {
  // const params = {
  //   pageType: pageType.value,
  //   date: formattedDate.value,
  // };
  // this.$api.backlog(params).then((res) => {
  //   if (res.code == 0) {
  //     todoList.value[0]["accomplish"] = res.data?.DECKDQ.accomplish;
  //     todoList.value[0]["unfinished"] = res.data?.DECKDQ.unfinished;
  //     todoList.value[1]["accomplish"] = res.data?.DELC.accomplish;
  //     todoList.value[1]["unfinished"] = res.data?.DELC.unfinished;
  //     todoList.value[2]["accomplish"] = res.data?.BXQJ.accomplish;
  //     todoList.value[2]["unfinished"] = res.data?.BXQJ.unfinished;
  //     todoList.value[3]["accomplish"] = res.data?.CKLS.accomplish;
  //     todoList.value[3]["unfinished"] = res.data?.CKLS.unfinished;
  //     todoList.value[4]["accomplish"] = res.data?.SRTX.accomplish;
  //     todoList.value[4]["unfinished"] = res.data?.SRTX.unfinished;
  //   }
  // });
};

// 一般提醒
const getEasyBacklog = () => {
  // const params = {
  //   pageType: pageType.value,
  //   date: formattedDate.value,
  // };
  // this.$api.easyBacklog(params).then((res) => {
  //   if (res.code == 0) {
  //     todoList2.value[0]["accomplish"] = res.data?.DECKLRLC.accomplish;
  //     todoList2.value[0]["unfinished"] = res.data?.DECKLRLC.unfinished;
  //     todoList2.value[1]["accomplish"] = res.data?.KHCJBD.accomplish;
  //     todoList2.value[1]["unfinished"] = res.data?.KHCJBD.unfinished;
  //     todoList2.value[2]["accomplish"] = res.data?.ZJDQTX.accomplish;
  //     todoList2.value[2]["unfinished"] = res.data?.ZJDQTX.unfinished;
  //   }
  // });
};

// 待办事项 - 商机任务
const getBusData = () => {
  // const params = {
  //   pageType: pageType.value,
  //   date: formattedDate.value,
  // };
  // this.$api.marketingActivityBacklog(params).then((res) => {
  //   if (res.code == 0) {
  //     taskList2.value[0]["count"] = res.data?.head?.count;
  //     taskList2.value[0]["accomplish"] = res.data?.head?.accomplish;
  //     taskList2.value[0]["unfinished"] = res.data?.head?.unfinished;

  //     taskList2.value[1]["count"] = res.data?.branch?.count;
  //     taskList2.value[1]["accomplish"] = res.data?.branch?.accomplish;
  //     taskList2.value[1]["unfinished"] = res.data?.branch?.unfinished;

  //     taskList2.value[2]["count"] = res.data?.person?.count;
  //     taskList2.value[2]["accomplish"] = res.data?.person?.accomplish;
  //     taskList2.value[2]["unfinished"] = res.data?.person?.unfinished;
  //   }
  // });
};
// 每日任务跳转
const taskJumpPage = (index: number) => {
  switch (index) {
    case 0:
      router.push({
        path: "/DailyPhoneCallInquiry/DailyVisitsAndQueriesList",
      });
      break;
    case 1:
      router.push({
        path: "/modelInformationManagement/MarketingActivityQuery",
      });
      break;
    case 2:
      router.push({ path: "/KYCrecord/DailyVisitsAndQueriesList" });
      break;
    case 3:
      router.push({
        path: "/FollowingCrecord/DailyVisitsAndQueriesList",
      });
      break;
  }
};

// 待办事项跳转
const todoJumpPage = (index: number, type: string) => {
  // 重要提醒
  if (type == "tx") {
    switch (index) {
      case 0:
        router.push({ path: "/importantMessage/dqckdq" });
        break;
      case 1:
        router.push({ path: "/importantMessage/lcywdq" });
        break;
      case 2:
        router.push({ path: "/importantMessage/bxqjtx" });
        break;
      case 3:
        router.push({ path: "/importantMessage/ckls" });
        break;
      case 4:
        router.push({ path: "/importantMessage/srtx" });
        break;
    }
    // 一般提醒
  } else if (type == "gen") {
    switch (index) {
      case 0:
        router.push({
          path: "/generalMessage/contentQuery",
          query: { type: 1 },
        });
        break;
      case 1:
        router.push({
          path: "/generalMessage/contentQuery",
          query: { type: 2 },
        });
        break;
      case 2:
        router.push({
          path: "/generalMessage/contentQuery",
          query: { type: 3 },
        });
        break;
    }
  }
};
// 切换类型
const handleTodo = (type: string) => {
  todoType.value = type;
  if (type == "bus") {
    getBusData();
  } else if (type == "gen") {
    getEasyBacklog();
  } else if (type == "tx") {
    getBacklog();
  }
};
const getPercentage = (idxNm: number, idxCrnVal: number) => {
  if (!idxCrnVal) return 0;
  let num = (idxNm / idxCrnVal) * 100;
  return num;
};
const showDraw = () => { };
</script>

<style scoped lang="scss">
.overview {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #333333;
}

.com-title {
  position: relative;
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(51, 51, 51);
  text-align: left;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0.1875rem;
    height: 1rem;
    content: "";
    background: #333333;
    border-radius: 0.125rem;
    transform: translateY(-50%);
  }
}

.top {
  display: flex;

  // justify-content: space-between;
  &>div {
    margin-left: 5px;

    &:first-child {
      margin-left: 0;
    }
  }

  .date-box {
    // flex: .55;
    // width:  890px;
    width: 65.57rem;
    height: 515px;
    // height: 36.79rem;
    // height: 50%;
    padding: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 6px;
  }

  .todo-box {
    // flex: calc(0.45 / 2);
    // width:360px;
    width: 28.71rem;
    padding: 15px;
    // height: 515px;
    background: #ffffff;
    border-radius: 6px;

    .todo-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .todo-nav {
      .todo-nav-btn-center {
        margin-left: 10px;
      }
    }

    .todo-list {

      // margin-top: 15px;
      .todo-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 76px;
        padding: 15px;
        margin-top: 15px;
        cursor: pointer;
        background: #f8f8f8;
        border-radius: 6px;

        .current {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 24px;
          font-size: 12px;
          line-height: 24px;
          color: #707f99;
          background: #e4edfd;
          border-radius: 0px 6px 0px 6px;
        }

        .todo-img {
          width: 46px;
          height: 46px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .todo-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          height: 100%;
          margin-left: 20px;

          .todo-title {
            font-weight: bold;
          }

          .todo-value {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &>div {
              color: rgba($color: #333, $alpha: 0.7) span {
                font-weight: bold;
              }

              .num {
                margin-left: 7px;
              }

              &:first-of-type {
                margin-right: 20px;

                &::before {
                  margin-right: 5px;
                  font-size: 18px;
                  color: #cccccc;
                  content: "●";
                }
              }

              &:last-of-type {
                &::before {
                  margin-right: 5px;
                  font-size: 18px;
                  color: #3e81f2;
                  content: "●";
                }
              }
            }
          }
        }
      }
    }

    .task-list {

      // margin-top: 15px;
      .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 135px;
        padding: 15px;
        margin-top: 15px;
        cursor: pointer;
        background: #f8f8f8;
        border-radius: 6px;

        .task-img {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .child-tit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          line-height: 1.5;
          transform: translate(-45%, -35%);

          div {
            font-size: 14px;
            color: #333;

            &:last-child {
              font-size: 1.14rem;
              font-weight: bold;
              color: #333;
            }
          }
        }

        .task-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;
          height: 100%;
          padding: 10px 0;
          margin-left: 20px;

          .task-title {
            font-weight: bold;
          }

          .task-value {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &>div {
              color: rgba($color: #333, $alpha: 0.7) span {
                font-weight: bold;
              }

              .num {
                margin-left: 7px;
              }

              &:first-of-type {
                margin-right: 20px;

                &::before {
                  margin-right: 5px;
                  font-size: 18px;
                  color: #cccccc;
                  content: "●";
                }
              }
            }

            .alread {
              &::before {
                margin-right: 5px;
                font-size: 18px;
                color: #3e81f2;
                content: "●";
              }
            }
          }
        }

        &:nth-of-type(2) {
          .alread {
            &::before {
              color: #ffaa33 !important;
            }
          }
        }

        &:nth-of-type(3) {
          .alread {
            &::before {
              color: #00b8df !important;
            }
          }
        }
      }

      :deep(.el-progress__text) {
        font-weight: bold;
        line-height: 1.6;
        color: #333;
      }
    }
  }

  .task-box {
    // flex: calc(0.45 / 2);
    // width: 360px;
    width: 28.71rem;
    padding: 15px;
    // height: 515px;
    background: #ffffff;
    border-radius: 6px;

    .task-list {

      // margin-top: 15px;
      .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 99px;
        padding: 10px 15px;
        margin-top: 15px;
        cursor: pointer;
        background: #f8f8f8;
        border-radius: 6px;

        .task-img {
          position: relative;
          top: -4px;
          width: 70px;
          height: 70px;
        }

        .child-tit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          line-height: 1.5;
          transform: translate(-45%, -35%);

          div {
            font-size: 14px;
            color: #333;

            &:last-child {
              font-size: 1.14rem;
              font-weight: bold;
              color: #333;
            }
          }
        }

        .task-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;
          height: 100%;
          // padding: 10px 0;
          margin-left: 20px;

          .task-title {
            font-weight: bold;
          }

          .task-value {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &>div {
              color: rgba($color: #333, $alpha: 0.7) span {
                font-weight: bold;
              }

              .num {
                margin-left: 7px;
              }

              &:first-of-type {
                margin-right: 20px;

                &::before {
                  margin-right: 5px;
                  font-size: 18px;
                  color: #cccccc;
                  content: "●";
                }
              }
            }

            .alread {
              &::before {
                margin-right: 5px;
                font-size: 18px;
                color: #3e81f2;
                content: "●";
              }
            }
          }
        }

        &:nth-of-type(2) {
          .alread {
            &::before {
              color: #ffaa33 !important;
            }
          }
        }

        &:nth-of-type(3) {
          .alread {
            &::before {
              color: #00b8df !important;
            }
          }
        }
      }

      :deep(.el-progress__text) {
        font-weight: bold;
        line-height: 1.6;
        color: #333;
      }
    }
  }
}

.bottom {
  display: flex;
  // justify-content: space-between;
  margin-top: 5px;

  // height: calc(100% - 520px);
  &>div {
    margin-left: 5px;

    &:first-child {
      margin-left: 0;
    }
  }

  .myCust {
    // flex: calc(0.45 / 2);
    width: 28.71rem;
    height: 25.4rem;
    padding: 15px;
    // height: calc(100% - 520px);
    background: #ffffff;
    border-radius: 0.43rem;

    .myCust-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .myCust-nav {
      // color: #E6E6E6;
      cursor: pointer;
      border: 1px solid #e6e6e6;
    }

    .myCust-list {
      .myCust-item {
        width: 100%;
        height: 6.64rem;
        padding: 15px 20px;
        margin-top: 15px;
        text-align: left;

        .myCust-title {
          color: #666666;
        }

        .myCust-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 68%;
          margin-top: 5px;

          .myCust-val {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;

            &>div {
              margin-top: 5px;
            }

            .number {
              font-size: 1.29rem;
              font-weight: bold;
              color: #333333;
            }

            .status {
              font-size: 0.86rem;
              color: #666666;

              &-num {
                font-weight: Bold;
                color: #3e81f2;
              }
            }

            .than {
              font-size: 0.86rem;
              color: #666666;

              &::before {
                margin-right: 4px;
                font-size: 12px;
                line-height: 0.86rem;
                color: #666666;
                content: "●";
              }

              &-num {
                color: #e83e3e;
              }
            }
          }
        }
      }

      .myCust-item:first-child {
        background: url("@/assets/overview_new/g1.png") no-repeat;
        background-size: 100% 100%;
      }

      .myCust-item:nth-child(2) {
        background: url("@/assets/overview_new/g2.png") no-repeat;
        background-size: 100% 100%;
      }

      .myCust-item:nth-child(3) {
        background: url("@/assets/overview_new/g3.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .levelCount {
    display: flex;
    // flex: 0.55;
    width: calc(65.57rem + 28.71rem);
    height: 25.4rem;
    padding: 15px;
    // height: calc(100% - 520px);
    background: #ffffff;
    border-radius: 0.43rem;

    .pie {
      width: calc(100% / 3);
      height: 100%;
      // border: 1px solid #EBEDF0;
      // &:last-child {
      //   border: none;
      // }
    }
  }

  .score {
    // flex: calc(0.45 / 2);
    width: 28.71rem;
    height: 25.21rem;
    // height: calc(100% - 520px);
    padding: 15px;
    background: #ffffff;
    border-radius: 0.43rem;

    .score-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn {
      margin-right: 10px;
    }

    .score-nav {
      // color: #E6E6E6;
      cursor: pointer;
      border: 1px solid #e6e6e6;
    }

    .score-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .arrow {
        width: 2rem;
        height: 2rem;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .list-content {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        height: 2.43rem;
        padding: 15px;
        margin: 10px;
        background: #f8f8f8;
        border-radius: 0.29rem;

        .tit {
          margin-left: 20px;
          font-size: 14px;
          color: #666666;
        }

        .val {
          font-size: 14px;
          font-weight: bold;
          color: #3e81f2;
        }
      }
    }

    .score-chart {}
  }
}
</style>
