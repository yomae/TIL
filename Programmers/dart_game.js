function solution(dartResult) {
  let sum = [];
  let first_sum;
  let flag = 0;
  let operator = [];
  let result = 0;

  for (let i = 0; i < dartResult.length; i++) {
    if (isNaN(dartResult.charAt(i)) == false) {
      // 0~9의 숫자
      if (flag == 1) {
        operator.push("1");
        flag = 0;
      }
      if (dartResult.charAt(i) != "1") {
        first_sum = 0;
        first_sum = first_sum + parseInt(dartResult.charAt(i));
      } else {
        if (dartResult.charAt(i + 1) == "0") {
          first_sum = 0;
          first_sum = first_sum + 10;
          i++;
        } else {
          first_sum = 0;
          first_sum = first_sum + parseInt(dartResult.charAt(i));
        }
      }
    } else {
      // S,D,T,*,#
      if (dartResult.charAt(i) == "S") {
        first_sum = first_sum ** 1;
        sum.push(first_sum);
        flag = 1;
      } else if (dartResult.charAt(i) == "D") {
        first_sum = first_sum ** 2;
        sum.push(first_sum);
        flag = 1;
      } else if (dartResult.charAt(i) == "T") {
        first_sum = first_sum ** 3;
        sum.push(first_sum);
        flag = 1;
      } else if (dartResult.charAt(i) == "*") {
        operator.push("*");
        flag = 0;
      } else if (dartResult.charAt(i) == "#") {
        operator.push("#");
        flag = 0;
      }
    }
  }
  for (let j = 0; j < sum.length; j++) {
    if (operator[j] == "1") {
      sum[j] = sum[j] * 1;
    } else if (operator[j] == "#") {
      sum[j] = sum[j] * -1;
    } else if (operator[j] == "*") {
      if (j == 0) {
        sum[j] = sum[j] * 2;
      } else {
        sum[j - 1] = sum[j - 1] * 2;
        sum[j] = sum[j] * 2;
      }
    }
  }

  return sum[0] + sum[1] + sum[2];
}
