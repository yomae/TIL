// lv2 프린터

function solution(priorities, location) {
  let count = 0; // 뺀 순서를 기억하기 위함
  let length = priorities.length;
  let max = Math.max(...priorities);

  while (count < length) {
    if (priorities[0] < max) {
      // 우선순위가 아닌 경우
      priorities.push(priorities.shift()); // 앞쪽에서 뺀 요소를 다시 맨 뒤로
      if (location === 0) {
        location = priorities.length - 1; // 해당 요소의 위치를 기억하기 위해
        continue;
      }
    } else {
      // 우선순위인 경우
      priorities.shift();
      count++;
      if (location === 0) {
        // 내가 인쇄를 요청한 문서가 우선순위였던 경우
        return count; // 카운트(순서, 즉 몇번째인지)를 리턴
      }
      max = Math.max(...priorities); // 우선순위 초기화
    }
    location--;
  }
}
