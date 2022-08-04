// lv1 실패율
// 오름차순 내림차순 sort 순서 조심

function solution(N, stages) {
  let result = [];

  for (let i = 1; i < N + 1; i++) {
    let total = 0;
    let fail = 0;

    for (let j = 0; j < stages.length; j++) {
      if (stages[j] < i) {
        continue;
      } else if (stages[j] === i) {
        fail++;
      }
      total++;
    }
    result.push([i, fail / total]);
  }
  return result.sort((a, b) => b[1] - a[1]).map((el) => el[0]);
}
