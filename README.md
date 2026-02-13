# Hello AI - Multi-Database CRUD Project

Vue.js와 REST API를 이용하여 MySQL, MariaDB, PostgreSQL, Oracle 데이터베이스에 연결하고 CRUD 작업을 수행하는 프로젝트입니다.

## 프로젝트 구조

```
hello-db/
├── backend/              # Node.js Express API 서버
│   ├── db/              # 데이터베이스 연결 모듈
│   ├── routes/          # API 라우트
│   ├── server.js        # 메인 서버 파일
│   └── package.json
├── frontend/            # Vue.js + Vuetify UI
│   ├── src/
│   │   ├── components/
│   │   ├── plugins/
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── docker-compose.yml   # 데이터베이스 컨테이너 설정
```

## 주요 기능

- ✅ 4개의 데이터베이스 지원 (MySQL, MariaDB, PostgreSQL, Oracle)
- ✅ CRUD 작업 (생성, 읽기, 수정, 삭제)
- ✅ ID 자동 생성
- ✅ Vuetify를 이용한 Material Design UI
- ✅ Docker를 통한 데이터베이스 컨테이너 관리
- ✅ REST API를 통한 데이터베이스 연결

## 기술 스택

### Backend
- Node.js
- Express.js
- MySQL2 (MySQL, MariaDB)
- pg (PostgreSQL)
- oracledb (Oracle)

### Frontend
- Vue 3
- Vuetify 3
- Axios
- Vite

### Database
- MySQL 8.0
- MariaDB (latest)
- PostgreSQL 15
- Oracle Express 21.3.0

## 설치 및 실행

### 1. 데이터베이스 컨테이너 실행

```bash
# Docker Compose로 모든 데이터베이스 실행
docker compose up -d

# 컨테이너 상태 확인
docker compose ps

# 데이터베이스가 완전히 시작될 때까지 대기 (약 1-2분)
# Oracle은 최초 실행 시 5-10분 소요될 수 있습니다
```

### 2. 백엔드 서버 실행

```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정 (필요시 .env 파일 수정)
cp .env.example .env

# 서버 실행
npm start

# 개발 모드 (nodemon)
npm run dev
```

백엔드 서버는 http://localhost:3000 에서 실행됩니다.

### 3. 프론트엔드 실행

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 http://localhost:8080 에서 실행됩니다.

## API 엔드포인트

### MySQL
- `GET /api/mysql/users` - 모든 사용자 조회
- `GET /api/mysql/users/:id` - 특정 사용자 조회
- `POST /api/mysql/users` - 사용자 생성
- `PUT /api/mysql/users/:id` - 사용자 수정
- `DELETE /api/mysql/users/:id` - 사용자 삭제

### MariaDB
- `GET /api/mariadb/users` - 모든 사용자 조회
- `GET /api/mariadb/users/:id` - 특정 사용자 조회
- `POST /api/mariadb/users` - 사용자 생성
- `PUT /api/mariadb/users/:id` - 사용자 수정
- `DELETE /api/mariadb/users/:id` - 사용자 삭제

### PostgreSQL
- `GET /api/postgresql/users` - 모든 사용자 조회
- `GET /api/postgresql/users/:id` - 특정 사용자 조회
- `POST /api/postgresql/users` - 사용자 생성
- `PUT /api/postgresql/users/:id` - 사용자 수정
- `DELETE /api/postgresql/users/:id` - 사용자 삭제

### Oracle
- `GET /api/oracle/users` - 모든 사용자 조회
- `GET /api/oracle/users/:id` - 특정 사용자 조회
- `POST /api/oracle/users` - 사용자 생성
- `PUT /api/oracle/users/:id` - 사용자 수정
- `DELETE /api/oracle/users/:id` - 사용자 삭제

## 데이터베이스 연결 정보

### MySQL
- Host: localhost
- Port: 3306
- User: root
- Password: mysql_password
- Database: hello_db

### MariaDB
- Host: localhost
- Port: 3307
- User: root
- Password: mariadb_password
- Database: hello_db

### PostgreSQL
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres_password
- Database: hello_db

### Oracle
- Host: localhost
- Port: 1521
- User: system
- Password: oracle_password
- Service: XEPDB1

## 사용 방법

1. 웹 브라우저에서 http://localhost:8080 접속
2. 상단에서 사용할 데이터베이스 선택 (MySQL, MariaDB, PostgreSQL, Oracle)
3. 왼쪽 폼에서 이름과 이메일 입력
4. "추가" 버튼을 클릭하여 새 사용자 생성
5. 오른쪽 테이블에서 사용자 목록 확인
6. 수정 버튼을 클릭하여 사용자 정보 수정
7. 삭제 버튼을 클릭하여 사용자 삭제

## 문제 해결

### Oracle 데이터베이스 연결 실패
Oracle 데이터베이스는 최초 실행 시 초기화에 시간이 걸립니다. 다음 명령으로 상태를 확인하세요:

```bash
docker logs hello-db-oracle
```

"DATABASE IS READY TO USE!" 메시지가 나타나면 사용 가능합니다.

### 포트 충돌
이미 사용 중인 포트가 있다면 docker-compose.yml과 .env 파일에서 포트를 변경하세요.

### 데이터베이스 초기화
데이터를 초기화하려면:

```bash
docker compose down -v
docker compose up -d
```

## 라이센스

MIT License

## 개발자

Visual Studio Code로 여러 DB와 연결 후 CRUD 작업용 프로젝트
