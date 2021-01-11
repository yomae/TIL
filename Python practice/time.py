# 시각 문제
N = int(input())

count = 0

for i in range(N+1): # 시간
    for j in range(60): # 분
        for k in range(60): # 초           
            if '3' in str(i)+str(j)+str(k):  # 단순하게 스트링에서 3이 들어가는지만 비교해준다.
                count+=1 
print(count)

    