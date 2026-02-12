# Hello DB - 프로젝트 테스트 가이드

## 🚀 빠른 시작 (로컬 환경)

### 필수 요구사항
- Node.js 16 이상
- Docker 및 Docker Compose
- npm 또는 yarn

### 단계별 실행

1. **데이터베이스 컨테이너 시작**
   ```bash
   docker compose up -d
   
   # 컨테이너 상태 확인
   docker compose ps
   ```

2. **백엔드 서버 실행**
   ```bash
   cd backend
   npm install
   npm start
   ```
   서버는 http://localhost:3000 에서 실행됩니다.

3. **프론트엔드 실행** (새 터미널)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   프론트엔드는 http://localhost:8080 에서 실행됩니다.

4. **브라우저에서 테스트**
   - http://localhost:8080 접속
   - 데이터베이스 선택 (MySQL, MariaDB, PostgreSQL, Oracle)
   - 이름과 이메일 입력 후 "추가" 버튼 클릭
   - 목록에 새 사용자가 표시되는지 확인
   - 수정 및 삭제 기능 테스트

## 🧪 API 테스트 (curl 또는 Postman)

### MySQL 예제

```bash
# 사용자 생성
curl -X POST http://localhost:3000/api/mysql/users \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동","email":"hong@example.com"}'

# 모든 사용자 조회
curl http://localhost:3000/api/mysql/users

# 특정 사용자 조회
curl http://localhost:3000/api/mysql/users/1

# 사용자 수정
curl -X PUT http://localhost:3000/api/mysql/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"김철수","email":"kim@example.com"}'

# 사용자 삭제
curl -X DELETE http://localhost:3000/api/mysql/users/1
```

### MariaDB, PostgreSQL, Oracle
위 예제의 URL에서 `mysql`을 각각 `mariadb`, `postgresql`, `oracle`로 변경하여 테스트할 수 있습니다.

## 🔍 문제 해결

### Oracle 연결 오류
Oracle DB는 초기화에 5-10분이 소요됩니다. 다음 명령으로 로그를 확인하세요:
```bash
docker logs -f hello-db-oracle
```

"DATABASE IS READY TO USE!" 메시지가 나타나면 준비된 것입니다.

### 포트 충돌
포트가 이미 사용 중이라면:
1. `docker-compose.yml`에서 포트 변경
2. `backend/.env`에서 해당 포트 업데이트
3. 컨테이너 재시작: `docker compose restart`

### 의존성 오류
```bash
# 캐시 정리 후 재설치
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## 📦 프로젝트 구조 확인

```
hello-db/
├── backend/              # Express API 서버
│   ├── db/              # 각 DB별 연결 모듈
│   │   ├── mysql.js
│   │   ├── mariadb.js
│   │   ├── postgresql.js
│   │   └── oracle.js
│   ├── routes/          # REST API 라우트
│   │   ├── mysql.js
│   │   ├── mariadb.js
│   │   ├── postgresql.js
│   │   └── oracle.js
│   ├── server.js        # 메인 서버
│   ├── package.json
│   └── .env            # 환경 변수
├── frontend/            # Vue + Vuetify
│   ├── src/
│   │   ├── App.vue      # 메인 컴포넌트
│   │   ├── main.js
│   │   └── plugins/
│   │       └── vuetify.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── docker-compose.yml   # DB 컨테이너 설정
```

## ✅ 체크리스트

- [ ] Docker 컨테이너 4개 모두 실행 중
- [ ] 백엔드 서버가 3000 포트에서 실행 중
- [ ] 프론트엔드가 8080 포트에서 실행 중
- [ ] 브라우저에서 UI 접근 가능
- [ ] MySQL CRUD 작동 확인
- [ ] MariaDB CRUD 작동 확인
- [ ] PostgreSQL CRUD 작동 확인
- [ ] Oracle CRUD 작동 확인

## 🎯 주요 기능 테스트

1. **데이터베이스 전환**
   - 드롭다운에서 다른 DB 선택
   - 각 DB마다 독립적인 데이터 저장 확인

2. **CRUD 작업**
   - Create: 새 사용자 추가
   - Read: 사용자 목록 조회
   - Update: 사용자 정보 수정
   - Delete: 사용자 삭제

3. **UI/UX**
   - 반응형 레이아웃 확인
   - 버튼 클릭 시 적절한 피드백
   - 에러 처리 확인
   - 성공/실패 스낵바 표시
