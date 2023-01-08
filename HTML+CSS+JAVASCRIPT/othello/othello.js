// 기본적인 격자 판 먼저 그리기, 캔버스 세팅
let c = document.getElementById('othello_canvas');
let ctx = c.getContext('2d');

for (let x = 0; x < 800; x += 100) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 800);
  ctx.stroke();
}
for (let y = 0; y < 800; y += 100) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(800, y);
  ctx.stroke();
}

const current_turn = document.getElementById('current_turn'); // 화면에 출력할 현재 턴
const black_stone = document.getElementById('black_stone'); // 화면에 출력할 검은 돌 갯수
const white_stone = document.getElementById('white_stone'); // 화면에 출력할 흰 돌 갯수
const timer = document.getElementById('timer');

// 초기 변수 세팅
const othello_map = new Array(8).fill(0).map(() => new Array(8)); // 0으로 가득찬 8x8 2차원 배열 생성
const BLACK = 1;
const WHITE = 2;

// 시작 착석 돌 -> 검은색
let current_color = BLACK;
let reverse_color = WHITE;

// 8방향, N, NE, E, SE, S, SW, W, NW 시계방향 순서
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, 1, 1, 1, 0, -1, -1, -1];

// search 함수의 플래그
let is_search = true;

// 30초 타이머
let time_set = 30;

// ----------------------------------------------------------------------------------- //
// 실행 프로세스 : 최초 판 세팅 -> (타이머 작동) -> 클릭을 하면 오델로 로직 작동

initialize();

setInterval(() => {
  timer.innerText = time_set;
  time_set--;
  if (time_set < 0) {
    time_set = 30;
    if (current_color === BLACK) {
      current_color = WHITE;
      reverse_color = BLACK;
      current_turn.innerText = '현재 턴 : 흰색';
      current_turn;
    } else {
      current_color = BLACK;
      reverse_color = WHITE;
      current_turn.innerText = '현재 턴 : 검은색';
    }
  }
}, 1000);

// 돌을 놓는 클릭을 처리하는 함수
c.addEventListener('click', function (event) {
  time_set = 30;
  const column = Math.floor((event.clientX - ctx.canvas.offsetLeft) / 100); // 열 - 가로방향
  const row = Math.floor((event.clientY - ctx.canvas.offsetTop) / 100); // 행 - 세로방향

  let possible = isPutStonePossible();
  let is_full = false;

  if (possible === true) {
    putStone(row, column);
  } else {
    // 돌을 놓을 곳이 없는 경우?
    is_full = isFull();
    alert('돌을 놓을 수 있는 위치가 없습니다.');
  }

  if (current_color === BLACK) {
    current_turn.innerText = '현재 턴 : 검은색';
  } else {
    current_turn.innerText = '현재 턴 : 흰색';
  }
  countStone(is_full);
});

// ----------------------------------------------------------------------------------- //

// 이 밑으로는 전부 함수 정의

// 1. 초기화(리셋)
function initialize() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      othello_map[i][j] = 0;
    }
  }

  othello_map[3][3] = WHITE;
  othello_map[3][4] = BLACK;
  othello_map[4][3] = BLACK;
  othello_map[4][4] = WHITE;

  indexDraw(3, 3, WHITE);
  indexDraw(3, 4, BLACK);
  indexDraw(4, 3, BLACK);
  indexDraw(4, 4, WHITE);
  current_turn.innerText = '현재 턴 : 검은색'; // 흑색 시작
}

// 2. 돌을 놓을 수 있는 곳이 한 곳이라도 있는지 여부를 확인하는 함수
function isPutStonePossible() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // 빈 타일
      if (othello_map[i][j] === 0) {
        // 8방향 탐색
        for (let k = 0; k < 8; k++) {
          let move_X = i + dx[k];
          let move_Y = j + dy[k];

          if (move_X < 0 || move_X > 7 || move_Y < 0 || move_Y > 7) {
            continue; // 오델로 판에서 벗어난 곳은 제외하기
          }
          // 현재 놓고자 하는 돌의 색과 반대되는 색이 있을 경우
          if (othello_map[move_X][move_Y] === reverse_color) {
            is_search = true;
            let result = search(i, j, dx[k], dy[k], is_search); // 만약 놓을 수 있는 곳이라면 true, 놓을 수 없는 곳이라면 false를 리턴함.

            if (result === true) {
              // 놓을 수 있는 곳을 1개라도 찾았다면
              return true; // 바로 루프 탈출
            }
          }
        }
      }
    }
  }

  // 전체 오델로 판에서 놓을 수 있는 곳이 한 곳도 없는 경우, 턴 변경
  let temp = current_color;
  current_color = reverse_color;
  reverse_color = temp;

  return false;
}

// 3. 돌을 뒤집을 수 있는지 탐색하거나, 탐색 후 돌을 뒤집는 함수
function search(x, y, dx, dy, search_ok) {
  // [dx,dy] -> 방향
  let turn;
  let flag = false; // 방향따라 탐색을 했을 때, 놓을 수 있는지를 판별하는 변수

  for (let i = 1; i <= 8; i++) {
    let search_X = x + dx * i;
    let search_Y = y + dy * i;

    if (search_X < 0 || search_X > 7 || search_Y < 0 || search_Y > 7) {
      break;
    }

    if (othello_map[search_X][search_Y] === reverse_color) {
      continue; // 반대되는 색을 만났다면 더 탐색해야함.
    }

    // 같은 색을 만났다면 움직였던 횟수를 turn에 저장하고, 루프 탈출
    else if (othello_map[search_X][search_Y] === current_color) {
      turn = i;
      flag = true;
      break;
    }

    // 0, 즉 빈칸을 만난다면 놓을 수 없는 것.
    else {
      return false;
    }
  }

  if (search_ok !== true) {
    for (let j = 0; j < turn; j++) {
      othello_map[x + dx * j][y + dy * j] = current_color;
      indexDraw(y + dy * j, x + dx * j, current_color);
    }
  }

  if (flag === true) {
    return true;
  } else {
    // 루프를 다 돌고 나왔지만 같은 색을 만나지 못했다면 이 또한 뒤집을 수 없는 케이스
    return false;
  }
}

// 4. 오델로 판이 공백없이 전부 차 있는지 판단하는 함수
function isFull() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (othello_map[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

// 5. 돌 캔버스에 그리기
function indexDraw(x, y, color) {
  // x, y값을 배열의 인덱스로 받을 경우
  ctx.beginPath();
  ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
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
  if (othello_map[x][y] !== 0) {
    alert('돌을 놓을 수 없는 위치입니다.');
  } else {
    check(x, y);
  }
}

// 7. 클릭한 좌표에 돌을 놓을 수 있는지 체크 후 가능하다면 바로 바꾸기
function check(x, y) {
  let is_possible = false;

  for (let i = 0; i < 8; i++) {
    let check_X = x + dx[i];
    let check_Y = y + dy[i];

    if (check_X < 0 || check_X > 7 || check_Y < 0 || check_Y > 7) {
      continue; // 게임판을 벗어난 곳은 탐색하지 않음.
    }

    if (othello_map[check_X][check_Y] === reverse_color) {
      is_search = false;
      let result = search(x, y, dx[i], dy[i], is_search);

      if (result === true) {
        is_possible = true;
      }
    }
  }
  if (is_possible === true) {
    let temp = current_color;
    current_color = reverse_color;
    reverse_color = temp;
  } else {
    alert('돌을 놓을 수 없는 곳입니다.');
  }
}

// 8. 각각의 돌 갯수를 세는 함수
function countStone(full_ok) {
  let reset = false;
  let num_black = 0;
  let num_white = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (othello_map[i][j] === 1) {
        num_black++;
      } else if (othello_map[i][j] === 2) {
        num_white++;
      }
    }
  }
  black_stone.innerText = `검은 돌 갯수 : ${num_black}개`;
  white_stone.innerText = `흰 돌 갯수 : ${num_white}개`;

  if (num_black === 0) {
    setTimeout(() => {
      reset = confirm('백 승리.\n 게임을 재시작하시겠습니까?');
      if (reset === true) {
        location.reload(true);
      }
    }, 200);
  } else if (num_white === 0) {
    setTimeout(() => {
      reset = confirm('흑 승리.\n 게임을 재시작하시겠습니까?');
      if (reset === true) {
        location.reload(true);
      }
    });
  }

  if (full_ok === true) {
    if (num_black < num_white) {
      setTimeout(() => {
        reset = confirm('백 승리.\n 게임을 재시작하시겠습니까?');
        if (reset === true) {
          location.reload(true);
        }
      }, 200);
    } else if (num_black === num_white) {
      setTimeout(() => {
        reset = confirm('비겼습니다.\n 게임을 재시작하시겠습니까?');
        if (reset === true) {
          location.reload(true);
        }
      });
    } else {
      setTimeout(() => {
        reset = confirm('흑 승리.\n 게임을 재시작하시겠습니까?');
        if (reset === true) {
          location.reload(true);
        }
      });
    }
  }
}
