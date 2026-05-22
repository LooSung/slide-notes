# 진격! 바이브 코딩

## AI와 함께하는 문서 중심 개발 방법론

> **발표 시간**: 30분 (인트로 5분 + 핵심 방법론 7분 + 라이브 코딩 15분 + 마무리 3분)

---

# Part 1: 바이브 코딩은 정답이 아닙니다 :( (5분)

## 🤔 기존 개발 방식의 문제점

### 문제 1: 코드부터 짜고 나중에 후회

```
개발자: "일단 코드부터 짜볼까?"
       ↓
     (2주 후)
개발자: "이 코드 왜 이렇게 짰지...?"
       "어떻게 동작하는 거지...?"
       "문서? 그런 거 있었나...?"
```

### 문제 2: 설계 없이 시작하면 리팩토링 지옥

```
요구사항 변경 → 코드 수정
   ↓
또 변경 → 또 수정
   ↓
또또 변경 → 완전 갈아엎기
```

### 문제 3: 혼자 알고 있는 지식

```
나만 아는 코드 → 팀원 질문 폭탄
               → 인수인계 악몽
               → 레거시화
```

---

## 💡 해결책: 바이브 코딩!

### 바이브 코딩이란?

**"문서 먼저 쓰고 → 구조 잡고 → AI와 함께 코드 짜는"** 개발 방법론

핵심 3가지:

1. 📝 **문서 중심 개발** (Documentation-Driven Development)
2. 🤖 **AI 페어 프로그래밍** (AI Pair Programming)
3. 🎯 **점진적 구현** (Incremental Implementation)

### "바이브 코딩" 정답은 아니다 :(

-   **라이브** 코딩 세션에서 시작
-   AI와 **대화하며** 진행
-   **즉흥적이지만 체계적**인 개발
-   팀과 **함께** 성장하는 **바이브**

---

# Part 2: 핵심 방법론 (7분)

## 🛠️ 핵심 도구

### 1. AI 코딩 어시스턴트 (필수!)

**Cursor** 또는 **GitHub Copilot**

바이브 코딩의 핵심은 **AI와 대화하면서 코드 작성**하는 것입니다.

```
나: "유저 생성 기능 만들어줘"
AI: "네, 어떤 필드가 필요한가요?"
나: "이메일, 비밀번호, 이름"
AI: "비밀번호는 해싱하나요?"
나: "응, bcrypt로"
AI: "알겠습니다. 코드 생성할게요"
```

### 2. 기타 도구

-   **Markdown**: 문서 작성
-   **Git**: 버전 관리
-   **OBS/Zoom**: 라이브 세션 (선택)

---

## 📐 3단계 프로세스

### 0단계: 프로젝트 초기화 (한 번만)

**AGENTS.md 파일 생성** - AI를 위한 프로젝트 가이드

```markdown
# AGENTS.md (프로젝트 루트)

## Project Structure

app/
domain/ # 도메인 모델
application/ # 서비스 계층
infrastructure/ # DB, 외부 API
presentation/ # API 엔드포인트

## Coding Style

-   Python 3.10+
-   snake_case for functions
-   PascalCase for classes

## Architecture

-   Clean Architecture
-   Repository Pattern
-   Dependency Injection
```

**왜 필요한가?**

-   AI에게 프로젝트 컨텍스트 제공
-   일관된 코드 스타일 유지
-   새로운 팀원/AI 온보딩 용이

---

### 1단계: 문서 먼저 작성 (Documentation First)

**코드 짜기 전에 먼저 무엇을 만들지 정리**

```markdown
# docs/account/user_creation.md

## 개요

-   기능: 새로운 유저 계정 생성
-   엔드포인트: POST /api/internal/accounts/user

## 핵심 기능

1. 이메일 중복 체크
2. 비밀번호 검증 (최소 8자)
3. 비밀번호 해싱 (bcrypt)
4. 유저 생성
5. MongoDB 저장

## 플로우

요청 → 검증 → 이메일 중복 체크 → 비밀번호 해싱 → 저장 → 응답

## 아키텍처

-   Service: UserCreationService
-   Repository: UserRepository (인터페이스)
-   Infrastructure: UserRepositoryImpl (MongoDB)
```

**장점**:

-   큰 그림을 먼저 파악
-   빠뜨린 요구사항 발견
-   나중에 코드 보고 "왜 만들었지?" 안 함

---

### 2단계: 구조 설계 (Architecture Design)

**파일 구조 계획**

```
app/
  ├── domain/account/
  │   ├── user.py                    # 도메인 모델
  │   └── repository/
  │       └── user_repository.py     # 인터페이스
  │
  ├── application/services/account/
  │   └── user_creation_service.py   # 비즈니스 로직
  │
  ├── infrastructure/repositories/account/
  │   └── user_repository_impl.py    # MongoDB 구현
  │
  └── presentation/api/internal/routers/account/
      └── user_controller.py         # API 엔드포인트
```

**계층 분리**:

-   Domain: 비즈니스 로직
-   Application: 유스케이스
-   Infrastructure: 기술 구현
-   Presentation: 사용자 인터페이스

---

### 3단계: 점진적 구현 (Incremental Implementation)

**작은 단위로 나누어 단계별 구현**

구현 순서:

1. Domain Model (엔티티)
2. Repository Interface (데이터 접근 추상화)
3. Service Layer (비즈니스 로직)
4. Repository Implementation (실제 DB 연동)
5. Controller (API 엔드포인트)
6. Dependency Injection (의존성 주입)

**핵심**: 한 번에 다 만들지 않고, 하나씩 완성

---

## 🤖 AI 활용 패턴

### 패턴 1: 명확한 요구사항 전달

❌ 나쁜 예:

```
"유저 만들어줘"
```

✅ 좋은 예:

```
"이메일, 비밀번호, 이름을 받아서
User 도메인 모델로 만들고
비밀번호는 bcrypt로 해싱해서
MongoDB에 저장하는 유저 생성 기능 만들어줘"
```

### 패턴 2: 컨텍스트 제공

```
나: "기존 프로젝트 구조 보면
    get_mongodb_client() 사용하는 것 같아요.
    이걸 참고해서 UserRepository 구현해줘"

AI: "네, get_mongodb_client() 사용해서 구현할게요"
```

### 패턴 3: 점진적 개선

```
1단계: "일단 User 모델만 만들어줘"
       ↓
2단계: "이제 Repository 인터페이스 추가해줘"
       ↓
3단계: "서비스 계층 비즈니스 로직 처리하도록 해줘"
```

### 패턴 4: 함께 개선하기

```
나: "이 코드 괜찮은데, 비밀번호 검증 로직을
    별도 메서드로 분리하는 게 좋을 것 같아요"

AI: "좋은 생각이에요. _validate_password로 분리할게요"
```

---

# Part 3: 라이브 바이브 코딩! (15분)

## 🎬 실전: 유저 생성 기능 만들기

**목표**: 유저 생성 API를 AI와 함께 실시간으로 구현

---

## [5분] Step 1: 문서 작성

### AI에게 요청

```
나: "유저 생성 기능 설계 문서 만들어줘.
    docs/account/user_creation.md 파일로.

    필요한 내용:
    - 이메일, 비밀번호, first_name, last_name 받기
    - 이메일 중복 체크
    - 비밀번호 최소 8자 검증
    - bcrypt로 해싱
    - MongoDB에 저장"
```

### AI가 생성한 문서 리뷰

```markdown
# 유저 생성 기능

## 개요

-   엔드포인트: POST /api/internal/accounts/user
-   기능: 새로운 사용자 계정 생성

## 요청 스키마

{
"email": "user@example.com",
"password": "password123",
"first_name": "John",
"last_name": "Doe"
}

## 검증 규칙

-   이메일 중복 체크
-   비밀번호 정책 (최소 8자)

## 플로우

1. 요청 데이터 검증
2. 이메일 중복 확인
3. 비밀번호 검증 및 해싱
4. 유저 생성
5. 응답 반환
```

### 문서 검토 및 수정

```
나: "좋은데, 응답 형식도 추가해줘"
AI: "네, 응답 스키마 추가할게요"
```

---

## [3분] Step 2: 도메인 모델

### AI에게 요청

```
나: "User 도메인 모델 만들어줘.
    app/domain/account/user.py 파일로.

    필드:
    - user_id (UUID)
    - email (EmailStr)
    - password_hash (str)
    - first_name (str)
    - last_name (str)
    - created_at (datetime)
    - is_active (bool, 기본값 True)"
```

### AI가 생성한 코드

```python
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    """유저 도메인 모델"""
    user_id: UUID
    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_active: bool = True
```

### 코드 개선

```
나: "password_hash는 응답에 포함되면 안 되니까
    model_dump할 때 제외되도록 해줘"

AI: "네, Field(exclude=True) 추가할게요"
```

---

### Repository 인터페이스

```
나: "UserRepository 인터페이스 만들어줘.
    app/domain/account/repository/user_repository.py"
```

```python
from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID
from app.domain.account.user import User

class UserRepository(ABC):
    """유저 저장소 인터페이스"""

    @abstractmethod
    async def create(self, user: User) -> User:
        pass

    @abstractmethod
    async def get_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    async def get_by_id(self, user_id: UUID) -> Optional[User]:
        pass
```

---

## [5분] Step 3: 서비스 계층

### AI에게 요청

```
나: "UserCreationService 만들어줘.
    app/application/services/account/user_creation_service.py

    로직:
    1. 이메일 중복 체크 (Repository 사용)
    2. 비밀번호 검증 (최소 8자)
    3. bcrypt로 해싱
    4. User 객체 생성 (UUID, 현재시간)
    5. Repository로 저장"
```

### AI가 생성한 코드

```python
from uuid import uuid4
from datetime import datetime
from app.domain.account.user import User
from app.domain.account.repository.user_repository import UserRepository
from app.shared.exception.common_exceptions import ValidationException

class UserCreationService:
    """유저 생성 서비스"""

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def create_user(
        self,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
    ) -> User:
        # 1. 이메일 중복 확인
        existing_user = await self.user_repository.get_by_email(email)
        if existing_user:
            raise ValidationException("Email already exists")

        # 2. 비밀번호 검증
        if len(password) < 8:
            raise ValidationException("Password must be at least 8 characters")

        # 3. 비밀번호 해싱
        password_hash = self._hash_password(password)

        # 4. 유저 생성
        user = User(
            user_id=uuid4(),
            email=email,
            password_hash=password_hash,
            first_name=first_name,
            last_name=last_name,
            created_at=datetime.utcnow(),
            is_active=True,
        )

        # 5. 저장
        return await self.user_repository.create(user)

    def _hash_password(self, password: str) -> str:
        import bcrypt
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
```

### 코드 개선

```
나: "비밀번호 검증 로직을 별도 메서드로 분리해줘"
AI: "네, _validate_password 메서드로 분리할게요"
```

---

## [2분] Step 4: 나머지 구조 설명

**시간 관계상 설명만**

### Repository 구현

```python
class UserRepositoryImpl(UserRepository):
    def __init__(self):
        self.collection = get_mongodb_client()["internal"]["user"]

    async def create(self, user: User) -> User:
        user_dict = user.model_dump()
        await self.collection.insert_one(user_dict)
        return user
```

### Controller (API 엔드포인트)

```python
@router.post("", description="Create new user")
async def create_user(
    request: CreateUserRequest,
    service: UserCreationService = Depends(get_user_creation_service),
):
    user = await service.create_user(
        email=request.email,
        password=request.password,
        first_name=request.first_name,
        last_name=request.last_name,
    )
    return ApiResponse.success(data=user.model_dump())
```

---

# Part 4: 마무리 (3분)

## ✅ 바이브 코딩의 장점

### 1. 명확한 설계

-   문서를 먼저 작성해서 큰 그림 파악
-   "왜 이렇게 만들었지?" → 문서 보면 됨

### 2. 유지보수성 향상

-   코드와 문서가 함께 있음
-   새로운 팀원도 빠르게 이해

### 3. AI와의 효율적인 협업

-   명확한 요구사항 → 더 나은 코드 생성
-   점진적 개선 → 완성도 높은 결과

### 4. 지식 공유

-   개발 과정 공유 → 팀 전체 성장
-   실시간 피드백 → 더 나은 설계

---

## 🎯 핵심 정리

### 바이브 코딩 = 문서 + AI + 점진적 구현

```
1. AGENTS.md로 프로젝트 가이드 작성 (한 번만)
   ↓
2. 문서부터 작성 (무엇을 만들지 명확히)
   ↓
3. 구조 설계 (파일 구조 계획)
   ↓
4. AI와 대화하며 점진적 구현
   ↓
5. 문서 업데이트 (코드와 함께)
```

### 핵심 원칙

1. **문서 먼저** - 코드 짜기 전에 정리
2. **AI와 대화** - 명확한 요구사항 전달
3. **점진적 구현** - 작은 단위로 완성
4. **함께 개선** - 실시간 피드백

---

## 💬 Q&A

**자주 묻는 질문**

**Q: 문서 작성이 시간이 더 걸리지 않나요?**
A: 오히려 시간 절약! 나중에 "이거 뭐였지?" 하면서 코드 뜯어보는 시간이 훨씬 더 많이 걸립니다.

**Q: AI가 틀린 코드를 생성하면?**
A: 그래서 점진적으로! 작은 단위로 검토하면서 진행하면 바로 잡을 수 있습니다.

**Q: 기존 프로젝트에도 적용 가능한가요?**
A: 네! AGENTS.md부터 만들고, 새로운 기능부터 바이브 코딩으로 시작하세요.

**Q: 혼자 개발할 때도 유용한가요?**
A: 매우! 미래의 나에게 설명하는 것도 중요합니다. 3개월 후 내가 감사할 거예요.

---

## 🚀 시작하기

### 오늘부터 바로 시작하세요!

1. **AGENTS.md 만들기**

    - 프로젝트 구조 정리
    - 코딩 스타일 정의

2. **다음 기능부터 문서 먼저**

    - 무엇을 만들지 정리
    - 플로우 설계

3. **AI와 대화하며 구현**

    - Cursor/Copilot 활용
    - 점진적으로 완성

4. **팀과 공유**
    - 라이브 세션 진행
    - 지식 축적

---

## 📚 참고 자료

-   GitHub: [당신의 프로젝트 링크]
-   블로그: [바이브 코딩 상세 가이드]
-   디스코드: [커뮤니티 링크]

---

# 감사합니다! 🎉

**진격! 바이브 코딩으로 함께 성장하세요!**

질문 있으시면 언제든지 편하게 물어보세요 😊
