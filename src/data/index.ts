export const statusSource = [
  {
    text: "申请",
    value: "1",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "尽职调查",
    value: "2",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "审查",
    value: "3",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "审核",
    value: "4",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "信用卡申请",
    value: "5",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "面签",
    value: "6",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "上传资料",
    value: "7",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "资料审核",
    value: "8",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "授信",
    value: "9",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "签约",
    value: "10",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "开卡",
    value: "11",
    date: "2022-12-12  12:12:12",
  },
  {
    text: "放款",
    value: "12",
    date: "2022-12-12  12:12:12",
  },
];

export const productTypeSource = [
  {
    text: "全部产品",
    value: "全部产品",
    queryIndex: "",
  },
  {
    text: "汽车分期",
    value: "汽车分期",
    queryIndex: "1",
  },
  {
    text: "车位分期",
    value: "车位分期",
    queryIndex: "2",
  },
  {
    text: "装修分期",
    value: "装修分期",
    queryIndex: "3",
  },
  {
    text: "通用",
    value: "通用",
    queryIndex: "4",
  },
];

export const productTypeSourceV2 = [
  {
    text: "全部产品",
    value: "全部产品",
    queryIndex: "",
  },
  {
    text: "汽车分期",
    value: "汽车分期",
    queryIndex: "1",
  },
  {
    text: "车位分期",
    value: "车位分期",
    queryIndex: "2",
  },
  {
    text: "装修分期",
    value: "装修分期",
    queryIndex: "3",
  },
  {
    text: "通用",
    value: "通用",
    queryIndex: "4",
  },
];

export const managerUploadFileProductTypeSource = [
  {
    text: "汽车分期",
    value: "汽车分期",
    queryIndex: 1,
  },
  {
    text: "车位分期",
    value: "车位分期",
    queryIndex: 2,
  },
  {
    text: "装修分期",
    value: "装修分期",
    queryIndex: 3,
  },
  {
    text: "通用",
    value: "通用",
    queryIndex: "4",
  },
];

/**
 * 尽职调查状态码
 * */

export const dueDiligenceStatusSource = [
  {
    text: "尽调状态",
    value: "尽调状态",
    queryIndex: "",
    toPath: "check",
  },
  {
    text: "待尽调",
    value: "待尽调",
    queryIndex: 0,
    toPath: "check",
  },
  {
    text: "尽调完成",
    value: "尽调完成",
    queryIndex: 1,
    toPath: "check",
  },
  {
    text: "尽调终止",
    value: "尽调终止",
    queryIndex: -1,
    toPath: "check",
  },
  {
    text: "待整改",
    value: "待整改",
    queryIndex: -3,
    toPath: "check",
  },
];

/***
 *
 * 尽职调查整改状态码
 */

// export const dueDiligenceStatusReformSource = [
//     {
//         text:"待整改",
//         value:'待整改',
//         queryIndex:-3,
//         toPath:'check'
//     },
// ]

/*
 * 资料上传状态码
 * **/

export const uploadFileStatus = [
  {
    text: "整改状态",
    value: "",
  },
  {
    text: "已上传",
    value: 1,
  },
  {
    text: "未上传",
    value: 0,
  },
  {
    text: "待整改",
    value: -3,
  },
];

/**
 * 资料上传整改状态码
 * */

export const uploadFileReformStatus = [
  {
    text: "全部状态",
    value: "",
  },
  {
    text: "已整改",
    value: 1,
  },
  {
    text: "未整改",
    value: 0,
  },
];

/**
 * 面签结果
 * */

export const visaInterviewStatus = [
  {
    text: "面签状态",
    value: "",
  },
  {
    text: "未面签",
    value: 0,
  },
  {
    text: "已面签",
    value: 1,
  },
];

/***
 * 业务审核
 * */
export const busAuditStatus = [
  {
    text: "审核状态",
    value: "",
  },
  {
    text: "未审核",
    value: 0,
  },
  {
    text: "已审核",
    value: 1,
  },
  {
    text: "已驳回",
    value: -2,
  },
  {
    text: "终止办理",
    value: -1,
  },
];

/***
 * 教育程度
 * */
export const deepEdition = [
  {
    text: "配偶",
    value: "配偶",
    queryIndex: 0,
  },
  {
    text: "子女",
    value: "子女",
    queryIndex: 1,
  },
  {
    text: "父母",
    value: "父母",
    queryIndex: 2,
  },
  {
    text: "兄弟姐妹",
    value: "兄弟姐妹",
    queryIndex: 3,
  },
  {
    text: "朋友",
    value: "朋友",
    queryIndex: 4,
  },
  {
    text: "同事",
    value: "同事",
    queryIndex: 5,
  },
  {
    text: "同学",
    value: "同学",
    queryIndex: 6,
  },
  {
    text: "其他",
    value: "其他",
    queryIndex: 7,
  },
];

/***
 * 婚姻状态
 * */
export const marryStatus = [
  {
    text: "已婚",
    value: "已婚",
    queryIndex: 0,
  },
  {
    text: "未婚",
    value: "未婚",
    queryIndex: 1,
  },
];

/***
 * 单位性质
 * */
export const companyStatus = [
  {
    text: "民营企业",
    value: "民营企业",
    queryIndex: 0,
  },
  {
    text: "民营企业",
    value: "民营企业",
    queryIndex: 1,
  },
];

/****
 * 我的营销的进度状态节点
 * */

export const endStatusSource = [
  {
    text: "全部状态",
    value: "",
  },
  {
    text: "未申请",
    value: "0",
  },
  {
    text: "终止办理",
    value: "-1",
  },
  {
    text: "已申请",
    value: "1",
  },
  {
    text: "电话核查通过",
    value: "2",
  },
  {
    text: "尽职调查通过",
    value: "3",
  },
  {
    text: "尽职调查整改",
    value: "4",
  },
  {
    text: "尽调审查通过",
    value: "5",
  },
  {
    text: "尽调审批通过",
    value: "6",
  },
  {
    text: "信用卡申请完成",
    value: "7",
  },
  {
    text: "面签通过",
    value: "8",
  },
  {
    text: "授信通过",
    value: "9",
  },
  {
    text: "上传资料完成",
    value: "10",
  },
  {
    text: "上传资料整改",
    value: "11",
  },
  {
    text: "资料审核通过",
    value: "12",
  },
  {
    text: "签约完成",
    value: "13",
  },
  {
    text: "开卡审核通过",
    value: "14",
  },
  {
    text: "放款审核通过",
    value: "15",
  },
  {
    text: "抵押审核通过",
    value: "16",
  },
];

export const distanceStatusSource = [
  {
    text: "全部距离",
    value: "",
  },
  {
    text: "500米",
    value: 500,
  },
  {
    text: "1000米",
    value: 1000,
  },
  {
    text: "2000米",
    value: 2000,
  },
  {
    text: "5000米",
    value: 5000,
  },
];

export const custTypeSource = [
  {
    text: "全部类型",
    value: "",
  },
  {
    text: "个人",
    value: 1,
  },
  {
    text: "个体户",
    value: 3,
  },
  {
    text: "企业",
    value: 2,
  },
];
// 活动状态0未启动10启动20进行中30已结束40已作废
export const activeStatusSource = [
  {
    text: "全部状态",
    value: "",
  },
  // {
  //     text: '未启动',
  //     value: 0
  // },
  // {
  //     text: '启动',
  //     value: 10
  // },
  {
    text: "进行中",
    value: 20,
  },
  {
    text: "已结束",
    value: 30,
  },
  // {
  //     text: '已作废',
  //     value: 40
  // }
];

//信仰数据源
export const religionSource = [
  {
    text: "无",
    value: "无",
  },
  {
    text: "佛教",
    value: "佛教",
  },
  {
    text: "基督教",
    value: "基督教",
  },
  {
    text: "其他",
    value: "其他",
  },
];

// 投资经历
export const investmentManagerSource = [
  {
    text: "存款",
    value: "存款",
  },
  {
    text: "理财",
    value: "理财",
  },
  {
    text: "基金",
    value: "基金",
  },
  {
    text: "保险",
    value: "保险",
  },
  {
    text: "贵金属",
    value: "贵金属",
  },
  {
    text: "股票",
    value: "股票",
  },
  {
    text: "p2p",
    value: "p2p",
  },
  {
    text: "互联网理财",
    value: "互联网理财",
  },
  {
    text: "实业投资",
    value: "实业投资",
  },
  {
    text: "房产投资",
    value: "房产投资",
  },
  {
    text: "民间借贷",
    value: "民间借贷",
  },
];

export const investmentHorizon = [
  {
    text: "1月",
    value: "1月",
  },
  {
    text: "3月",
    value: "3月",
  },
  {
    text: "6月",
    value: "6月",
  },
  {
    text: "12月",
    value: "12月",
  },
  {
    text: "3年",
    value: "3年",
  },
  {
    text: "5年以上",
    value: "5年以上",
  },
];
export const riskData = [
  {
    text: "低风险",
    value: "低风险",
  },
  {
    text: "中风险",
    value: "中风险",
  },
  {
    text: "中高风险",
    value: "中高风险",
  },
  {
    text: "高风险",
    value: "高风险",
  },
];
export const timeData = [
  {
    text: "一年期",
    value: "一年期",
  },
  {
    text: "三年期",
    value: "三年期",
  },
  {
    text: "五年期",
    value: "五年期",
  },
  {
    text: "十年期",
    value: "十年期",
  },
];
export const activyData = [
  {
    text: "户外活动",
    value: "户外活动",
  },
  {
    text: "体育运动",
    value: "体育运动",
  },
  {
    text: "手工制作",
    value: "手工制作",
  },
  {
    text: "文学书画",
    value: "文学书画",
  },
  {
    text: "美学艺术",
    value: "美学艺术",
  },
  {
    text: "美食烘焙",
    value: "美食烘焙",
  },
  {
    text: "财富讲座",
    value: "财富讲座",
  },
  {
    text: "法律讲座",
    value: "法律讲座",
  },
  {
    text: "其他",
    value: "其他",
  },
];

export const investmentPreference = [
  {
    text: "存款",
    value: "存款",
  },
  {
    text: "理财",
    value: "理财",
  },
  {
    text: "基金",
    value: "基金",
  },
  {
    text: "保险",
    value: "保险",
  },
  {
    text: "贵金属",
    value: "贵金属",
  },
  {
    text: "不动产",
    value: "不动产",
  },
  {
    text: "权益产品",
    value: "权益产品",
  },
  {
    text: "其他",
    value: "其他",
  },
];

export const customerTypeSource = [
  {
    text: "个人",
    value: "3",
  },
  {
    text: "个体户",
    value: "2",
  },
  {
    text: "企业",
    value: "1",
  },
];

export const extraLoanSource = [
  {
    text: "贷款余额",
    value: "1",
  },
];

export const transactSource = [
  //1已办理0未办理2有意向3无意向
  {
    text: "暂无信息",
    value: "",
  },
  {
    text: "已办理",
    value: "1",
  },
  {
    text: "未办理",
    value: "0",
  },
  {
    text: "有意向",
    value: "2",
  },
  {
    text: "无意向",
    value: "3",
  },
];

export const marketingStatusSource = [
  {
    text: "已受理",
    value: "已受理",
  },
  {
    text: "办理手续麻烦",
    value: "办理手续麻烦",
  },
  {
    text: "人在外地",
    value: "人在外地",
  },
  {
    text: "嫌额度低",
    value: "嫌额度低",
  },
  {
    text: "嫌利率高",
    value: "嫌利率高",
  },
  {
    text: "信用贷大于3家银行",
    value: "信用贷大于3家银行",
  },
  {
    text: "3天后再回访",
    value: "3天后再回访",
  },
  {
    text: "6天后再回访",
    value: "6天后再回访",
  },
  {
    text: "9天后再回访",
    value: "9天后再回访",
  },
];

// 沙龙偏好
export const slphData = [
  {
    text: "品茶",
    value: "品茶",
  },
  {
    text: "品酒",
    value: "品酒",
  },
  {
    text: "高尔夫",
    value: "高尔夫",
  },
  {
    text: "瑜伽",
    value: "瑜伽",
  },
  {
    text: "书法",
    value: "书法",
  },
  {
    text: "摄影",
    value: "摄影",
  },
  {
    text: "投资理财",
    value: "投资理财",
  },
  {
    text: "养生",
    value: "养生",
  },
  {
    text: "插花",
    value: "插花",
  },
  {
    text: "其他",
    value: "其他",
  },
];
// 兴趣爱好
// export const slphData = [
//   {
//     text: '品茶',
//     value: '品茶'
//   },
//   {
//     text: '品酒',
//     value: '品酒'
//   },
//   {
//     text: '高尔夫',
//     value: '高尔夫'
//   },
//   {
//     text: '瑜伽',
//     value: '瑜伽'
//   },
//   {
//     text: '书法',
//     value: '书法'
//   },
//   {
//     text: '摄影',
//     value: '摄影'
//   },
//   {
//     text: '投资理财',
//     value: '投资理财'
//   },
//   {
//     text: '养生',
//     value: '养生'
//   },
//   {
//     text: '插花',
//     value: '插花'
//   },
//   {
//     text: '其他',
//     value: '其他'
//   },
// ]
// 主办银行 开户银行
export const yhData = [
  {
    text: "农业银行",
    value: "农业银行",
  },
  {
    text: "工商银行",
    value: "工商银行",
  },
  {
    text: "中国银行",
    value: "中国银行",
  },
  {
    text: "建设银行",
    value: "建设银行",
  },
  {
    text: "交通银行",
    value: "交通银行",
  },
  {
    text: "邮储银行",
    value: "邮储银行",
  },
  {
    text: "招商银行",
    value: "招商银行",
  },
  {
    text: "宁波银行",
    value: "宁波银行",
  },
  {
    text: "台州银行",
    value: "台州银行",
  },
  {
    text: "村镇银行",
    value: "村镇银行",
  },
  {
    text: "中信银行",
    value: "中信银行",
  },
  {
    text: "其他银行",
    value: "其他银行",
  },
];

export const treatmentStatus = [
  {
    text: "全部状态",
    value: "",
  },
  {
    text: "未处理",
    value: 0,
  },
  {
    text: "已处理",
    value: 1,
  },
];
export const signProductList = [
  {
    title: "收单商户",
    prop: "aqrgMer",
  },
  {
    title: "信用卡",
    prop: "crCard",
  },
  {
    title: "丰收互联",
    prop: "harvItcnt",
  },
  {
    title: "丰收E互通",
    prop: "harvEhousdCom",
  },
  {
    title: "三代市民卡",
    prop: "threAgntCtznCard",
  },
  {
    title: "市民卡",
    prop: "ctznCard",
  },
  {
    title: "基金",
    prop: "fnd",
  },
  {
    title: "电费",
    prop: "eleFee",
  },
  {
    title: "水费",
    prop: "waterChrg",
  },
  {
    title: "燃气费",
    prop: "gasFee",
  },
  {
    title: "电子社保卡",
    prop: "elecSocScrCard",
  },
  {
    title: "网银",
    prop: "onlBank",
  },
  {
    title: "养老代发",
    prop: "rtAgntPay",
  },
  {
    title: "社保代扣",
    prop: "socScrAgncRpmt",
  },
  {
    title: "灵活就业",
    prop: "flxblJob",
  },
  {
    title: "代发工资",
    prop: "agntPaySal",
  },
  {
    title: "数字人民币",
    prop: "ecny",
  },
  {
    title: "ETC",
    prop: "etc",
  },
  {
    title: "短信签约",
    prop: "smsSign",
  },
  {
    title: "支付宝",
    prop: "alipay",
  },
  {
    title: "微信",
    prop: "wechart",
  },
  {
    title: "医保电子凭证",
    prop: "slhElecVchr",
  },
  {
    title: "有线电视",
    prop: "wirdTv",
  },
  {
    title: "电信签约",
    prop: "telSign",
  },
  {
    title: "第三方存管",
    prop: "thdPtrDepty",
  },
  {
    title: "烟草",
    prop: "tobcc",
  },
  {
    title: "黄金",
    prop: "gold",
  },
  {
    title: "保险",
    prop: "ins",
  },
];
