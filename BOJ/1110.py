# 더하기 사이클
N = int(input())
compare = N
length = 0

while True:
    if N<10:
        temp = "0"+str(N)
        N = int(temp[1])*10 + (int(temp[0])+int(temp[1])) % 10       
        length+=1 
    else:
        N = (N%10)*10 + (N//10 + N%10) % 10
        length+=1        
    if N==compare:
        break
print(length)
