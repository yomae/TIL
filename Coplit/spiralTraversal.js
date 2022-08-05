/* 
2차원 M x N 배열을 나선형(spiral)으로 순회해야 합니다.
순회는 좌측 상단 (0,0)에서 시작합니다.
배열의 모든 요소를 순서대로 이어붙인 문자열을 리턴해야 합니다.
*/

const spiralTraversal = function (matrix) {
  let count = 1;
  let result = "";
  while (matrix.length > 0) {
    if (count === 1) {
      let arr = matrix.shift();
      for (let i = 0; i < arr.length; i++) {
        result += arr[i];
      }
    } else if (count === 2) {
      for (let i = 0; i < matrix.length; i++) {
        result += matrix[i].pop();
      }
    } else if (count === 3) {
      let arr = matrix.pop();
      for (let i = 0; i < arr.length; i++) {
        result += arr[arr.length - 1 - i];
      }
    } else {
      // count === 4
      for (let i = matrix.length; i > 0; i--) {
        result += matrix[i - 1].shift();
      }
      count = 0;
    }
    count++;
  }
  return result;
};
