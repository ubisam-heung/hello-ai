# 빠른 시작 가이드 🚀

이 가이드는 Hello DB 프로젝트를 최대한 빠르게 실행하는 방법을 설명합니다.

## 사전 준비

설치가 필요한 프로그램:
- ✅ Docker Desktop (https://www.docker.com/products/docker-desktop)
- ✅ Node.js 16 이상 (https://nodejs.org/)
- ✅ Git (선택사항)

## 1단계: 프로젝트 다운로드

```bash
git clone https://github.com/ubisam-heung/hello-db.git
cd hello-db
```

## 2단계: 자동 설치 및 실행

### macOS / Linux 사용자
```bash
chmod +x setup.sh
./setup.sh
```

### Windows 사용자 (PowerShell)
아래 명령을 순서대로 실행:

```powershell
# 1. Docker 시작
docker compose up -d

# 2. 백엔드 설치 및 실행
cd backend
npm install
Start-Process -NoNewWindow npm start

# 3. 프론트엔드 설치 및 실행 (새 PowerShell 창)
cd ../frontend
npm install
npm run dev
```

## 3단계: 브라우저에서 접속

프론트엔드 서버가 시작되면 다음 주소로 접속:
```
http://localhost:8080
```

## 4단계: 사용해보기

1. **데이터베이스 선택**
   - 상단 드롭다운에서 MySQL, MariaDB, PostgreSQL, Oracle 중 선택

2. **사용자 추가**
   - 왼쪽 폼에 이름과 이메일 입력
   - "추가" 버튼 클릭

3. **목록 확인**
   - 오른쪽 테이블에서 추가된 사용자 확인

4. **수정 및 삭제**
   - 수정 버튼: 사용자 정보 변경
   - 삭제 버튼: 사용자 제거

## 문제 해결

### Docker가 시작되지 않는 경우
```bash
# Docker 실행 여부 확인
docker --version

# Docker Desktop이 실행 중인지 확인
# Windows: 작업 표시줄에서 Docker 아이콘 확인
# macOS: 메뉴 바에서 Docker 아이콘 확인
```

### 포트가 이미 사용 중인 경우
다른 프로그램이 사용하는 포트를 확인하고 종료:
- 3000: 백엔드 API
- 8080: 프론트엔드
- 3306, 3307, 5432, 1521: 데이터베이스

```bash
# 사용 중인 포트 확인 (macOS/Linux)
lsof -i :3000
lsof -i :8080

# 사용 중인 포트 확인 (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :8080
```

### Oracle 데이터베이스가 준비되지 않은 경우
Oracle은 첫 실행 시 5-10분이 소요됩니다. 로그를 확인:
```bash
docker logs -f hello-db-oracle
```

"DATABASE IS READY TO USE!" 메시지를 기다리세요.

### 의존성 설치 오류
캐시를 삭제하고 다시 설치:
```bash
# 백엔드
cd backend
rm -rf node_modules package-lock.json
npm install

# 프론트엔드
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## 주요 명령어 정리

### Docker
```bash
# 모든 DB 시작
docker compose up -d

# 상태 확인
docker compose ps

# 로그 확인
docker logs hello-db-mysql
docker logs hello-db-mariadb
docker logs hello-db-postgres
docker logs hello-db-oracle

# 중지
docker compose stop

# 삭제 (데이터 포함)
docker compose down -v
```

### 백엔드
```bash
cd backend

# 설치
npm install

# 실행
npm start

# 개발 모드 (자동 재시작)
npm run dev
```

### 프론트엔드
```bash
cd frontend

# 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## API 테스트 (curl)

```bash
# 사용자 추가
curl -X POST http://localhost:3000/api/mysql/users \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동","email":"hong@example.com"}'

# 사용자 목록 조회
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

## 다음 단계

더 자세한 정보는 다음 문서를 참조하세요:
- **README.md**: 전체 프로젝트 개요 및 상세 설명
- **TESTING.md**: 테스트 시나리오 및 방법
- **PROJECT_SUMMARY.md**: 프로젝트 완료 요약
- **ARCHITECTURE.md**: 시스템 아키텍처 설명

## 도움이 필요하신가요?

- GitHub Issues: 버그 리포트 및 기능 제안
- 문서: 프로젝트 루트의 Markdown 파일들 참조

즐거운 코딩 되세요! 🎉
