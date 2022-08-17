// lv1 비밀지도

function solution(n, arr1, arr2) {
  // or연산  공백을 0으로 생각하고, 벽을 1로
  // 01001 | 11110 -> 11111

  // bitwise 연산자 |
  let newArray = [];
  let result = [];

  for (let i = 0; i < n; i++) {
    newArray.push(arr1[i] | arr2[i]); // 정수값이 나옴
  }

  // padstart
  // toString(2)
  // 111 n->10.   0000000111
  for (let j = 0; j < n; j++) {
    newArray[j] = newArray[j].toString(2).padStart(n, "0");
  }

  for (let k = 0; k < n; k++) {
    result.push(newArray[k].replace(/0/g, " ").replace(/1/g, "#"));
  }
  return result;
}
