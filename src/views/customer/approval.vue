<template>
  <div class="app-container">
    <!-- 列表 -->
    <template v-if="isA">
      <!-- 搜索 -->
      <page-search ref="searchRef" :search-config="searchConfig" @query-click="handleQueryClick"
        @reset-click="handleResetClick" />

      <!-- 列表 -->
      <page-content ref="contentRef" :content-config="contentConfig" @add-click="handleAddClick"
        @edit-click="handleEditClick" @export-click="handleExportClick" @search-click="handleSearchClick"
        @toolbar-click="handleToolbarClick" @operat-click="handleOperatClick" @filter-change="handleFilterChange">
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

      <!-- 新增 -->
      <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">
        <template #gender="scope">
          <Dict v-model="scope.formData[scope.prop]" code="gender" />
        </template>
      </page-modal>
    </template>
    <template v-else>
      <page-content ref="contentRef" :content-config="contentConfig" @operat-click="handleOperatClick">
        <template #status="scope">
          <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
            {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </page-content>
    </template>
  </div>
</template>

<script setup lang="ts">
import UserAPI from "@/api/system/user";
import DeptAPI from "@/api/system/dept";
import RoleAPI from "@/api/system/role";
import usePage from "@/components/CURD/usePage";
import type {
  IObject,
  IOperatData,
  ISearchConfig,
  IModalConfig,
  IContentConfig,
} from "@/components/CURD/types";
import type { UserPageQuery, UserForm } from "@/api/system/user";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 搜索配置
const searchConfig: ISearchConfig = {
  pageName: "rating-claiming",
  formItems: [
    {
      type: "input",
      label: "关键字",
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
      label: "部门",
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
        formItem.attrs.data = await DeptAPI.getOptions();
        // 注意:如果initFn函数不是箭头函数,this会指向此配置项对象,那么也就可以用this来替代形参formItem
        // this.attrs!.data = await DeptAPI.getOptions();
      },
    },
    {
      type: "select",
      label: "状态",
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
      type: "date-picker",
      label: "创建时间",
      prop: "createAt",
      attrs: {
        type: "daterange",
        "range-separator": "~",
        "start-placeholder": "开始时间",
        "end-placeholder": "截止时间",
        "value-format": "YYYY-MM-DD",
        style: {
          width: "240px",
        },
      },
    },
  ],
};
// 列表配置
const contentConfig: IContentConfig<UserPageQuery> = {
  pageName: "rating-claiming",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  indexAction: function (params) {
    return UserAPI.getPage(params);
  },
  deleteAction: UserAPI.deleteByIds,
  importAction(file) {
    return UserAPI.import(1, file);
  },
  exportAction: UserAPI.export,
  importTemplate: UserAPI.downloadTemplate,
  importsAction(data) {
    // 模拟导入数据
    console.log("importsAction", data);
    return Promise.resolve();
  },
  exportsAction: async function (params) {
    // 模拟获取到的是全量数据
    const res = await UserAPI.getPage(params);
    console.log("exportsAction", res.list);
    return res.list;
  },
  pk: "id",
  toolbar: [
    "add",
    "delete",
    "import",
    "export",
    {
      name: "custom1",
      icon: "plus",
      text: "自定义1",
      auth: "import",
      type: "info",
    },
  ],
  defaultToolbar: ["refresh", "filter", "imports", "exports", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { label: "编号", align: "center", prop: "id", width: 100, show: false },
    { label: "用户名", align: "center", prop: "username" },
    { label: "头像", align: "center", prop: "avatar", templet: "image" },
    { label: "用户昵称", align: "center", prop: "nickname", width: 120 },
    {
      label: "性别",
      align: "center",
      prop: "gender",
      width: 100,
      templet: "custom",
      slotName: "gender",
    },
    { label: "部门", align: "center", prop: "deptName", width: 120 },
    {
      label: "角色",
      align: "center",
      prop: "roleNames",
      width: 120,
      columnKey: "roleIds",
      filters: [],
      filterMultiple: true,
      filterJoin: ",",
      async initFn(colItem) {
        const roleOptions = await RoleAPI.getOptions();
        colItem.filters = roleOptions.map((item) => {
          return { text: item.label, value: item.value };
        });
      },
    },
    {
      label: "手机号码",
      align: "center",
      prop: "mobile",
      templet: "custom",
      slotName: "mobile",
      width: 150,
    },
    {
      label: "状态",
      align: "center",
      prop: "status",
      templet: "custom",
      slotName: "status",
    },
    { label: "创建时间", align: "center", prop: "createTime", width: 180 },
    {
      label: "操作",
      align: "center",
      fixed: "right",
      width: 280,
      templet: "tool",
      operat: [
        {
          icon: "Document",
          name: "detail",
          text: "详情",
        },
        {
          name: "reset_pwd",
          auth: "password:reset",
          icon: "refresh-left",
          text: "重置密码",
        },
        "edit",
        "delete",
      ],
    },
  ],
};
// 弹框配置
const addModalConfig: IModalConfig<UserForm> = {
  pageName: "rating-claiming",
  dialog: {
    title: "新增用户",
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: UserAPI.add,
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "用户名",
      prop: "username",
      rules: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入用户名",
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "用户昵称",
      prop: "nickname",
      rules: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入用户昵称",
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "所属部门",
      prop: "deptId",
      rules: [{ required: true, message: "所属部门不能为空", trigger: "blur" }],
      type: "tree-select",
      attrs: {
        placeholder: "请选择所属部门",
        data: [],
        filterable: true,
        "check-strictly": true,
        "render-after-expand": false,
      },
    },
    {
      type: "custom",
      label: "性别",
      prop: "gender",
      initialValue: 1,
    },
    {
      label: "角色",
      prop: "roleIds",
      rules: [{ required: true, message: "用户角色不能为空", trigger: "blur" }],
      type: "select",
      attrs: {
        placeholder: "请选择",
        multiple: true,
      },
      options: [],
      initialValue: [],
    },
    {
      type: "input",
      label: "手机号码",
      prop: "mobile",
      rules: [
        {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: "请输入正确的手机号码",
          trigger: "blur",
        },
      ],
      attrs: {
        placeholder: "请输入手机号码",
        maxlength: 11,
      },
    },
    {
      label: "邮箱",
      prop: "email",
      rules: [
        {
          pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          message: "请输入正确的邮箱地址",
          trigger: "blur",
        },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入邮箱",
        maxlength: 50,
      },
    },
    {
      label: "状态",
      prop: "status",
      type: "radio",
      options: [
        { label: "正常", value: 1 },
        { label: "禁用", value: 0 },
      ],
      initialValue: 1,
    },
  ],
};
// 新增
async function handleAddClick() {
  addModalRef.value?.setModalVisible();
  // 加载部门下拉数据源
  addModalConfig.formItems[2]!.attrs!.data = await DeptAPI.getOptions();
  // 加载角色下拉数据源
  addModalConfig.formItems[4]!.options = await RoleAPI.getOptions();
}
// 编辑
async function handleEditClick(row: IObject) {
  editModalRef.value?.handleDisabled(false);
  editModalRef.value?.setModalVisible();
  // 加载部门下拉数据源
  // editModalConfig.formItems[2]!.attrs!.data = await DeptAPI.getOptions();
  // // 加载角色下拉数据源
  // editModalConfig.formItems[4]!.options = await RoleAPI.getOptions();
  // 根据id获取数据进行填充
  const data = await UserAPI.getFormData(row.id);
  editModalRef.value?.setFormData(data);
}
// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
  if (name === "custom1") {
    ElMessage.success("点击了自定义1按钮");
  }
}
// 其他操作列
async function handleOperatClick(data: IOperatData) {
  console.log(data);
  // 重置密码
  if (data.name === "reset_pwd") {
    ElMessageBox.prompt("请输入用户「" + data.row.username + "」的新密码", "重置密码", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }).then(({ value }) => {
      if (!value || value.length < 6) {
        ElMessage.warning("密码至少需要6位字符，请重新输入");
        return false;
      }
      UserAPI.resetPassword(data.row.id, value).then(() => {
        ElMessage.success("密码重置成功，新密码是：" + value);
      });
    });
  } else if (data.name === "detail") {
    // 禁用表单编辑
    editModalRef.value?.handleDisabled(true);
    // 打开抽屉
    editModalRef.value?.setModalVisible();
    // 修改抽屉标题
    // editModalConfig.drawer = { ...editModalConfig.drawer, title: "用户详情" };
    // // 加载部门下拉数据源
    // editModalConfig.formItems[2]!.attrs!.data = await DeptAPI.getOptions();
    // // 加载角色下拉数据源
    // editModalConfig.formItems[4]!.options = await RoleAPI.getOptions();
    // 根据id获取数据进行填充
    const formData = await UserAPI.getFormData(data.row.id);
    // 设置表单数据
    editModalRef.value?.setFormData(formData);
  }
}

// 切换示例
const isA = ref(true);
</script>
