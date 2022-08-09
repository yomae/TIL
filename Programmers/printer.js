// lv2 프린터

function solution(priorities, location) {
  let count = 0;
  let length = priorities.length;
  let max = Math.max(...priorities);

  while (count < length) {
    if (priorities[0] < max) {
      priorities.push(priorities.shift());
      if (location === 0) {
        location = priorities.length - 1;
        continue;
      }
    } else {
      priorities.shift();
      count++;
      if (location === 0) {
        return count;
      }
      max = Math.max(...priorities);
    }
    location--;
  }
}
