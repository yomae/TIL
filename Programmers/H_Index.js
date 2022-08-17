// lv2 H-Index

function solution(citations) {
  let count = 1;
  let result = 0;
  let arrLength = citations.length;

  while (count < citations[arrLength - 1]) {
    let filtered = [...citations].filter((el) => el >= count).length;

    if (count <= filtered && count >= arrLength - filtered) {
      result = count;
    } else {
      break;
    }
    count++;
  }
  return result;
}
