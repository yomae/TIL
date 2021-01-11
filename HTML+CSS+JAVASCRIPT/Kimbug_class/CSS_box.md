# CSS CHAP.06 BOX

- Cascading Style Sheets
    - HTML(마크업 언어)를 꾸며주는 언어
    - HTML이 웹페이지의 정보를 표현한다면, CSS는 HTML을 보기 좋게 디자인하는 역할
    - [http://www.csszengarden.com/](http://www.csszengarden.com/)
    - CSS의 주석 /* */
    - 색깔 RGB
        - RED : #ff4949
        - YELLOW : #ffc82c
        - BLUE : #0066ff

- Syntax

    ```css
    selector {
    	property: value;
    }
    ```

    - selector : 지칭 파트
    - property : 선언부

## Type , Class Selector

```css
<div class="box"> -> .box로 호출
<div class="box-0 box-1 box2">

.box-0 .box-1 .box-2
(.box-0.box-1) -> 박스0 이자 박스1 .사이에 공백이없어야됨.
```

## ID Selector

- ID는 1개만 존재해야 함.

```css
<div id="kimbug"> -> css에서는 #kimbug
```

#kimbug.box

## 자식, 자손, 형제 선택자

- **Child Combinators (자식)**

    `parent > child`

- **Descendant Combinators (자손)**

    `parent descendant`

- **Sibling Combinators (형제)**

    ```css
    parent + Sibling --> 다음에 나오는 녀석 1명만
    parent ~ Sibling --> 다음에 나오는 녀석들 전부
    ```

## Structural Pseudo-classes

- 가상 클래스 : 어떤 상태나 조건에 만족했을때 사용할 수 있음
- li:first-child → li의 첫번째 아이
- li:last-child → li의 마지막 아이
- li:nth-child(3) → li의 3번째 아이
    - 짝수 표현 nth-child(2n)
    - 홀수 표현 nth-child(2n-1)

## User Action Pseudo-classes

- 유저의 액션에 따라서
- a:hover - 링크에 마우스를 갖다댔을 때 표현
- a:active - 누르는 순간 스타일을 맥임
- input:focus - input에 focus가 되었을때

## 선택자 우선순위

- CSS에서는 동일한 선택자의 경우, 나중에 선언된 선택자가 먼저 실행된 선택자를 덮어써서 실행함.
- 우선순위
    - 1순위 : ID
    - 2순위 : Class, Pseudo-class
    - 3순위 : Type
- Rule Breakers → 필치 못한 사정이 있지 않는한 사용하지마
    - Inline Style

        `<p style="font-size: 32px;">` 

    - !important  —> 제일 강력해용

        ```css
        * {
        	color: hotpink !important;
        }
        ```

## BOX MODEL

- **Content** : content가 들어있는 상자. 가로:width, 세로:height
- **Padding** : content와 border 사이의 공간, 안쪽 여백
- **Border**
    - `border: 1px solid #000` border: 굵기, 스타일, 색상 명시
    - 안쓰고 싶다면 `border: none`
    - `border-radius: 4px`  %를 쓰면 아예 둥그래짐
    - 개별적으로 처리하고 싶다면 border-top-left-radius
- **Margin** : 요소와 요소 사이의 간격, 바깥 여백
- 속기형 : Shorthand
    - 빠르게 적고 싶을때, ex) padding,margin
    - top → right → bottom → left (시계방향)
    - `padding: 10px 20px 30px 40px`

### BOX SIZING

```css
* {
	box-sizing : border-box;
}
/* *{}는 문서 내부의 모든 것에 적용 */
```

border-box를 기준으로 요소를 먹여라 → 우리의 상식에 맞게 동작

Box Type → Display

1. Block : 길막!
    - 따로 width를 선언하지 않은 경우, **width = 부모 content-box의 100%**
    - 따로 width를 선언한 경우, **남은 공간은 margin으로 자동채움**

    margin:0 auto; → top,bottom=0px, left,right=auto

    margin-left: auto; → 자동으로 생기는 margin을 left로 몰아라

    - 따로 부모의 height를 선언하지 않으면, **자식요소의 height의 합 = 부모의 height**
2. Inline : 흐름
    - 옆으로 주르륵 나열됨, block과 반대
    - width, height, (padding,border,margin)의 top,bottom속성 사용불가 → 인라인 줄간격 흐름을 박살내는 녀석들이기때문
3. Inline block : block과 Inline을 섞어놓음

```css
span{
display: inline-block;
}
```