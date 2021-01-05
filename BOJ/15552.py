'빠른 A+B 문제'

'''
FOR문 문제를 풀기 전에 주의해야 할 점 -> 입출력 방식이 느린 경우 여러줄을 입력받거나 출력할 때 시간초과가 날 수 있다.

T = int(input())
for i in range(T):
    A, B = map(int,input().split())
    print(A+B)

위과 같은 코드로 풀이할 수 있지만, 다른 방식도 알아보자.

1. T = sys.stdin.readline().rstrip() -- 문자열 자체를 T라는 변수에 저장하고 싶을 때 이렇게 한다.

2. T = int(sys.stdin.readline()) -- 개행문자가 맨 끝에 들어와도 이런식으로 int 변환은 가능하다.

3. A, B = sys.stdin.readline().split() -- 이런식으로 쪼개서 집어넣는 것도 가능하다.

etc) sys.stdin.readline() 이라는 코드가 넘 길기 때문에 input = sys.stdin.readline() 이라고 먼저 처음에 쓰는 방법도 있다.

밑 코드는 sys.stdin.readline()을 사용한 방법이다.
'''

import sys

input = sys.stdin.readline
T = int(input())
for i in range(T):
    A, B = input().split()
    print(int(A)+int(B))
