import { SizeEnum } from "./enums/SizeEnum";
import { LayoutEnum } from "./enums/LayoutEnum";

const defaultSettings: AppSettings = {
  // 系统Title
  title: "客户分层分类管理系统",
  // 是否显示设置
  showSettings: false,
  // 是否显示标签视图
  tagsView: true,
  // 是否显示侧边栏Logo
  sidebarLogo: false,
  // 布局方式，默认为左侧布局
  layout: LayoutEnum.FIXED,
  // 组件大小 default | medium | small | large
  size: SizeEnum.SMALL,
  // 主题颜色
  themeColor: "#3E81F2", // #3E81F2
  // 是否开启水印
  watermarkEnabled: false,
  // 水印内容
  watermarkContent: "九州农商银行",
  // 侧边栏配色方案
  sidebarColorScheme: "classic-blue",
};

export default defaultSettings;
