"""
정수 N개로 이루어진 수열 A와 정수 X가 주어진다. 이때, A에서 X보다 작은 수를 모두 출력하는
프로그램을 작성하시오.

첫째 줄에 N과 X가 주어진다. (1<=N, X<=10,000)
둘째 줄에 수열 A를 이루는 정수 N개가 주어진다. 주어지는 정수는 모두 1보다 크거나 같고,
10,000보다 작거나 같은 정수이다.

X보다 작은 수를 입력받은 순서대로 공백으로 구분해 출력한다. X보다 작은 수는 적어도 하나 존재한다.
"""
i = 0
N = 0
X = 0 
k = list()
count = 0
z = 0

while i==0:
    N, X = map(int,input().split())
    if 1<=N and X<=10000:        
        A = list(map(int,input().split()))                   
        while i<N:
            if A[i]<X:
                k.append(A[i])
                count+=1
            i+=1                 
    else:
        print("다시 입력하세요.")

for z in range(count):
    print(k[z], end=' ')


