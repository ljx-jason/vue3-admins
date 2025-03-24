<script setup lang="ts">
const props = defineProps({
  userObj: {
    type: Object,
    default: () => { },
  },
  pageType: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["showDraw", "reflash"]);

const calendarDate = ref(new Date());

const dialogVisible = ref(false);
const isCount = ref(false);
const isRemind = ref(false);
const loading = ref(false);

const index = ref(1);
const size = ref(10);
const total = ref(0);
const activeTab = ref("ALL");

const remindData = ref([]);
const tableData = ref([]);
const msgDataArr = ref([]);

// 获取当前年份
const currentYear = computed(() => {
  return calendarDate.value.getFullYear();
});

// 获取当前月份（注意：月份从 0 开始，所以加 1）
const currentMonth = computed(() => {
  return calendarDate.value.getMonth() + 1;
});

// 日历当前日期
const currentDay = (data: any) => {
  return data?.day;
};

// 初始化日期
// const initDate = computed(() => {
//   const currentDate = calendarDate.value;
//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
//   const day = String(currentDate.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// });

// 当前日期
const currentDate = computed(() => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const showRemind = () => {
  dialogVisible.value = true;
  isCount.value = false;
  isRemind.value = true;
  getRmind();
};

// 备忘录
const getRmind = () => {
  // loading.value = true;
  // LogAPI.memoApi({
  //   creator: props.userObj.userId,
  //   startDate: initDate.value,
  //   endDate: initDate.value,
  //   index: index.value,
  //   size: size.value,
  // })
  //   .then((res: any) => {
  //     if (res.code == 0) {
  //       remindData.value = res.data.list;
  //       total.value = res.data.total;
  //     }
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
};

onMounted(() => {
  getMessage();
});

watch(
  () => props.pageType,
  () => {
    getMessage();
  }
);
//消息笔数
const getMessage = () => {
  // LogAPI.calMsgTaskQuery({
  //   pageType: props.pageType,
  //   yearMonth:
  //     currentYear.value +
  //     "-" +
  //     (currentMonth.value > 9 ? currentMonth.value : "0" + currentMonth.value),
  //   level: props.userObj.level,
  //   subNo: props.userObj.subNo,
  //   orgNo: props.userObj.orgNo,
  //   userId: props.userObj.userId,
  //   msgType: activeTab.value,
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     msgDataArr.value = res.data;
  //   }
  // });
};

// 消息列表
const getCalMsgTaskQueryList = () => {
  // loading.value = true;
  // const params = {
  //   pageType: props.pageType,
  //   taskDate: date.day,
  //   level: props.userObj.level,
  //   subNo: props.userObj.subNo,
  //   orgNo: props.userObj.orgNo,
  //   userId: props.userObj.userId,
  //   msgType: activeTab.value,
  // };
  // LogAPI.calMsgTaskQueryList(params)
  //   .then((res: any) => {
  //     if (res.code == 0) {
  //       tableData.value = res.data;
  //     }
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
};

const handleClick = (row: any) => {
  emit("showDraw", row);
};

const clickDateCell = (date: Date) => {
  emit("reflash", date);
};

// 展示列表
const showCount = (date: Date) => {
  dialogVisible.value = true;
  isCount.value = true;
  isRemind.value = false;
  getCalMsgTaskQueryList(date);
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const queryTab = (val: string) => {
  activeTab.value = val;
  getMessage();
};

// 切换到上一年
const goToPreviousYear = () => {
  const newDate = new Date(calendarDate.value);
  newDate.setFullYear(newDate.getFullYear() - 1); // 年份减 1
  calendarDate.value = newDate;
  getMessage();
};
// 切换到下一年
const goToNextYear = () => {
  const newDate = new Date(calendarDate.value);
  newDate.setFullYear(newDate.getFullYear() + 1); // 年份加 1
  calendarDate.value = newDate;
  getMessage();
};

// 切换到上一月
const goToPreviousMonth = () => {
  const newDate = new Date(calendarDate.value);
  newDate.setMonth(newDate.getMonth() - 1); // 月份减 1
  calendarDate.value = newDate;
  getMessage();
};
// 切换到下一月
const goToNextMonth = () => {
  const newDate = new Date(calendarDate.value);
  newDate.setMonth(newDate.getMonth() + 1); // 月份加 1
  calendarDate.value = newDate;
  getMessage();
};

const handleSizeChange = (val: number) => {
  index.value = 1;
  size.value = val;
  getRmind();
};

const handleCurrentChange = (val: number) => {
  index.value = val;
  getRmind();
};
</script>

<template>
  <div class="parent-div">
    <div class="type-buttom1">
      <div class="tab" :class="{ active: activeTab == 'ALL' }" @click="queryTab('ALL')">全部</div>
      <div class="tab" :class="{ active: activeTab == 'DECKDQ' }" @click="queryTab('DECKDQ')">
        存款到期
      </div>
      <div class="tab" :class="{ active: activeTab == 'DELC' }" @click="queryTab('DELC')">
        理财到期
      </div>
      <div class="tab" :class="{ active: activeTab == 'BXQJ' }" @click="queryTab('BXQJ')">
        保险到期
      </div>
      <div class="tab" :class="{ active: activeTab == 'CKLS' }" @click="queryTab('CKLS')">
        存款流失
      </div>
      <div class="tab" :class="{ active: activeTab == 'SRTX' }" @click="queryTab('SRTX')">
        生日提醒
      </div>
    </div>
    <div class="defined-header">
      <div class="arrow-box">
        <div class="arrow" @click="goToPreviousYear">
          <img src="@/assets/overview_new/l2.png" alt />
        </div>
        <div class="arrow" @click="goToPreviousMonth">
          <img src="@/assets/overview_new/l1.png" alt />
        </div>
      </div>

      <span class="current-month">{{ currentYear }}年{{ currentMonth }}月</span>

      <div class="arrow-box">
        <div class="arrow" @click="goToNextMonth">
          <img src="@/assets/overview_new/r1.png" alt />
        </div>
        <div class="arrow" @click="goToNextYear">
          <img src="@/assets/overview_new/r2.png" alt />
        </div>
      </div>
      <div class="unit">金额:(万元)</div>
    </div>
    <el-calendar ref="calendar" v-model="calendarDate" :first-day-of-week="7">
      <template #date-cell="{ data }">
        <div class="calendar-cell" @click="clickDateCell(data)">
          <div class="cell-line">
            <div :class="currentDay(data) === currentDate ? 'cru' : ''" class="days">
              {{ new Date(currentDay(data)).getDate() }}
            </div>
            <el-button v-if="currentDay(data) == currentDate" link type="primary" style="margin-left: 5px"
              @click.stop="showRemind(data)">
              备忘录
            </el-button>
          </div>
          <div v-for="(v, i) in msgDataArr" :key="i">
            <div v-if="currentDay(data) == v.remindDt"
              :class="['betweenCenter', currentDay(data) == v.remindDt ? 'cruBox' : '']">
              <div style="color: #3e81f2" class="tip">
                <span @click.stop="showCount(data)">笔数:{{ v.msgCount }}</span>
              </div>
              <div class="tip">金额:{{ v.msgAmt }}</div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
    <div v-if="dialogVisible" class="custom-dialog-overlay" @click.self="closeDialog">
      <div class="custom-dialog">
        <div class="custom-dialog-header">
          <span class="head-tit">详情信息</span>
          <button class="close-btn" @click="closeDialog">X</button>
        </div>
        <div class="custom-dialog-body">
          <div v-if="isCount" style="height: 380px">
            <el-table ref="multipleTable" v-loading="loading" height="100%" :data="tableData" style="width: 100%">
              <el-table-column prop="custNm" label="客户姓名"></el-table-column>
              <el-table-column prop="certNo" label="证件号"></el-table-column>
              <!-- <el-table-column prop="cntctNo" label="联系电话">
              </el-table-column> -->
              <el-table-column prop="msgNm" label="消息名称"></el-table-column>
              <el-table-column prop="msgCont" min-width="200" label="消息内容"></el-table-column>
              <el-table-column prop="remindDt" width="100" label="提醒日期"></el-table-column>
              <el-table-column fixed="right" label="操作" width="90">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="isRemind" style="height: 360px">
            <el-table ref="multipleTable" v-loading="loading" height="100%" :data="remindData" style="width: 100%">
              <el-table-column prop="relCustomers" label="客户名称"></el-table-column>
              <el-table-column prop="relCustomersCnt" label="客户数量"></el-table-column>
              <el-table-column prop="remindContent" min-width="120" label="提醒内容"></el-table-column>
              <el-table-column prop="remindDate" min-width="120" label="提醒时间">
                <template #default="scope">
                  <div>
                    {{
                      scope.row.remindDate + " " + scope.row.dayOfWeek + " " + scope.row.remindTime
                    }}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="remindTime" label="提醒时间">
              </el-table-column> -->
              <el-table-column prop="statusName" label="提醒状态"></el-table-column>
            </el-table>
            <div class="pg">
              <el-pagination background :current-page="index" :page-size="size" layout="total, prev, pager, next"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent-div {
  position: relative;
}

.custom-dialog-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.custom-dialog {
  // border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color: white;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;

  .head-tit {
    font-size: 16px;
    color: #333;
  }
}

.close-btn {
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
}

/* 自定义头部样式 */
.defined-header {
  position: relative;
  // height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;

  .current-month {
    margin: 0 15px;
    font-size: 18px;
    font-weight: bold;
  }

  .el-button {
    margin: 0 5px;
  }

  .unit {
    position: absolute;
    right: 6.5rem;
    font-size: 12px;
  }

  .arrow-box {
    display: flex;

    .arrow {
      width: 2rem;
      height: 2rem;
      margin-right: 10px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.type-buttom1 {
  display: grid !important;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  // padding: 0 20px;
  // margin-bottom: 15px;
  background: #fff;

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 11.57rem;
    height: 2.57rem;
    font-size: 16px;
    cursor: pointer;
    background-color: #fff;
    border: 0.5px solid #e6e6e6;
    border-radius: 6px;
  }

  .active {
    color: #fff;
    background: #3e81f2;
    border: none;
  }
}

.cell-line {
  display: flex;
  align-items: center;
}

.calendar-cell {
  width: 100%;
  height: 100%;

  .betweenCenter {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: calc(2.65rem - 4px);
    padding: 2px 0 2px 5px;
    font-size: 12px;
    color: #333;
    background: #f5f8fc;
    box-shadow: 0rem 0rem 0rem 0rem #3e81f2;
  }
}

.tip {
  font-size: 12px;
}

.cruBox {
  border-left: 3px solid #3e81f2;
}

.days {
  padding: 0.5rem;
}

.cru {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.71rem;
  height: 1.71rem;
  color: #fff;
  background-color: #3e81f2;
  border-radius: 50%;
}

.pg {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

:deep(.el-calendar__body) {
  padding: 0;
}

:deep(.el-calendar-table thead) {
  background: #f7f7f7;
  border-radius: 4px 4px 0px 0px;
}

:deep(.el-calendar-table tr:first-child td) {
  border-top: 0.0625rem solid #f7f7f7;
}

:deep(.el-calendar-table tr td:first-child) {
  border-left: 0.0625rem solid #f7f7f7;
}

:deep(.el-calendar-table td) {
  border-right: 0.0625rem solid #f7f7f7;
  border-bottom: 0.0625rem solid #f7f7f7;
}

:deep(.el-calendar-table .el-calendar-day) {
  height: 4.45rem;
  padding: 0 !important;
  text-align: left;
}

:deep(.el-calendar-table td.is-today) {
  background: #fff !important;
}

:deep(.el-calendar-table td.is-selected) {
  font-weight: bold;
}

:deep(.el-calendar__header) {
  display: none;
}
</style>
