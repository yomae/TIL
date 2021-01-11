# 왕실의 나이트
import sys

location = sys.stdin.readline()

row = int(location[1])
col = int(ord(location[0]))-int(ord('a')) + 1 # ord() -> 아스키코드 변환

moving = [(-2,1),(-2,-1),(-1,2),(1,2),(2,1),(2,-1),(1,-2),(-1,-2)] # 나이트가 움직일 수 있는 경로

count = 0

for move in moving:
    next_row = row + move[0]
    next_col = col + move[1]

    if next_row>=1 and next_row<=8 and next_col>=1 and next_col<=8: # 8x8 범위에서 움직일 수 있을 때만
        count+=1 # 카운트 증가

print(count)