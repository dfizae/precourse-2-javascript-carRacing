# 자동차 경주 게임 개발
---

## 📌 프로젝트 소개
초간단 자동차 경주 게임을 구현한 프로젝트입니다.  
사용자가 입력한 자동차 이름과 시도 횟수에 따라 차례별 전진 여부를 랜덤으로 결정하고, 최종 우승자를 출력합니다.

---

## 📌 기능 목록

### 1. 사용자 입력
- 자동차 이름 입력 
  - 쉼표 `,` 기준으로 구분
  - 이름은 1~5자  
  - 한글/영문만 가능 (숫자, 특수문자 불가)
- 시도 횟수 입력
  - 1 이상의 숫자여야 함

### 2. 게임 진행
- 각 차수마다 자동차 전진
  - 0~9 사이 랜덤값 생성
  - 4 이상이면 전진
- 차수별 위치 출력
  - 예: `pobi : --`

### 3. 결과 출력
- 최종 우승자 출력
  - 단독 우승, 공동 우승 구분
  - 공동 우승 시 쉼표 `,`로 구분
- 최종 순위표 출력
  - 순위 : 이름 형식으로 출력
  - 공동 순위 자동 처리

### 4. 예외 처리
- 이름이 0자, 5자 초과, 숫자/특수문자 포함 시 `[ERROR]` 발생
- 시도 횟수가 1 미만 또는 숫자가 아닐 경우 `[ERROR]` 발생
- 중복된 레이서 이름이 있는 경우 `[ERROR]` 발생

---

## 📌 파일 구조

```sh
javascript-racingcar-8/
├── tests/
│   └── ApplicationTest.js : 테스트 코드 관리
├── node_modules/
│   └── ...
├── constants/
│   └── error.js : 에러 메시지 상수화
├── src/
|   ├── App.js
│   └── index.js    
├── .gitignore
├── .npmrc 
├── package-lock.json
├── package.json
└── README.md 
```


- ## 📌 코드 구조
- `src/App.js` : 프로그램 실행 시작점, 전체 로직 포함 
  - `run()` : 사용자 입력 및 race() 호출
  - `race()` : 레이서 객체 생성, 차수 반복, 최종 우승자 출력
  - `createRacers()` : 입력 검증 및 레이서 배열 생성
  - `runRounds()` : forward + printRound 호출
  - `forward()` : 전진 여부 결정
  - `printRound()` : 차수별 위치 출력
  - `printWinners()` : 최종 우승자 출력
  - `printRanking()` : 최종 순위표 출력 (공동 순위 반영)

- `constants/error.js` : 에러 메시지 상수화
<br>

---
## 📌 라이브러리

- `@woowacourse/mission-utils`
  - `Random.pickNumberInRange()` : 랜덤 값 추출
  - `Console.readLineAsync()` : 입력
  - `Console.print()` : 출력

---

## 📌 테스트
`ApplicationTest.js`
Jest를 활용한 단위 테스트 구현
사용자 입력, 랜덤값, 출력 로그 검증
