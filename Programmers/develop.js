// lv2 기능개발

function solution(progresses, speeds) {
  let answer = [];
  let count = 0;
  let day = 0;

  while (progresses.length != 0) {
    if (progresses[0] + day * speeds[0] >= 100) {
      progresses.shift();
      speeds.shift();
      count++;
    } else {
      if (count != 0) {
        answer.push(count);
        count = 0;
      }
      day++;
    }
  }
  answer.push(count);

  return answer;
}
