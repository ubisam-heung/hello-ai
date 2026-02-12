#!/bin/bash

echo "======================================="
echo "Hello DB - 설치 및 실행 스크립트"
echo "======================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker가 실행되고 있지 않습니다. Docker를 먼저 실행해주세요."
  exit 1
fi

echo "✅ Docker가 실행 중입니다."
echo ""

# Start databases
echo "📦 데이터베이스 컨테이너를 시작합니다..."
docker compose up -d

if [ $? -eq 0 ]; then
  echo "✅ 데이터베이스 컨테이너가 시작되었습니다."
  echo ""
  echo "⏳ 데이터베이스 초기화를 기다리는 중... (약 30초)"
  sleep 30
else
  echo "❌ 데이터베이스 컨테이너 시작에 실패했습니다."
  exit 1
fi

# Install backend dependencies
echo ""
echo "📦 백엔드 의존성을 설치합니다..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
  if [ $? -eq 0 ]; then
    echo "✅ 백엔드 의존성 설치 완료"
  else
    echo "❌ 백엔드 의존성 설치 실패"
    exit 1
  fi
else
  echo "✅ 백엔드 의존성이 이미 설치되어 있습니다."
fi

# Copy .env file if not exists
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "✅ .env 파일이 생성되었습니다."
fi

cd ..

# Install frontend dependencies
echo ""
echo "📦 프론트엔드 의존성을 설치합니다..."
cd frontend
if [ ! -d "node_modules" ]; then
  npm install
  if [ $? -eq 0 ]; then
    echo "✅ 프론트엔드 의존성 설치 완료"
  else
    echo "❌ 프론트엔드 의존성 설치 실패"
    exit 1
  fi
else
  echo "✅ 프론트엔드 의존성이 이미 설치되어 있습니다."
fi

cd ..

echo ""
echo "======================================="
echo "✅ 설치가 완료되었습니다!"
echo "======================================="
echo ""
echo "다음 명령으로 서버를 실행하세요:"
echo ""
echo "1. 백엔드 서버:"
echo "   cd backend && npm start"
echo ""
echo "2. 프론트엔드 서버 (새 터미널에서):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. 브라우저에서 다음 주소로 접속:"
echo "   http://localhost:8080"
echo ""
echo "데이터베이스 상태 확인:"
echo "   docker compose ps"
echo ""
