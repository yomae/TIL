# 상하좌우 문제
import sys

row = 0
col = 0

N = int(input())
Go = list(sys.stdin.readline().rstrip())

for j in range(len(Go)):
    if Go[j] == 'L':
        if col!=0:           
            col-=1
    elif Go[j] == 'R':
        if col!=N:
            col+=1
    elif Go[j] == 'U':
        if row!=0:           
            row-=1        
    elif Go[j] == 'D':
        if row!=N:           
            row+=1

print(row+1, col+1)


