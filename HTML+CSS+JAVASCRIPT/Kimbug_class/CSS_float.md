# Float 간단 요약본

## 가로배치를 위해 사용해요!

- 자식이 Float가 되면 집나간 것 같은 상황이 됨 (부모가 자식을 못찾는다.)
    - 하나만 float 설정을 하게 되면 밑 블록에 의해 덮어씌워져버림 (float 설정을 한 자식이 공중에 붕 뜬 상태에서 밑에 다른 자식들이 들어옴)
- __Inline이나 Inline block의 어떤 요소를 float 시킨다면 Block으로 바뀐다.__ 다만 이 블록은 길막을 못한다.
    - 따로 width를 선언하지 않은 경우, width = 부모의 content-box의 100% → X
    - 따로 width를 선언한 경우, 남은 공간은 margin으로 자동채움 → X
- opacity 속성 : 투명도, 0~1의 값
- Float가 일어나면, block 박스들은 없는 취급을 하지만,  inline의 성격을 가지고 있는 친구들은 집나간 float의 존재를 기가 막히게 알고 있다. 그래서 레이아웃이 박살난다. (부모 영역이 없어져버림)
- 요즘은 float를 잘 사용안함

## How to fix

- 부모에 **overflow: hidden**을 주면, 자식을 다시 찾는다. -> 편리하기는 하지만 아래의 FM 방법을 사용하자
- FM 방법 : __Clearfix__
    - **clear: left**를 주면? float: left된 녀석을 찾을 수 있다.
    - clear의 속성들 -> left | right | both(둘다)
    - **block인 요소에만 사용할 수 있다.**
- html 마크업이아닌 css로 처리하기 위해
    - **Pseudo Element** : html에는 존재하지 않는 가상요소 + clear:left
    - 2개의 가상요소를 만들 수 있음 : ::before, ::after
    - .pseudo::before → 다음엔 반드시 content 요소가 존재해야 함
    
- __clearfix를 미리 만들어 놓자!__
    - ::after를 클래스마다 만들면 귀찮으므로 .clearfix::after를 하나 만들어 놓고 사용하고자 하는 클래스명 옆에 공백 한칸 띠고 clearfix 삽입
     `<span class="test clearfix">`
