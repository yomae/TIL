// lv1 모의고사
// filter 활용 좀 하자

function solution(answers) {
  let first = [1, 2, 3, 4, 5];
  let second = [2, 1, 2, 3, 2, 4, 2, 5];
  let third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let result = [0, 0, 0];
  let final = [];
  let final_index = [];
  let count = 1;

  for (let i = 0; i < answers.length; i++) {
    if (first[i % 5] === answers[i]) {
      result[0]++;
    }
    if (second[i % 8] === answers[i]) {
      result[1]++;
    }
    if (third[i % 10] === answers[i]) {
      result[2]++;
    }
  }

  while (count < 4) {
    let temp = result.shift();
    if (final.length === 0) {
      final.push(temp);
      final_index.push(count);
    } else {
      if (final[final.length - 1] < temp) {
        final.pop();
        final.push(temp);
        final_index.pop();
        final_index.push(count);
      } else if (final[final.length - 1] === temp) {
        final_index.push(count);
      }
    }
    count++;
  }
  return final_index;
}

// filter 활용, 반복문제거 풀이

function solution(answers) {
  let first = [1, 2, 3, 4, 5];
  let second = [2, 1, 2, 3, 2, 4, 2, 5];
  let third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let result = [];

  let first_answer = answers.filter(
    (el, idx) => el === first[idx % first.length]
  ).length;
  let second_answer = answers.filter(
    (el, idx) => el === second[idx % second.length]
  ).length;
  let third_answer = answers.filter(
    (el, idx) => el === third[idx % third.length]
  ).length;

  let max = Math.max(first_answer, second_answer, third_answer);

  if (max === first_answer) {
    result.push(1);
  }
  if (max === second_answer) {
    result.push(2);
  }
  if (max === third_answer) {
    result.push(3);
  }

  return result;
}
