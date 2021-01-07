'''
준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.
동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.
'''

N, K = map(int,input().split())
coin_list = [0]*N
coin_type = 0
count = 0

for i in range(N):
    coin_type = int(input())
    coin_list[i] = coin_type

coin_list.sort(reverse=True)

for j in range(N):
    if K>=coin_list[j]:
        count += K // coin_list[j]        
        K = K-((K//coin_list[j])*coin_list[j])
    elif K==0:
        break
print(count)
