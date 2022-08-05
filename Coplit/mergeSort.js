// 병합 정렬 구현

const mergeSort = function (arr) {
  // 정렬을 우선 만들고 재귀로
  const merge = (left, right) => {
    const sortedArr = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }
    // left,right 둘 중 하나는 요소가 남아있기 때문에 sortedArr 뒤에 붙여서 출력
    return [...sortedArr, ...left, ...right];
  };

  if (arr.length === 1) return arr;
  const half = Math.floor(arr.length / 2);
  const left = arr.slice(0, half);
  const right = arr.slice(half);
  // 요소가 1개 일 때까지 재귀를 실행해 요소가 1개일 때 두 left,right부터 merge
  return merge(mergeSort(left), mergeSort(right));
};
