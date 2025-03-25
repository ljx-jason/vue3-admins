<template>
  <div class="app-container">
    <!-- 搜索 -->
    <page-search ref="searchRef" :search-config="searchConfig" @query-click="handleQueryClick"
      @reset-click="handleResetClick" />

    <!-- 列表 -->
    <page-content ref="contentRef" :content-config="contentConfig" @search-click="handleSearchClick"
      @operat-click="handleOperatClick" @filter-change="handleFilterChange">
      <template #status="scope">
        <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
          {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
        </el-tag>
      </template>
      <template #gender="scope">
        <DictLabel v-model="scope.row[scope.prop]" code="gender" />
      </template>
      <template #mobile="scope">
        <el-text>{{ scope.row[scope.prop] }}</el-text>
        <copy-button v-if="scope.row[scope.prop]" :text="scope.row[scope.prop]" style="margin-left: 2px" />
      </template>
    </page-content>

    <!-- 弹框 -->
    <el-dialog v-model="modalVisible" :title="modalConfig.title" :align-center="true" :append-to-body="true" width="400"
      style="padding-right: 0" @close="handleCloseModal">
      <el-scrollbar max-height="60vh">
        <el-form ref="formRef" label-width="auto" style="padding-right: var(--el-dialog-padding-primary)"
          :model="formData" :rules="formRules">
          <el-row :gutter="20">
            <template v-if="modalConfig.name === 'allocation'">
              <el-col>
                <el-form-item label="客户经理" prop="custNo">
                  <el-select v-model="formData.custNo" placeholder="请选择客户经理" filterable clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="modalConfig.name === 'maintenance'">
              <el-col>
                <el-form-item>
                  <el-text>111111</el-text>
                </el-form-item>
                <el-form-item label="调整后" prop="custNo">
                  <el-select v-model="formData.custNo" placeholder="请选择调整后" filterable clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="调整原因" prop="custReson">
                  <el-input v-model="formData.custNo" type="textarea" autosize show-word-limit maxlength="300"
                    placeholder="请输入调整原因" clearable />
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </el-form>
      </el-scrollbar>
      <!-- 弹窗底部操作按钮 -->
      <template #footer>
        <div style="padding-right: var(--el-dialog-padding-primary)">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="modalVisible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Cycle",
  inheritAttrs: false,
});
// import UserAPI from "@/api/system/user";
// import DeptAPI from "@/api/system/dept";
// import RoleAPI from "@/api/system/role";
import type { IOperatData, ISearchConfig, IContentConfig } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import { useThrottleFn } from "@vueuse/core";
const router = useRouter();

const {
  searchRef,
  contentRef,
  handleQueryClick,
  handleResetClick,
  // handleSubmitClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

const formData = ref({
  custNo: "admin",
  custReson: "123456",
});
const modalVisible = ref(false);
const options = ref<OptionType[]>([]);
const formRef = ref();
// 弹框配置
const modalConfig = reactive({
  title: "分配",
  draggable: true,
  type: "add",
  name: "allocation",
});
// 表单校验
const formRules = computed(() => {
  return {
    custNo: [
      {
        required: true,
        trigger: "blur",
        message: "请选择客户经理",
      },
    ],
    custReson: [
      {
        required: true,
        trigger: "blur",
        message: "请输入原因说明",
      },
      {
        min: 5,
        message: "原因说明不能少于5个字",
        trigger: "blur",
      },
    ],
  };
});

// 搜索配置
const searchConfig: ISearchConfig = {
  pageName: "rating-claiming",
  formItems: [
    {
      type: "select",
      label: "客户星级",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "100px",
        },
      },
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
    },
    {
      type: "select",
      label: "审批状态",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "100px",
        },
      },
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
    },
    {
      type: "input",
      label: "证件号",
      prop: "keywords",
      attrs: {
        placeholder: "用户名/昵称/手机号",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
    {
      type: "select",
      label: "管户经理",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "100px",
        },
      },
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
    },
    {
      type: "input",
      label: "客户名称",
      prop: "keywords",
      attrs: {
        placeholder: "用户名/昵称/手机号",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
    {
      type: "tree-select",
      label: "归属支行",
      prop: "deptId",
      attrs: {
        placeholder: "请选择",
        data: [],
        filterable: true,
        "check-strictly": true,
        "render-after-expand": false,
        clearable: true,
        style: {
          width: "150px",
        },
      },
      async initFn(formItem) {
        // formItem.attrs.data = await DeptAPI.getOptions();
        // 注意:如果initFn函数不是箭头函数,this会指向此配置项对象,那么也就可以用this来替代形参formItem
        // this.attrs!.data = await DeptAPI.getOptions();
      },
    },
    {
      type: "tree-select",
      label: "归属网点",
      prop: "deptId",
      attrs: {
        placeholder: "请选择",
        data: [],
        filterable: true,
        "check-strictly": true,
        "render-after-expand": false,
        clearable: true,
        style: {
          width: "150px",
        },
      },
      async initFn(formItem) {
        // formItem.attrs.data = await DeptAPI.getOptions();
        // 注意:如果initFn函数不是箭头函数,this会指向此配置项对象,那么也就可以用this来替代形参formItem
        // this.attrs!.data = await DeptAPI.getOptions();
      },
    },
    {
      type: "select",
      label: "柜员号",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "100px",
        },
      },
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
    },
  ],
};
// 列表配置
const contentConfig: IContentConfig = {
  pageName: "rating-claiming",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  indexAction: function (params) {
    // return UserAPI.getPage(params);
    return new Promise((resolve, reject) => {
      resolve({
        list: [
          {
            id: 1,
            name: "张三",
            age: 18,
            sex: 1,
            status: 1,
            createTime: "2020-01-01",
            updateTime: "2020-01-01",
          },
          {
            id: 2,
          }
        ]
      })
    })
  },
  pk: "id",
  toolbar: [],
  defaultToolbar: [],
  // defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { label: "客户名称", align: "center", prop: "id", width: 100, show: false },
    { label: "证件号码", align: "center", prop: "username", width: 120 },
    { label: "客户星级", align: "center", prop: "nickname" },
    { label: "认定星级", align: "center", prop: "deptName" },
    { label: "归属支行", align: "center", prop: "deptName", width: 120 },
    {
      label: "归属网点",
      align: "center",
      prop: "mobile",
      width: 120,
    },
    {
      label: "管户经理",
      align: "center",
      prop: "nickname",
    },
    { label: "柜员号", align: "center", prop: "createTime" },
    { label: "申请人", align: "center", prop: "createTime" },
    { label: "客户状态", align: "center", prop: "status", templet: "custom", slotName: "status" },
    {
      label: "操作",
      align: "center",
      fixed: "right",
      width: 180,
      templet: "tool",
      operat: [
        {
          name: "feedback",
          icon: "position",
          text: "营销反馈",
        },
        {
          icon: "Document",
          name: "detail",
          text: "客户详情",
        },
      ],
    },
  ],
};
// 关闭弹窗
function handleCloseModal() {
  formRef.value?.resetFields();
  nextTick(() => {
    formRef.value?.clearValidate();
  });
}

// 其他操作列
async function handleOperatClick(data: IOperatData) {
  console.log(data);
  if (data.name === "feedback") {
    const params = {
      cust_type: data.row?.custTp,
      cust_id: data.row?.custIsn,
      cust_idcard: data.row?.ctfNo,
      form_type: "2",
      subType: "kyc",
    };
    router.push({
      path: "/marketing/feedback",
      query: params,
    });
  } else if (data.name === "detail") {
    router.push({
      path: "/customer/detail",
      query: { custTp: "1", custIsn: "222", ctfNo: "333" },
    });
  }
}
// 表单提交
const handleSubmit = useThrottleFn(() => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      // props.modalConfig.formAction(formData).then(() => {
      //   ElMessage.success(`${modalConfig.title}成功`);
      //   handleSubmitClick()
      //   modalVisible.value = false
      // });
    }
  });
}, 3000);
onMounted(async () => {
  // options.value = await RoleAPI.getOptions();
});
</script>