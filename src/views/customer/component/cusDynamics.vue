<script setup lang="ts">
defineOptions({
  name: "CusDynamics",
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
const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};
const searchForm = reactive({
  dynmCgyCode: "",
  dynmTpCode: "",
  time: "",
});
// const loading = ref(false);
const tabloading = ref(false);
const dynmTpList = ref<any>([]);
const dynmCgyList = ref<any>([]);
const page = ref(1);
const limit = ref(10);
const tableData = ref<any>([]);
const total = ref(0);

watch(
  () => searchForm,
  () => {
    loadList(1);
  },
  { deep: true }
);

onMounted(() => {
  reqDyFirstTypeInfo();
  if (!searchForm.dynmCgyCode) {
    return;
  }
  loadList(1);
});
const handleClick = () => { };
const handleSizeChange = (val: number) => {
  limit.value = val;
  loadList();
};
const loadList = (pages = 1) => {
  // tabloading.value = true;
  page.value = pages;
  // const { custIsn, ctfNo, custTp } = props.custDetail;
  // cusDynamicAPI({
  //   custTp,
  //   custIsn,
  //   certNo: ctfNo,
  //   page: page.value,
  //   limit: limit.value,
  //   dynmCgyCode: searchForm.dynmCgyCode,
  //   dynmTpCode: searchForm.dynmTpCode,
  //   dynmSt: searchForm.time ? searchForm.time[0] : "",
  //   dynmEt: searchForm.time ? searchForm.time[1] : "",
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     tableData.value = res.data.list;
  //     total.value = res.data.total;
  //   }
  //  }).finally(() => {
  //   tabloading.value = false;
  // })
};
const onDynmCgyCodeChange = () => {
  // loading.value = true
  // searchForm.dynmTpCode = ""
  // dynmTpList.value = []
  // custDySecondTypeAPI({ dynmCgyCode: value }).then((res: any) => {
  //   if (res.code === 0) {
  //     dynmTpList.value = res.data;
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};
const reqDyFirstTypeInfo = () => {
  // loading.value = true
  // custDyFirstTypeAPI().then((res: any) => {
  //   if (res.code == 0) {
  //     dynmCgyList.value = res.data;
  //     // 设置默认值
  //     setDefaultValue();
  //   }
  // }).finally(() => {
  //   loading.value = false
  // })
};
// const setDefaultValue = () => {
//   if (dynmCgyList.value.length > 0) {
//     searchForm.dynmCgyCode = dynmCgyList.value[0].dynmCgyCode;
//     onDynmCgyCodeChange(searchForm.dynmCgyCode);
//   }
// };
</script>

<template>
  <div class="view-container">
    <div class="search">
      <el-form ref="searchForm" :inline="true" :model="searchForm">
        <el-form-item label="消息提醒类型" prop="dynmCgyCode">
          <el-select v-model="searchForm.dynmCgyCode" clearable placeholder="请选择消息提醒类型" @change="onDynmCgyCodeChange">
            <el-option v-for="(item, key) in dynmCgyList" :key="key" :label="item.dynmCl"
              :value="item.dynmCgyCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="提醒内容类型" prop="dynmTpCode">
          <el-select v-model="searchForm.dynmTpCode" clearable placeholder="请选择提醒内容类型">
            <el-option v-for="(item, key) in dynmTpList" :key="key" :label="item.dynmTp"
              :value="item.dynmTpCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="time">
          <el-date-picker v-model="searchForm.time" type="daterange" align="right" unlink-panels
            value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <el-table ref="multipleTable" v-loading="tabloading" :data="tableData">
      <el-table-column prop="dynmTp" label="类型"></el-table-column>
      <el-table-column prop="dynmCont" min-width="200" label="动态内容"></el-table-column>
      <el-table-column prop="custNm" label="客户名称"></el-table-column>
      <el-table-column prop="dynmDt" label="日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button v-if="
            !(
              searchForm.dynmCgyCode == 'xiaoxitongzhi' ||
              searchForm.dynmCgyCode == 'zhengjiandaoqi' ||
              searchForm.dynmCgyCode == 'zijinbiandong'
            )
          " type="text" size="small" @click="handleClick(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background :current-page="page" :page-sizes="[20, 40, 80, 160]" :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="loadList"></el-pagination>
    </div>
    <!-- 
    <el-drawer :destroy-on-close="true" :modal-append-to-body="false" title="KYC更新记录" size="100%" :visible.sync="drawer"
      :modal="false" :with-header="false">
      <kycDetail :mfId="mfId" @closepop="closepop"></kycDetail>
    </el-drawer>

    <el-drawer :destroy-on-close="true" :modal-append-to-body="false" title="营销记录" size="100%"
      :visible.sync="RecordDetailsDrawer" :modal="false" :with-header="false">
      <MarketingRecordDetails :mfId="mfId" @closepop="closepop"></MarketingRecordDetails>
    </el-drawer>

    <el-drawer :destroy-on-close="true" :modal-append-to-body="false" title="消息反馈记录" size="100%"
      :visible.sync="msgDrawer" :modal="false" :with-header="false">
      <MsgRecordDetail :obj="obj" @closepop="closepop"></MsgRecordDetail>
    </el-drawer> -->
  </div>
</template>

<style lang="scss" scoped></style>
