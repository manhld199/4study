// convert functions are used for convert value. Ex: 1000 -> '1k'

// chuyển số thành chuỗi rút gọn, vd: 12345 -> 1.2k
export const convertNumberToShortString = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"; // Tỷ (Billion)
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"; // Triệu (Million)
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"; // Nghìn (Thousand)
  } else {
    return num.toString(); // Dưới 1.000 thì giữ nguyên
  }
};
