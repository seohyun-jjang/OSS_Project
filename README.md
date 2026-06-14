# Inbody-Based Diet Recommendation System

사용자의 InBody 신체 구성 데이터와 건강 목표를 기반으로 개인 맞춤형 식단을 추천하고, 식사 기록을 통해 영양 피드백을 제공하는 웹 기반 다이어트 추천 시스템입니다.

## Project Information

- Student No: 22411998
- Name: Jang Seohyun
- Repository: https://github.com/seohyun-jjang/OSS_Project
- Website: https://seohyun-jjang.github.io/OSS_Project/

## Project Purpose

기존 식단 관리 서비스는 단순 칼로리 계산이나 음식 기록 중심으로 동작하는 경우가 많습니다. 이 프로젝트는 체중, 체지방률, 골격근량과 같은 InBody 데이터를 반영하여 사용자의 신체 상태와 목표에 맞는 식단을 추천하는 것을 목표로 합니다.

사용자는 자신의 신체 정보를 입력하고 건강 목표를 설정한 뒤, 목표에 맞는 추천 식단과 영양 피드백을 확인할 수 있습니다.

## Main Features

- User login and registration
- Dashboard summary
- InBody data input
- Health goal setting
- Personalized diet recommendation
- Recommended meal plan saving
- Daily meal record management
- Nutrition feedback
- Administrator page

## Implementation

이 프로젝트는 Java Swing으로 작성된 초기 프로토타입을 웹 앱 형태로 구현한 것입니다. 웹 구현은 별도의 서버 없이 실행 가능한 정적 웹 페이지로 구성되어 있습니다.

### Web Files

```text
index.html
styles.css
app.js
```

### Technologies

- HTML
- CSS
- JavaScript
- GitHub Pages

## How to Run

### 1. Run locally

저장소를 다운로드하거나 clone한 뒤 `index.html` 파일을 브라우저에서 실행합니다.

```bash
git clone https://github.com/seohyun-jjang/OSS_Project.git
cd OSS_Project
```

Then open:

```text
index.html
```

### 2. Run on website

GitHub Pages를 통해 아래 주소에서 실행할 수 있습니다.

```text
https://seohyun-jjang.github.io/OSS_Project/
```

## User Flow

1. Register or login
2. Input InBody data
3. Set health goal
4. View personalized diet recommendation
5. Record daily meals
6. Check nutrition feedback
7. Manage data through administrator page

## Recommendation Logic

식단 추천은 사용자의 건강 목표를 기준으로 기본 권장 칼로리를 설정하고, InBody 데이터와 활동 수준에 따라 조정됩니다.

- Weight Loss: lower calorie meal plan
- Muscle Gain: higher protein and calorie meal plan
- Maintain Health: balanced meal plan

입력된 식사 기록은 총 칼로리와 단백질 섭취량 계산에 사용되며, 이를 바탕으로 영양 피드백이 제공됩니다.

## Project Structure

```text
OSS_Project
├── index.html
├── styles.css
├── app.js
├── DietPrototype.java
├── Main.java
├── Conceptualization_22411998_장서현.md
├── Analysis_22411998_장서현.md
├── Design_22411998_장서현.md
├── SequenceDiagrams/
└── images and diagram files
```

## Submission File

Implementation phase submission file:

```text
Implementation_22411998.zip
```

The submission zip contains only the three web implementation files:

```text
index.html
styles.css
app.js
```
