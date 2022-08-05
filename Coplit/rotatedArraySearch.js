/*
부분적으로 오름차순 정렬*된 정수의 배열(rotated)과 정수(target)를 입력받아 target의 인덱스를 리턴해야 합니다.
부분적으로 정렬된 배열: 배열을 왼쪽 혹은 오른쪽으로 0칸 이상 순환 이동할 경우 완전히 정렬되는 배열
예시: [4, 5, 6, 0, 1, 2, 3]은 왼쪽으로 3칸 또는 오른쪽으로 4칸 순환 이동할 경우 완전히 정렬됩니다.
*/

const rotatedArraySearch = function (rotated, target) {
  let front = 0;
  let rear = rotated.length - 1;

  while (front <= rear) {
    let half = Math.floor((front + rear) / 2);

    if (rotated[half] === target) return half;
    if (rotated[front] < rotated[half]) {
      if (rotated[front] <= target && rotated[half] > target) {
        // 1. 타겟보다 front값이 작거나 같다 2. 중간인덱스의 값이 타겟보다 크다 -> 이때만 절반을 기준으로 왼쪽배열에서 탐색함
        rear = half - 1;
      } else {
        front = half + 1;
      }
    } else {
      // rotated[front] > rotated[half]
      if (rotated[rear] >= target && rotated[half] < target) {
        // 1. 타겟보다 rear값이 크거나 같다 2. 중간인덱스의 값이 타겟보다 작다 -> 이때만 절반을 기준으로 우측배열에서 탐색
        front = half + 1;
      } else {
        rear = half - 1;
      }
    }
  }
  return -1;
};
