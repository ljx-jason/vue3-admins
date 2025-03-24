<script setup lang="ts">
defineOptions({
  name: "GetList",
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
const kindList = ref<any>([]);
const tableData = ref([]);
const limit = ref(10);
const page = ref(1);
const total = ref(0);
onMounted(() => {
  getPointTypeList();
});
watch(
  () => searchForm.value,
  (newVal: string) => {
    loadList(1);
  },
  { deep: true }
);
const getPointTypeList = (val = "") => {
  // custPointType(val).then((res: any) => {
  //   kindList.value = res.data
  // })
};
const handleSizeChange = (val: any) => {
  limit.value = val;
  loadList();
};

const loadList = (pages = 1) => {
  //   tabloading.value = true;
  //   page.value = pages;
  //   const { custIsn, ctfNo, custTp } = props.custDetail;
  //   const { kind, time } = searchForm.value
  //   custPointRecord({
  //     custTp,
  //     custIsn,
  //     certNo: ctfNo,
  //     page: page.value,
  //     limit: limit.value,
  //     kind,
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
  <div class="view-container">
    <div class="search">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchForm"
        class="demo-form-inline form-line-one"
      >
        <el-form-item label="产生类型" prop="kind">
          <el-select v-model="searchForm.kind" clearable filterable placeholder="请选择类型">
            <el-option
              v-for="(item, key) in kindList"
              :key="key"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产生时间" prop="time">
          <el-date-picker
            v-model="searchForm.time"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div style="height: 180px">
      <el-table ref="multipleTable" v-loading="tabloading" :data="tableData">
        <el-table-column prop="custName" label="客户名称"></el-table-column>
        <el-table-column prop="point" label="富民豆"></el-table-column>
        <el-table-column prop="type" label="规则名称"></el-table-column>
        <el-table-column prop="recordDate" label="产生时间"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[20, 40, 80, 160]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="loadList"
      ></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
