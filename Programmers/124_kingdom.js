// lv2 124나라의 숫자

function solution(n) {
  // 3으로 나누어 떨어진 경우 몫을 1 빼줌.
  let result = "";

  while (n > 0) {
    if (n % 3 === 0) {
      result = "4" + result;
      n = Math.floor(n / 3) - 1;
    } else if (n % 3 === 1) {
      result = "1" + result;
      n = Math.floor(n / 3);
    } else {
      result = "2" + result;
      n = Math.floor(n / 3);
    }
  }
  return result;
}
