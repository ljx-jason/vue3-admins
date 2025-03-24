<script setup lang="ts">
defineOptions({
  name: "CostList",
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
const tabloading = ref(false);
const searchForm = ref<any>({});
const tableData = ref([]);
const limit = ref(10);
const page = ref(1);
const total = ref(0);

watch(
  () => searchForm.value,
  () => {
    loadList(1);
  },
  { deep: true }
);
const handleSizeChange = (val: any) => {
  limit.value = val;
  loadList();
};

const loadList = (pages = 1) => {
  //   tabloading.value = true;
  page.value = pages;
  //   const { custIsn, ctfNo, custTp } = props.custDetail;
  //   const { unit, time } = searchForm.value
  //   custPointUse({
  //     custTp,
  //     custIsn,
  //     certNo: ctfNo,
  //     page: page.value,
  //     limit: limit.value,
  //     unit,
  //     getSt: time ? time[0] : "",
  //     getEt: time ? time[1] : "",
  // }).then((res: any) => {
  //   if (res.code == 0) {
  //     tableData.value = res.data.list;
  //     total.value = res.data.total;
  //   }
  //   }).finally(() => {
  //     tabloading.value = false;
  //   })
};
</script>

<template>
  <div>
    <div class="search">
      <el-form ref="searchForm" :inline="true" :model="searchForm" class="demo-form-inline form-line-one">
        <el-form-item label="网点" prop="unit">
          <el-input v-model="searchForm.unit" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="消费时间" prop="time">
          <el-date-picker v-model="searchForm.time" type="daterange" align="right" unlink-panels
            value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div style="height: 180px">
      <el-table ref="multipleTable" v-loading="tabloading" :data="tableData">
        <el-table-column prop="poscode" label="流水号"></el-table-column>
        <!-- <el-table-column prop="billno" label="出库单号"> </el-table-column> -->
        <el-table-column prop="point" label="变化富民豆"></el-table-column>
        <el-table-column prop="balance" label="剩余富民豆"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="type" label="订单类型"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column prop="occurdate" label="消费时间"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background :current-page="page" :page-sizes="[20, 40, 80, 160]" :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="loadList"></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
