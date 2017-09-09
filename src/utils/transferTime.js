/**
 * Created by kurry on 2017/8/27.
 */
export function transferTime(milliSecond) {
  let second = milliSecond/1000;
  return [parseInt(second / 60 / 60), (second / 60 % 60).toFixed(0), (second % 60).toFixed(0)].join(":")
    .replace(/\b(\d)\b/g, "0$1");
}
