// lv2 올바른 괄호
// 스택구조 활용

function solution(s) {
  let arr = []; // '(' 를 보관하는 배열
  let count = 0; // 인덱스

  while (count < s.length) {
    if (s[count] === "(") {
      arr.push("(");
    } else {
      if (arr.length === 0) {
        // '(' 가 하나도 없는데 ')'가 나온다면 괄호를 묶을 수 없음.
        return false;
      } else {
        arr.pop(); // 들어있던 가장 뒤의 '('를 뺌. 괄호로 묶여서 나왔음.
      }
    }
    count++;
  }

  return arr.length === 0 ? true : false;
}
