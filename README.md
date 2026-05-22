# 🇰🇷 디지털 민증 시스템

정부24 주민등록증 모바일 확인서비스를 모방한 디지털 민증 시스템입니다.

## ✨ 주요 기능

### 1. 민증 조회 (뷰)
- 🎴 민증 카드 앞뒷면 확인
- 📸 증명사진 표시
- 🔄 클릭하여 앞뒷면 전환
- 🔒 주민번호 뒷자리 마스킹

### 2. 정보 수정
- ✏️ 개인정보 입력 및 수정
- 📷 사진 업로드 (Base64 저장)
- ✔️ 실시간 유효성 검사
  - 주민번호 검증 (체크디지트)
  - 생년월일 검증
  - 한글 이름만 허용
  - 주소 길이 검증
- 💾 LocalStorage에 자동 저장

### 3. QR 코드 공유
- 🔲 QR 코드 생성
- 📥 QR 코드 다운로드
- ⚠️ 보안 경고 메시지
- 📋 개인정보 미리보기

### 4. 보안 기능
- 🔐 LocalStorage 암호화 (기본)
- 🔒 주민번호 마스킹
- ⚡ 클라이언트 사이드 검증

## 📋 개인정보 구조

```typescript
interface UserProfile {
  id: string;                    // 프로필 ID
  name: string;                  // 이름
  birthDate: string;             // 생년월일 (YYYYMMDD)
  residentNumber: string;        // 주민번호 (XXXXXX-XXXXXXX)
  address: string;               // 주소
  issuedDate: string;            // 발급일 (YYYY-MM-DD)
  expiryDate: string;            // 만료일 (YYYY-MM-DD)
  gender: 'M' | 'F';             // 성별
  photoUrl: string;              // 사진 (Base64)
  issueNumber: string;           // 발급번호
  createdAt: string;             // 생성일시
  updatedAt: string;             // 수정일시
}
```

## 🛠️ 기술 스택

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS3
- **QR Code**: qrcode.react
- **Storage**: LocalStorage

## 📦 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/q1q1d/my-app.git
cd my-app
git checkout digital-id-system
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 4. 프로덕션 빌드

```bash
npm run build
```

## 📖 사용 방법

### 1. 정보 입력

1. "정보 수정" 탭 클릭
2. 사진 업로드 (선택사항)
3. 개인정보 입력
   - ✓ 이름: 한글 2-30자
   - ✓ 생년월일: YYYYMMDD 형식
   - ✓ 주민번호: 유효한 주민번호 (체크디지트 검증)
   - ✓ 주소: 5-100자
4. "저장하기" 클릭

### 2. 민증 확인

1. "민증 조회" 탭 클릭
2. 카드 클릭하여 앞뒷면 확인
3. 사진과 정보 확인

### 3. QR 코드 공유

1. "QR 공유" 탭 클릭
2. QR 코드 확인
3. "QR 코드 다운로드" 클릭

## 🔒 보안 주의사항

⚠️ **중요**: 이 시스템은 **테스트/데모 목적**입니다.

- 실제 주민번호를 입력하지 마세요
- 개인정보는 LocalStorage에 평문으로 저장됩니다
- 본인인증 목적으로만 사용하세요
- 타인과 공유하지 마세요

실제 운영 환경에서는:
- 서버 사이드 암호화 필수
- HTTPS 통신 필수
- 데이터��이스 암호화 필수
- 접근 제어 및 감시 로깅 필수

## 📝 주민번호 검증

주민번호는 다음 규칙으로 검증됩니다:

1. 총 13자리 (하이픈 제외)
2. 체크디지트 검증
3. 유효한 생년월일

### 테스트 주민번호

```
000000-0000000 (테스트용)
```

## 📂 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ResidentIDCard.tsx
│   ├── ResidentIDCard.css
│   ├── ProfileForm.tsx
│   ├── ProfileForm.css
│   ├── QRCodeShare.tsx
│   └── QRCodeShare.css
├── types/              # TypeScript 타입
│   └── index.ts
├── utils/              # 유틸리티 함수
│   ├── storage.ts
│   ├── validation.ts
│   └── qrcode.ts
├── App.tsx             # 메인 앱 컴포넌트
├── App.css
└── index.tsx
```

## 🎨 디자인 특징

- 정부24 민증과 유사한 디자인
- 반응형 레이아웃 (모바일 최적화)
- 3D 플립 애니메이션
- 그라디언트 배경
- 사용자 친화적 UI

## 🐛 알려진 이슈

- 없음

## 🚀 향후 계획

- [ ] 사용자 인증 (이메일/비밀번호)
- [ ] 데이터베이스 연동
- [ ] 서버 사이드 검증
- [ ] 멀티 프로필 지원
- [ ] 백업/복구 기능
- [ ] 보안 인증 (2FA)
- [ ] 모바일 앱 (React Native)

## 📄 라이선스

MIT License

## 👤 작가

[@q1q1d](https://github.com/q1q1d)

## 📞 지원

문제가 발생하면 GitHub Issues로 신고해주세요.
