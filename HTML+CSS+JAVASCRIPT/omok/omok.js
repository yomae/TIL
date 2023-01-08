// 기본적인 격자 판 먼저 그리기, 캔버스 세팅
let c = document.getElementById('omok_canvas');
let ctx = c.getContext('2d');

for (let x = 0; x < 750; x += 50) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 750);
  ctx.stroke();
}
for (let y = 0; y < 750; y += 50) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(750, y);
  ctx.stroke();
}

const current_turn = document.getElementById('current_turn'); // 화면에 출력할 현재 턴

// 초기 변수 세팅
const omok_map = new Array(15).fill(0).map(() => new Array(15)); // 0으로 가득찬 8x8 2차원 배열 생성
const BLACK = 1;
const WHITE = 2;

// 시작 착석 돌 -> 검은색
let current_color = BLACK;
let reverse_color = WHITE;

// 8방향, N, NE, E, SE, S, SW, W, NW 시계방향 순서
const dx = [-1, -1, 0, 1];
const dy = [0, 1, 1, 1];

// search 함수의 플래그
let is_search = true;

initialize();

// 돌을 놓는 클릭을 처리하는 함수
c.addEventListener('click', function (event) {
  // time_set = 30;
  const column = Math.floor((event.clientX - ctx.canvas.offsetLeft) / 50); // 열 - 가로방향
  const row = Math.floor((event.clientY - ctx.canvas.offsetTop) / 50); // 행 - 세로방향
  if (doubleThreeCheck(row, column) >= 2) {
    alert('쌍삼입니다.');
  } else {
    putStone(row, column);

    if (current_color === BLACK) {
      current_turn.innerText = '현재 턴 : 검은색';
    } else {
      current_turn.innerText = '현재 턴 : 흰색';
    }
  }
});

// ----------------------------------------------------------------------------------- //

// 이 밑으로는 전부 함수 정의

// 1. 초기화(리셋)
function initialize() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      omok_map[i][j] = 0;
    }
  }
  current_turn.innerText = '현재 턴 : 검은색'; // 흑색 시작
}

// 5. 돌 캔버스에 그리기
function indexDraw(x, y, color) {
  // x, y값을 배열의 인덱스로 받을 경우
  ctx.beginPath();
  ctx.arc(x * 50 + 25, y * 50 + 25, 20, 0, Math.PI * 2);
  ctx.stroke();
  if (color === 1) {
    ctx.fillStyle = 'black';
    ctx.fill();
  } else {
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

// 6. 돌 놓기
function putStone(x, y) {
  if (omok_map[x][y] !== 0) {
    alert('돌을 놓을 수 없는 위치입니다.');
  } else {
    omok_map[x][y] = current_color;
    indexDraw(y, x, current_color);
    check(x, y);
  }
}

function doubleThreeCheck(x, y) {
  let open_four = 0;

  for (let i = 0; i < 4; i++) {
    open_four += doubleThreeSearch(x, y, dx[i], dy[i]);
  }
  console.log(`open four = ${open_four}`);
  return open_four;
}

function doubleThreeSearch(x, y, dx, dy) {
  // [x,y] -> 클릭한 좌표, [dx,dy] -> 방향

  let blink_start = false; // 해당 좌표 기준 방향 탐색 시 처음 만나는 곳이 공백인지 저장하는 변수

  let stone_first = 0;
  let check_blink_first = false;

  let stone_second = 0;
  let check_blink_second = false;

  // 양방향을 탐색할 것임. 0일때 정방향, 1일때 역방향 탐색
  for (let i = 0; i < 2; i++) {
    // 정방향
    for (let j = 1; j <= 14; j++) {
      let search_X = x + dx * j;
      let search_Y = y + dy * j;

      if (search_X < 0 || search_X > 14 || search_Y < 0 || search_Y > 14) {
        return 0;
      }
      // 맨 첫번째 탐색
      if (j === 1) {
        if (omok_map[search_X][search_Y] === 0) {
          let search_next_X = search_X + dx;
          let search_next_Y = search_Y + dy;

          if (
            search_next_X < 0 ||
            search_next_X > 14 ||
            search_next_Y < 0 ||
            search_next_Y > 14
          ) {
            return 0;
          }

          if (omok_map[search_next_X][search_next_Y] === 0) {
            break;
          } else {
            blink_start = true;
            check_blink_first = true;
          }
        } else if (omok_map[search_X][search_Y] === current_color) {
          stone_first++;
        } else {
          // 다른돌을 만나면
          return 0;
        }
      }

      // 나머지 탐색
      else {
        if (omok_map[search_X][search_Y] === 0) {
          if (check_blink_first === true) {
            // 공백 다음 공백, 즉 공백이 연속적으로 나온다면
            break;
          } else {
            check_blink_first = true;
          }
        } else if (omok_map[search_X][search_Y] === current_color) {
          stone_first++;
          check_blink_first = false;
        } else {
          return 0;
        }
      }
    }

    //역방향
    for (let j = 1; j <= 14; j++) {
      let search_X = x - dx * j;
      let search_Y = y - dy * j;

      if (search_X < 0 || search_X > 14 || search_Y < 0 || search_Y > 14) {
        return 0;
      }

      // 맨 첫번째 탐색 시 공백인가? 한번만 체크합시다
      if (j === 1) {
        if (omok_map[search_X][search_Y] === 0) {
          if (blink_start === true) {
            if (stone_first === 2) {
              continue;
            } else {
              return 0;
            }
          }
        }
      }

      if (omok_map[search_X][search_Y] === 0) {
        if (check_blink_second === true) {
          break;
        } else {
          check_blink_second = true;
        }
      } else if (omok_map[search_X][search_Y] === current_color) {
        stone_second++;
        check_blink_second = false;
      } else {
        return 0;
      }
    }

    // console.log(
    //   `[${x},${y}]에서의 [${dx},${dy}] 방향 탐색 시 정방향 ${stone_first}개, 역방향 ${stone_second}개`
    // );

    // 두개 다 검사 완료했음
    if (stone_first + stone_second === 2) {
      return 1;
    } else {
      return 0;
    }
  }
}

// 7. 클릭한 좌표에 돌을 놓을 수 있는지 체크 후 가능하다면 바로 바꾸기
function check(x, y) {
  for (let i = 0; i < 4; i++) {
    let sum = 1;

    for (let j = 0; j < 2; j++) {
      if (j === 0) {
        // 첫번째 (정방향) 탐색하기
        sum += search(x, y, dx[i], dy[i]);
      } else {
        // 두번째 (반대방향) 탐색하기
        sum += search(x, y, 0 - dx[i], 0 - dy[i]);
      }
    }
    if (sum === 5) {
      if (current_color === 1) {
        setTimeout(() => {
          alert('흑 승리!');
        }, 100);
      } else {
        setTimeout(() => {
          alert('백 승리!');
        }, 100);
      }
      setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  }

  let temp = current_color;
  current_color = reverse_color;
  reverse_color = temp;
}

// 3. 돌을 뒤집을 수 있는지 탐색하거나, 탐색 후 돌을 뒤집는 함수
function search(x, y, dx, dy) {
  // [dx,dy] -> 방향
  let turn = 0;

  for (let i = 1; i <= 14; i++) {
    let search_X = x + dx * i;
    let search_Y = y + dy * i;

    if (search_X < 0 || search_X > 14 || search_Y < 0 || search_Y > 14) {
      break;
    }

    if (omok_map[search_X][search_Y] === current_color) {
      turn++;
      // continue;
    } else {
      break;
    }
  }
  return turn;
}
