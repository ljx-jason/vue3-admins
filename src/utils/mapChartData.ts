export const mapChartData = (arr: [], xKey = "key", valueKey = "value") => {
  let XData = arr.map((item) => item[xKey]);
  let valueData = arr.map((item) => item[valueKey]);
  return {
    XData,
    valueData,
  };
};
