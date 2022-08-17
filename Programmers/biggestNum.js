// lv2 가장 큰 수

// 정답 코드

function solution(numbers) {
  let StringNumbers = numbers.map((el) => String(el)); // numbers의 요소들을 string으로 변환

  StringNumbers.sort((a, b) => b + a - (a + b)); // 핵심코드!
  /*
    a = 3, b = 30 이라 해보면, b+a = 303, a+b = 330, 빼면 음수 -> a가 작다고 판별 -> 그대로 3, 30
  */

  if (StringNumbers.every((el) => el === "0")) {
    // 예외처리 : 전부 0일 경우? 0을 리턴
    return "0";
  } else {
    return StringNumbers.join(""); // 배열안의 문자열을 전부 join후 리턴
  }
}

// 삽질코드
function solution(numbers) {
  let result = "";

  let StringNumbers = numbers.map((el, idx) => {
    if (String(el).length === 1) {
      el = String(el) + String(el) + String(el);
    } else if (String(el).length === 2) {
      el = String(el) + String(el)[0];
    }
    return [idx, Number(el)];
  });

  let copy = [...StringNumbers].sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < copy.length; i++) {
    if (i < copy.length - 1 && copy[i][1] === copy[i + 1][1]) {
      if (numbers[copy[i][0]] > numbers[copy[i + 1][0]]) {
        let temp;
        temp = numbers[copy[i][0]];
        numbers[copy[i][0]] = numbers[copy[i + 1][0]];
        numbers[copy[i + 1][0]] = temp;
      }
    }
    result = result + String(numbers[copy[i][0]]);
  }

  return result;
}
