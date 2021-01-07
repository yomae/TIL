'''
한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 
각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 
각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자. 
단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다. 
회의의 시작시간과 끝나는 시간이 같을 수도 있다. 이 경우에는 시작하자마자 끝나는 것으로 생각하면 된다.
'''
def getKey(meeting):
    return meeting[1]

meeting = list()
meeting_count = 0
start_time = 0

N = int(input()) # 회의의 수

for i in range(N):
    data = list(map(int,input().split()))
    meeting.append(data)

meeting.sort() # [0] 즉 시작시간을 기준으로 정렬 (시작시간과 종료시간이 같은 회의도 있을 수 있으므로 예외처리)
meeting.sort(key=getKey) # [1] 종료시간을 기준으로 정렬

for j in meeting:
    if j[0]>=start_time:
        start_time = j[1] # 종료시간을 시작시간으로 변경
        meeting_count += 1

print(meeting_count)


