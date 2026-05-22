# 진격! 바이브 코딩 (aka. 그냥 내가 요즘 이렇게 짬)

## 📋 개요

바이브 코딩은 **라이브 코딩 세션에서 실시간으로 코드를 작성하면서 설명하는 개발 방법론**입니다.  
시청자와 상호작용하며 함께 생각하고, 문서를 먼저 작성한 후 코드를 구현하는 **문서 중심 개발(Documentation-Driven Development)** 방식을 따릅니다.

간단히 말하면, 문서 먼저 쓰고 → 구조 잡고 → 코드 짜는 순서로 개발하는 방식입니다.AI 코딩 어시스턴트

- **목적**: 명확한 설계와 문서화를 통한 유지보수성 향상
- **핵심**: 문서 → 구조 → 구현 순서
- **대상**: 팀 내부 공유, 온보딩, 지식 전달

---

## 🎯 바이브 코딩이란?

### 정의

**바이브 코딩 (Vibe Coding)**은:

- 🎥 **라이브 코딩 세션**: 실시간으로 코드를 작성하며 설명
- 💬 **상호작용**: 시청자와 질문/답변하며 함께 발전
- 📝 **문서 중심**: 코드보다 문서를 먼저 작성
- 🏗️ **구조 우선**: 전체 구조를 설계한 후 세부 구현

### 특징

1. **실시간 피드백**: 시청자의 질문에 즉시 답변하며 코드 수정
    - 함께 고민하면서 더 나은 방법을 찾아갑니다

2. **생각 과정 공유**: "왜 이렇게 설계했는가"를 함께 고민
    - 설계 결정의 이유를 공유합니다

3. **문서화 우선**: 코드 작성 전에 설계 문서 먼저 작성
    - 나중에 코드를 봤을 때 왜 만들었는지 바로 이해할 수 있습니다

4. **점진적 구현**: 작은 단위로 나누어 단계별 구현
    - 한 번에 다 만들려고 하지 않고, 하나씩 완성해갑니다

---

## 🛠️ 사용하는 툴

### 필수 툴

#### 1. **AI 코딩 어시스턴트 (핵심!)**

- **Cursor** 또는 **GitHub Copilot**
    - AI와 대화하면서 코드 작성
    - 자연어로 요구사항 설명하면 코드 생성
    - 실시간 코드 제안 및 수정

**바이브 코딩의 핵심은 AI와 함께 코딩하는 것입니다.**

#### 2. **문서 작성**

- **Markdown** (`.md` 파일)
    - 구조화된 문서 작성
    - 코드 블록 포함 가능
    - Git으로 버전 관리

#### 3. **버전 관리**

- **Git**
    - 변경 이력 추적
    - 브랜치 전략 활용
    - 코드 리뷰 용이

#### 4. **라이브 코딩 스트리밍**

- **OBS Studio** (화면 녹화/스트리밍)
- **VS Code Live Share** (협업 코딩)
- **Discord/Zoom** (화면 공유)

### 선택적 툴

- **Mermaid** (다이어그램 생성)
- **Postman/Insomnia** (API 테스트)
- **Docker** (환경 통일)

---

## 🤖 AI와 함께하는 바이브 코딩

### AI 코딩 어시스턴트 활용 방법

바이브 코딩의 핵심은 **AI와 대화하면서 코드를 작성**하는 것입니다.

#### 1. AI에게 요구사항 설명하기

**예시 대화**:

```
나: "유저 생성 기능을 만들어줘. 이메일, 비밀번호, 이름을 받아서 MongoDB에 저장하는 거야."

AI: "네, User 도메인 모델과 UserRepository를 만들어드릴게요."

나: "비밀번호는 해싱해서 저장해야 해."

AI: "bcrypt로 해싱하는 코드 추가할게요."
```

#### 2. AI가 제안한 코드 검토하기

AI가 코드를 제안하면:

- 코드를 읽어보고 이해하기
- 필요한 부분 수정 요청
- 함께 개선하기

**예시**:

```
AI: [코드 제안]

나: "이메일 중복 체크는 어디서 하나요?"

AI: "서비스 계층에서 체크하는 게 좋을 것 같아요. 추가해드릴게요."
```

#### 3. 점진적으로 개선하기

한 번에 완벽한 코드를 만들려고 하지 않고, 단계별로 개선합니다.

**예시**:

```
1단계: 기본 구조만 만들기
나: "일단 User 모델만 만들어줘"

2단계: Repository 추가
나: "이제 Repository 인터페이스 추가해줘"

3단계: 서비스 로직 추가
나: "서비스 계층에서 비즈니스 로직 처리하도록 해줘"
```

#### 4. 문서와 함께 진행하기

코드를 작성하면서 동시에 문서도 업데이트합니다.

**예시**:

```
나: "이제 유저 생성 기능 완성했으니, docs/account/user_creation.md 파일 업데이트해줘"

AI: "네, 구현한 내용 반영해서 문서 업데이트할게요."
```

### AI 활용 팁

#### 1. 명확하게 요구사항 설명하기

- ❌ "유저 만들어줘" (너무 모호함)
- ✅ "이메일, 비밀번호, 이름을 받아서 User 도메인 모델로 만들고 MongoDB에 저장하는 유저 생성 기능 만들어줘"

#### 2. 컨텍스트 제공하기

- 프로젝트 구조 설명
- 사용하는 라이브러리/프레임워크 언급
- 기존 코드 스타일 참고

#### 3. 단계별로 요청하기

- 한 번에 모든 것을 요청하지 않기
- 작은 단위로 나누어 요청
- 각 단계마다 검토하고 다음 단계로 진행

#### 4. 함께 개선하기

- AI가 제안한 코드를 그대로 사용하지 않기
- 필요한 부분 수정 요청
- 더 나은 방법 함께 고민

---

## 📐 개발 방법론

### 0단계: 프로젝트 초기화 (Project Initialization)

**프로젝트를 시작할 때 먼저 초기 설정을 합니다.**

#### AGENTS.md 파일 생성

프로젝트 루트에 `AGENTS.md` 파일을 만들어 프로젝트 구조와 가이드라인을 정리합니다.

**AGENTS.md 내용**:

- 프로젝트 구조 설명
- 아키텍처 개요
- 코딩 스타일 및 네이밍 컨벤션
- 테스트 가이드라인
- 커밋 및 PR 가이드라인
- 환경 설정 팁

**예시**:

```markdown
# Repository Guidelines

## Project Structure & Module Organization
```

app/
application/ # DTOs + use-case services
domain/ # Domain models
infrastructure/ # Persistence, integrations
presentation/ # API layer
shared/ # Cross-cutting utilities

```

## Architecture Overview
- Tier별 배포 구조 설명
- 주요 컴포넌트 설명

## Coding Style & Naming Conventions
- Python 3.10, 4-space indentation
- snake_case for functions, PascalCase for classes
- 120-character line length

## Testing Guidelines
- Pytest 사용
- Coverage 60% 이상 유지

## Commit & Pull Request Guidelines
- feat, hot-fix, refactor 등의 prefix 사용
- 72자 이내로 커밋 메시지 작성
```

이 파일은 나중에 프로젝트에 참여하는 사람들이나 AI 어시스턴트가 프로젝트를 이해하는 데 도움이 됩니다.

### 1단계: 문서 작성 (Documentation First)

**코드를 작성하기 전에 먼저 문서를 작성합니다.**

코드부터 짜고 나중에 문서를 쓰려고 하면, 나중에 왜 이렇게 만들었는지 기억이 안 나고 유지보수가 어려워집니다.

#### 문서 구조

```
docs/
  └── {domain}/
      └── {feature}_management.md
```

예시:

```
docs/
  └── account/
      └── account_management.md
  └── auth/
      └── authentication.md
```

#### 문서 템플릿

```markdown
# {기능명} 통합 설계 문서

## 📋 개요

- 적용 범위
- Tier
- 주요 기능

## 🎯 핵심 기능

### 1. {기능 1}

#### 엔드포인트

- **엔드포인트**: `POST /api/{path}`
- **기능**: 설명

#### 플로우

1. 단계 1
2. 단계 2
3. 단계 3

## 🏗️ 아키텍처

### 서비스 계층

- Service 클래스 설명

### 저장소

- Repository 인터페이스/구현

## 🔗 관련 파일

- 구현 파일 목록
```

### 2단계: 구조 설계 (Architecture Design)

**문서를 바탕으로 코드 구조를 설계합니다.**

#### 계층 구조

```
app/
  ├── domain/              # 도메인 모델
  │   └── {domain}/
  │       ├── {model}.py
  │       └── repository/
  │           └── {repository}_interface.py
  │
  ├── application/         # 서비스 계층
  │   └── services/
  │       └── {domain}/
  │           └── {service}.py
  │
  ├── infrastructure/      # 인프라 계층
  │   ├── repositories/
  │   │   └── {repository}_impl.py
  │   └── dependencies/
  │       └── {dependency}.py
  │
  └── presentation/        # 프레젠테이션 계층
      └── api/
          └── {tier}/
              └── routers/
                  └── {controller}.py
```

### 3단계: 점진적 구현 (Incremental Implementation)

**작은 단위로 나누어 단계별로 구현합니다.**

한 번에 다 만들려고 하지 않고, 하나씩 완성해가는 방식입니다.

#### 구현 순서

1. **도메인 모델** (Domain Model)
    - 엔티티 정의
    - 비즈니스 로직

2. **Repository 인터페이스** (Repository Interface)
    - 데이터 접근 추상화

3. **서비스 계층** (Service Layer)
    - 비즈니스 로직 구현

4. **Repository 구현** (Repository Implementation)
    - 실제 데이터베이스 연동

5. **컨트롤러** (Controller)
    - API 엔드포인트

6. **의존성 주입** (Dependency Injection)
    - FastAPI Depends 설정

---

## 📋 전체 프로세스 요약

### 단계별 순서

1. **0단계: 프로젝트 초기화**
    - `AGENTS.md` 파일 생성
    - 프로젝트 구조 및 가이드라인 정리

2. **1단계: 문서 작성**
    - 기능별 설계 문서 작성 (`docs/{domain}/{feature}_management.md`)
    - 요구사항 정리
    - 플로우 설계

3. **2단계: 구조 설계**
    - 계층 구조 설계
    - 파일 구조 계획

4. **3단계: 점진적 구현**
    - 도메인 모델 → Repository 인터페이스 → 서비스 계층 → Repository 구현 → 컨트롤러 → 의존성 주입

---

## 🎬 실제 예시: 유저 생성 기능 (AI와 함께)

### AI와의 대화로 시작하기

바이브 코딩은 AI와 대화하면서 시작합니다.

**대화 예시**:

```
나: "유저 생성 기능을 만들어야 해. 이메일, 비밀번호, 이름을 받아서 MongoDB에 저장하는 거야."

AI: "네, Clean Architecture 구조로 만들면 좋을 것 같아요.
     Domain 모델부터 시작할까요, 아니면 전체 구조를 먼저 설계할까요?"

나: "일단 문서부터 작성하고 싶어. docs/account/user_creation.md 파일 만들어줘"

AI: "네, 유저 생성 기능 설계 문서 템플릿 만들어드릴게요."
```

### Step 0: 프로젝트 초기화 (이미 완료된 경우 생략 가능)

프로젝트를 처음 시작하는 경우, 먼저 `AGENTS.md` 파일을 생성합니다.

**파일**: `AGENTS.md` (프로젝트 루트)

```markdown
# Repository Guidelines

## Project Structure & Module Organization
```

app/
application/ # DTOs + use-case services
domain/ # Domain models
infrastructure/ # Persistence, integrations
presentation/ # API layer
shared/ # Cross-cutting utilities

```

## Architecture Overview
- Clean Architecture 기반
- 계층별 분리 (Domain, Application, Infrastructure, Presentation)

## Coding Style & Naming Conventions
- Python 3.10
- snake_case for functions, PascalCase for classes
- 4-space indentation
```

### Step 1: 문서 작성

**파일**: `docs/account/user_creation.md`

```markdown
# 유저 생성 기능

## 📋 개요

- **엔드포인트**: `POST /api/internal/accounts/user`
- **기능**: 새로운 사용자 계정 생성
- **Tier**: INTEGRATOR

## 🎯 핵심 기능

### 1. 유저 생성

#### 요청

- `email`: 이메일 주소
- `password`: 비밀번호
- `first_name`: 이름
- `last_name`: 성

#### 검증

- 이메일 중복 체크
- 비밀번호 정책 (최소 8자)
- 필수 필드 검증

#### 플로우

1. 요청 데이터 검증
2. 이메일 중복 확인
3. 비밀번호 해싱
4. 유저 생성
5. 응답 반환

## 🏗️ 아키텍처

### 서비스 계층

- `UserCreationService`: 유저 생성 로직

### 저장소

- `UserRepository`: 유저 데이터 접근
```

### Step 2: 도메인 모델 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 User 도메인 모델 만들어줘. user_id, email, password_hash, first_name, last_name, created_at, updated_at, is_active 필드 필요해."

AI: "네, Pydantic BaseModel로 만들어드릴게요."
```

**파일**: `app/domain/account/user.py`

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

**AI가 생성한 코드를 검토하고 필요한 부분 수정 요청**:

```
나: "password_hash는 응답에 포함하지 않아야 해. model_dump할 때 제외되도록 해줘"

AI: "네, Config 클래스에 exclude 필드 추가할게요."
```

### Step 3: Repository 인터페이스 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 UserRepository 인터페이스 만들어줘. create, get_by_email, get_by_id 메서드 필요해."

AI: "네, ABC를 상속받아서 추상 메서드로 만들어드릴게요."
```

**파일**: `app/domain/account/repository/user_repository.py`

```python
from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from app.domain.account.user import User


class UserRepository(ABC):
    """유저 저장소 인터페이스"""

    @abstractmethod
    async def create(self, user: User) -> User:
        """유저 생성"""
        pass

    @abstractmethod
    async def get_by_email(self, email: str) -> Optional[User]:
        """이메일로 유저 조회"""
        pass

    @abstractmethod
    async def get_by_id(self, user_id: UUID) -> Optional[User]:
        """ID로 유저 조회"""
        pass
```

**추가 요청**:

```
나: "나중에 확장할 수 있도록 다른 메서드도 생각해봐. update, delete 같은 거"

AI: "네, update와 delete 메서드도 추가할게요. 필요하면 나중에 구현하면 되니까요."
```

### Step 4: 서비스 계층 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 UserCreationService 만들어줘. 이메일 중복 체크하고, 비밀번호 검증하고, 해싱해서 저장하는 로직이야."

AI: "네, 비즈니스 로직을 서비스 계층에 구현할게요.
     이메일 중복 체크, 비밀번호 검증, 해싱, 유저 생성 순서로 진행하면 될까요?"

나: "응, 그렇게 해줘. 비밀번호는 bcrypt로 해싱해줘"

AI: "네, bcrypt 사용해서 해싱하는 코드 추가할게요."
```

**파일**: `app/application/services/account/user_creation_service.py`

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
        """유저 생성"""
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
        """비밀번호 해싱"""
        import bcrypt
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
```

**코드 개선 요청**:

```
나: "비밀번호 검증 로직을 별도 메서드로 분리해줘. 나중에 정책이 바뀔 수 있으니까"

AI: "네, _validate_password 메서드로 분리할게요."
```

### Step 5: Repository 구현 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 UserRepositoryImpl 만들어줘. MongoDB에 저장하는 거야.
     기존 프로젝트에서 MongoDB 클라이언트 사용하는 방식 참고해서 만들어줘"

AI: "네, get_mongodb_client() 사용해서 MongoDB 연결하고,
     internal.user 컬렉션에 저장하도록 구현할게요."
```

**파일**: `app/infrastructure/repositories/account/user_repository_impl.py`

```python
from typing import Optional
from uuid import UUID

from app.domain.account.user import User
from app.domain.account.repository.user_repository import UserRepository
from app.infrastructure.persistence.documentdb.mongodb import get_mongodb_client


class UserRepositoryImpl(UserRepository):
    """유저 저장소 MongoDB 구현"""

    def __init__(self):
        self.collection = get_mongodb_client()["internal"]["user"]

    async def create(self, user: User) -> User:
        """유저 생성"""
        user_dict = user.model_dump()
        await self.collection.insert_one(user_dict)
        return user

    async def get_by_email(self, email: str) -> Optional[User]:
        """이메일로 유저 조회"""
        user_doc = await self.collection.find_one({"email": email})
        if not user_doc:
            return None
        return User(**user_doc)

    async def get_by_id(self, user_id: UUID) -> Optional[User]:
        """ID로 유저 조회"""
        user_doc = await self.collection.find_one({"user_id": str(user_id)})
        if not user_doc:
            return None
        return User(**user_doc)
```

**개선 요청**:

```
나: "user_id를 UUID로 저장하는 게 나을까, 아니면 string으로 저장하는 게 나을까?"

AI: "MongoDB에서는 string으로 저장하는 게 일반적이에요.
     조회할 때도 string으로 변환해서 찾는 게 편해요."

나: "그럼 UUID를 string으로 변환해서 저장하도록 수정해줘"

AI: "네, user_id를 str(user_id)로 변환해서 저장하도록 수정할게요."
```

### Step 6: Request Schema 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 API 요청 스키마 만들어줘. CreateUserRequest로 email, password, first_name, last_name 받는 거야"

AI: "네, Pydantic BaseModel로 만들어드릴게요. email은 EmailStr로 검증하도록 할게요."
```

**파일**: `app/presentation/api/internal/schemas/account/user_request.py`

```python
from pydantic import BaseModel, EmailStr


class CreateUserRequest(BaseModel):
    """유저 생성 요청"""
    email: EmailStr
    password: str
    first_name: str
    last_name: str
```

### Step 7: 컨트롤러 작성 (AI와 함께)

**AI와의 대화**:

```
나: "이제 컨트롤러 만들어줘. FastAPI router로 POST /api/internal/accounts/user 엔드포인트 만들어줘"

AI: "네, 의존성 주입으로 UserCreationService 받아서 사용하도록 만들게요.
     기존 프로젝트의 ApiResponse 형식 사용하면 될까요?"

나: "응, ApiResponse.success 형식으로 응답해줘"

AI: "네, ValidationException 발생하면 400 에러로 처리하도록 할게요."
```

**파일**: `app/presentation/api/internal/routers/account/user_controller.py`

```python
from fastapi import APIRouter, Depends, HTTPException

from app.application.services.account.user_creation_service import UserCreationService
from app.domain.account.repository.user_repository import UserRepository
from app.infrastructure.repositories.account.user_repository_impl import UserRepositoryImpl
from app.presentation.api.shared.schemas.common_response import ApiResponse
from app.presentation.api.internal.schemas.account.user_request import CreateUserRequest
from app.shared.exception.common_exceptions import ValidationException


router = APIRouter(prefix="/user", tags=["User"])


def get_user_repository() -> UserRepository:
    """의존성 주입: UserRepository"""
    return UserRepositoryImpl()


def get_user_creation_service(
    user_repository: UserRepository = Depends(get_user_repository),
) -> UserCreationService:
    """의존성 주입: UserCreationService"""
    return UserCreationService(user_repository)


@router.post("", description="Create new user")
async def create_user(
    request: CreateUserRequest,
    service: UserCreationService = Depends(get_user_creation_service),
):
    """유저 생성"""
    try:
        user = await service.create_user(
            email=request.email,
            password=request.password,
            first_name=request.first_name,
            last_name=request.last_name,
        )
        return ApiResponse.success(data=user.model_dump())
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))
```

**최종 확인**:

```
나: "이제 라우터 등록은 어디서 하나요?"

AI: "main.py나 lifespan_manager.py에서 라우터를 등록해야 해요.
     기존 프로젝트 구조 보면 lifespan_manager.py에서 등록하는 것 같아요."

나: "그럼 거기에 추가해줘"

AI: "네, user_controller의 router를 internal router 목록에 추가할게요."
```

---

## ✅ 바이브 코딩의 장점

### 1. 명확한 설계

- 문서를 먼저 작성하여 전체 구조 파악
    > "일단 큰 그림부터 그려보자" → 나중에 안 헷갈림 ✨
- 코드 작성 전에 비즈니스 로직 검토
    > "아 이거 이렇게 해야겠구나" → 코드 짜기 전에 미리 알 수 있음

### 2. 유지보수성 향상

- 문서화된 코드는 이해하기 쉬움
- 새로운 팀원 온보딩 용이

### 3. 실시간 피드백

- 시청자의 질문에 즉시 답변하며 코드 수정
- 함께 고민하며 더 나은 설계 도출

### 4. 지식 공유

- 개발 과정과 생각 과정 공유
- 팀 내 지식 축적

---

## 💡 바이브 코딩 팁

### 1. 작은 단위로 나누기

- 한 번에 너무 많은 기능 구현하지 않기
- 하나의 기능을 완성한 후 다음으로 진행

### 2. 질문 유도하기

- "이렇게 하는 게 맞을까요?" 같은 질문 던지기
- 시청자의 의견을 적극 수용

### 3. 실수도 공유하기

- 실수를 하더라도 그대로 보여주기
- 디버깅 과정도 함께 공유

### 4. 문서 업데이트

- 코드 변경 시 문서도 함께 업데이트
- 문서와 코드의 일관성 유지

---

## 📚 참고 자료

### 프로젝트 내 문서

- `docs/account/account_management.md` - 계정 관리 통합 설계
- `docs/auth/authentication.md` - 인증 시스템 설계

### 아키텍처 패턴

- **Clean Architecture**: 계층 분리
- **Repository Pattern**: 데이터 접근 추상화
- **Dependency Injection**: 의존성 주입

---

## 🎯 결론

바이브 코딩은 **문서 중심 개발**과 **실시간 상호작용**을 결합한 개발 방법론입니다.

**핵심 원칙**:

1. 📋 **프로젝트 초기화** - AGENTS.md로 프로젝트 구조 정리
2. 📝 **문서 먼저 작성** - 코드 짜기 전에 먼저 정리
3. 🏗️ **구조 설계** - 큰 그림부터 그리기
4. 💻 **점진적 구현** - 하나씩 완성하기
5. 💬 **실시간 피드백** - 함께 고민하기

이 방법론을 통해:

- ✅ **명확한 설계** - 무엇을 만들지 명확히 파악
- ✅ **유지보수성 향상** - 나중에 봐도 바로 이해
- ✅ **지식 공유** - 팀 전체가 함께 성장

프리젠 테이선 : https://www.genspark.ai/ 이용
