// lv1 로또의 최고 순위와 최저 순위

function solution(lottos, win_nums) {
  // 당첨   [31, 10, 45, 1, 6, 19]
  // 내 번호 [44, 1, 0, 0, 31, 25]
  // 0을 제외한 나머지 번호가 당첨 번호와 몇개가 맞아떨어지는지.
  // 6개중에 0의 갯수를 세서 그냥 4개의 번호, 0이 2개
  // 예시 : 당첨번호 현재 2개 일치, 그리고 0이 2개있다
  // 최대로는 2+2 -> 4개가 일치, 최소 2개가 일치. -> 3등, 5등 [3,5]
  let correct = lottos.filter((el) => {
    return win_nums.includes(el);
  }).length;

  let zero = lottos.filter((el) => el === 0).length;

  // correct+zero , correct
  let result = [6, 6, 5, 4, 3, 2, 1];

  return [result[correct + zero], result[correct]];
}
