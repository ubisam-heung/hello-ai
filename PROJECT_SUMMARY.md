# Hello DB - 프로젝트 완료 요약

## 프로젝트 개요
Vue.js와 REST API를 활용하여 4개의 데이터베이스(MySQL, MariaDB, PostgreSQL, Oracle)에 대해 CRUD 작업을 수행하는 풀스택 웹 애플리케이션입니다.

## 구현된 기능

### ✅ 백엔드 (Node.js + Express)
- **데이터베이스 연결**
  - MySQL 8.0 지원
  - MariaDB 최신 버전 지원
  - PostgreSQL 15 지원
  - Oracle Express 21.3.0 지원
  
- **REST API 엔드포인트**
  - GET /api/{db_type}/users - 전체 사용자 조회
  - GET /api/{db_type}/users/:id - 특정 사용자 조회
  - POST /api/{db_type}/users - 사용자 생성
  - PUT /api/{db_type}/users/:id - 사용자 수정
  - DELETE /api/{db_type}/users/:id - 사용자 삭제

- **보안 기능**
  - Rate limiting (15분당 100 요청 제한)
  - CORS 설정
  - 환경 변수를 통한 민감 정보 관리
  - 모든 의존성 보안 취약점 해결

### ✅ 프론트엔드 (Vue 3 + Vuetify 3)
- **UI 컴포넌트**
  - Material Design 기반 UI
  - 데이터베이스 선택 드롭다운
  - 사용자 입력 폼 (이름, 이메일)
  - 데이터 테이블 (사용자 목록 표시)
  - 작업 버튼 (추가, 수정, 삭제)
  - 스낵바를 통한 피드백 메시지

- **기능**
  - ID 자동 생성
  - 실시간 CRUD 작업
  - 폼 유효성 검사
  - 에러 핸들링
  - 반응형 디자인

### ✅ 인프라 (Docker)
- **Docker Compose 설정**
  - MySQL 컨테이너 (포트 3306)
  - MariaDB 컨테이너 (포트 3307)
  - PostgreSQL 컨테이너 (포트 5432)
  - Oracle 컨테이너 (포트 1521, 5500)
  - 볼륨 마운트를 통한 데이터 영속성
  - Health check 설정

## 기술 스택

### Backend
```
- Node.js (런타임)
- Express.js 4.18.2 (웹 프레임워크)
- MySQL2 3.9.8 (MySQL/MariaDB 드라이버)
- pg 8.11.3 (PostgreSQL 드라이버)
- oracledb 6.2.0 (Oracle 드라이버)
- express-rate-limit 7.1.5 (보안)
- cors 2.8.5 (CORS)
- dotenv 16.3.1 (환경 변수)
```

### Frontend
```
- Vue 3.3.11 (프레임워크)
- Vuetify 3.4.9 (UI 라이브러리)
- Axios 1.13.5 (HTTP 클라이언트)
- Vite 5.0.12 (빌드 도구)
- @mdi/font 7.4.47 (아이콘)
```

### Database
```
- MySQL 8.0
- MariaDB latest
- PostgreSQL 15
- Oracle Express 21.3.0-xe
```

## 프로젝트 구조
```
hello-db/
├── backend/
│   ├── db/
│   │   ├── mysql.js          # MySQL 연결 및 테이블 초기화
│   │   ├── mariadb.js        # MariaDB 연결 및 테이블 초기화
│   │   ├── postgresql.js     # PostgreSQL 연결 및 테이블 초기화
│   │   └── oracle.js         # Oracle 연결 및 테이블 초기화
│   ├── routes/
│   │   ├── mysql.js          # MySQL CRUD API
│   │   ├── mariadb.js        # MariaDB CRUD API
│   │   ├── postgresql.js     # PostgreSQL CRUD API
│   │   └── oracle.js         # Oracle CRUD API
│   ├── server.js             # Express 서버 메인
│   ├── package.json
│   ├── .env.example          # 환경 변수 예제
│   └── .env                  # 환경 변수 (git ignored)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── plugins/
│   │   │   └── vuetify.js    # Vuetify 설정
│   │   ├── App.vue           # 메인 Vue 컴포넌트
│   │   └── main.js           # Vue 앱 진입점
│   ├── index.html
│   ├── vite.config.js        # Vite 설정
│   └── package.json
├── docker-compose.yml        # 데이터베이스 컨테이너 설정
├── setup.sh                  # 자동 설치 스크립트
├── README.md                 # 프로젝트 문서
├── TESTING.md                # 테스트 가이드
└── .gitignore
```

## 보안 고려사항

### ✅ 해결된 보안 이슈
1. **Rate Limiting 구현**
   - API 엔드포인트에 요청 제한 추가
   - DoS 공격 방지

2. **의존성 취약점 해결**
   - mysql2: 3.6.5 → 3.9.8 (RCE, Prototype Pollution 수정)
   - axios: 1.6.2 → 1.13.5 (DoS, SSRF 수정)
   - vite: 5.0.8 → 5.0.12 (파일 시스템 우회 수정)

3. **환경 변수 관리**
   - 민감 정보 .env 파일로 분리
   - .env 파일 .gitignore에 추가

4. **CodeQL 분석**
   - 모든 보안 경고 해결 완료
   - 0개의 보안 알림

## 데이터베이스 스키마

모든 데이터베이스는 동일한 users 테이블 구조를 사용:

```sql
users 테이블:
- id: 자동 증가 기본키 (INT/SERIAL/NUMBER)
- name: 사용자 이름 (VARCHAR/VARCHAR2(255))
- email: 이메일 주소 (VARCHAR/VARCHAR2(255))
- created_at: 생성 시간 (TIMESTAMP, 기본값: 현재 시간)
```

## 실행 방법

### 1. 자동 설치 (권장)
```bash
./setup.sh
```

### 2. 수동 설치
```bash
# 1. 데이터베이스 시작
docker compose up -d

# 2. 백엔드 설치 및 실행
cd backend
npm install
npm start

# 3. 프론트엔드 설치 및 실행 (새 터미널)
cd frontend
npm install
npm run dev
```

### 3. 접속
- 프론트엔드: http://localhost:8080
- 백엔드 API: http://localhost:3000
- Health Check: http://localhost:3000/health

## 테스트 시나리오

### 기본 CRUD 테스트
1. 브라우저에서 http://localhost:8080 접속
2. 데이터베이스 선택 (예: MySQL)
3. 이름과 이메일 입력 후 "추가" 클릭
4. 목록에 새 사용자가 표시되는지 확인
5. 수정 버튼 클릭하여 정보 변경
6. 삭제 버튼 클릭하여 사용자 제거
7. 다른 데이터베이스 선택하여 독립적 데이터 확인

### API 테스트 (curl)
```bash
# MySQL에 사용자 추가
curl -X POST http://localhost:3000/api/mysql/users \
  -H "Content-Type: application/json" \
  -d '{"name":"테스트","email":"test@example.com"}'

# 모든 사용자 조회
curl http://localhost:3000/api/mysql/users
```

## 성능 고려사항
- 데이터베이스 연결 풀링 사용
- 각 DB별 독립적 연결 관리
- 비동기 처리로 높은 동시성 지원

## 향후 개선 가능 사항
1. 인증 및 권한 관리
2. 페이지네이션 추가
3. 검색 및 필터링 기능
4. 데이터 유효성 강화
5. 단위 테스트 추가
6. E2E 테스트 추가
7. 로깅 시스템 구축
8. 프로덕션 배포 설정

## 학습 목표 달성
✅ Vue.js 3 프레임워크 사용
✅ Vuetify Material Design UI 구현
✅ REST API 설계 및 구현
✅ 4개 데이터베이스 연동 (MySQL, MariaDB, PostgreSQL, Oracle)
✅ CRUD 작업 구현
✅ Docker를 통한 데이터베이스 관리
✅ ID 자동 생성
✅ 사용자 입력 폼 및 목록 표시
✅ 보안 고려사항 적용

## 라이센스
MIT License

## 문의 및 지원
- GitHub Issues를 통해 버그 리포트 및 기능 제안
- Pull Request 환영

---
**프로젝트 완료일**: 2026-02-12
**개발 환경**: Visual Studio Code, Node.js, Docker
