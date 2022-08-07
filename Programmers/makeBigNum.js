// lv2 큰 수 만들기

function solution(number, k) {
  let arr = [];
  const num = number.length;

  for (let i = 0; i < num; i++) {
    while (arr.length > 0 && arr[arr.length - 1] < number[i] && k > 0) {
      arr.pop();
      k--;
    }
    arr.push(number[i]);
  }
  arr.splice(num - k, k);
  return arr.join("");
}
