# [예쁜 손 글씨 홍보 사이트](http://www.beautifulwriting.site) 입니다.

### 사이트 바로가기 -> [www.beautifulwriting.site](http://www.beautifulwriting.site)
<br>
예쁜글씨, 캘리그라피, 폼아트, 토탈공예를 활용한 작품를 소개하기위한 홍보사이트를 위해 재작한 FRONT-END APPLICATION 입니다.
<br>
<br>

### **주의 사항**
- FRONT-END의 AJAX 요청을 처리할 BACK-END 서버 가동이 필수적입니다.
  - BACK-END 프로젝트 [LINK](https://github.com/yudonggeun/handwriting_server)
- 사용 목적에 맞게 주제를 변경해서 사용하는 것 역시 가능하지만 사용시 `youdong98@naver.com`로 사용 여부를 알려주세요.
---
## Stacks
### Environment
<img src="https://img.shields.io/badge/VSC-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### Development
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-gray?style=for-the-badge&logo=react&logoColor=#61DAFB">
<img src="https://img.shields.io/badge/TAILWIND CSS-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=blue">

### Deploy
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/amazon aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">


---
## 시작 가이드
도커 컨테이너 환경에서 실행하기 위한 **Dockerfile**이 포함된 프로젝트입니다. 따라서 도커와 함께 실행하기를 권장합니다.

0. 사전 준비
   1. Docker 설치
   2. npm 설치
   3. 패키지 설치 `npm install`

1. 앱 실행하기 
- 실행 예제
```
$npm run build
$docker build -t example_image_name:example_version .
$docker run -d \ 
-v $(project_path):/app/build \
--name example_name \
--network=option_example \
-p option_example_port:80 \
example_image_name:example_version
```

- 사용 예제
```
$npm run build
$docker build -t nginx-react:0.1 .
$docker run -d \
-v $(pwd)/build:/app/build \
--name handwriting_react \
--network=kong-net \
-p 3000:80 \
nginx-react:0.1 
```

이후 변경사항이 있다면 build 폴더에 빌드 결과물을 교체하고 도커 컨테이너를 재실행하면 변경사항이 적용됩니다. 단 `nginx.conf`의 설정을 변경할 시에는 도커 이미지를 재빌드해야합니다.

- `script/start.sh` 이용하여 실행하기
  
해당 프로젝트는 `GIT ACTION`을 이용하여 자동 배포 시스템을 구축하고 있기에 이를 위한 스크립트 파일이 존재합니다. `script/start.sh`의 `PROJECT_ROOT`의 경로를 배포 환경에 맞게 소스 디렉터리로 수정하고 실행하면 위의 실행과정을 스크립트로 한번에 실행할 수 있습니다.

---
## 화면구성

1. 로딩 화면

![로딩 화면](/introduce/loading_page.gif)

2. 메인 화면

| 유저 공개 화면                              | 관리자 공개 화면                               |
| ------------------------------------------- | ---------------------------------------------- |
| ![메인 유저 화면](/introduce/main-user.gif) | ![메인 관리자 화면](/introduce/main-admin.gif) |

| 반응형 변화                                            |
| ------------------------------------------------------ |
| ![메인 반응형 변화](/introduce/main-user-reaction.gif) |
3. 상세 화면

| 유저 공개 화면                                | 관리자 공개 화면                                 |
| --------------------------------------------- | ------------------------------------------------ |
| ![상세 유저 화면](/introduce/detail-user.PNG) | ![상세 관리자 화면](/introduce/detail-admin.PNG) |

| 반응형 변화                                              |
| -------------------------------------------------------- |
| ![상세 반응형 변화](/introduce/deatil-user-reaction.gif) |
4. 로그인 화면
  * 메인 화면에서 연락처(문의전화) 5번 클릭시 로그인 화면으로 이동 

![로그인 화면](/introduce/login.PNG)


---
## 기능
* 반응형 웹페이지를 통한 홍보
* AJAX을 통한 홍보 이미지 변경, 추가
* AJAX을 통한 홍보 문구 수정 및 삭제
* JWT를 이용한 로그인 기능

---
## 아키텍처
* 배포 파이프라인

![배포 구조](/introduce/deploy.PNG)

* 서비스 구조

![서비스 구조](/introduce/architecture.PNG)