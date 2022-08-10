// lv2 구명보트
// Greedy

function solution(people, limit) {
  people.sort(function (a, b) {
    return b - a;
  });
  let head = 0;
  let tail = people.length - 1;
  let sum = 0;

  while (head < tail) {
    if (people[head] + people[tail] > limit) {
      head++;
    } else {
      head++;
      tail--;
    }
    sum++;

    if (head == tail) {
      sum++;
    }
  }
  return sum;
}
