---
name: md2pdf
version: 1.1.0
repo: daht-mad/md2pdf
description: |
  Markdown 파일을 PDF로 변환하는 도구. 한글 폰트를 완벽하게 지원하며 깔끔한 스타일링을 제공.
  다음과 같은 요청에 이 스킬을 사용하세요:
  - "README.md를 PDF로 변환해줘"
  - "이 마크다운 파일을 PDF로 만들어줘"
  - "md2pdf로 문서 변환해줘"
  - "/md2pdf 파일명"
---

# md2pdf

Markdown을 한글 지원 PDF로 변환합니다.

## 비개발자 가이드

**설치 (터미널에서 한 줄 실행 후 Claude Code 재시작):**

```bash
mkdir -p .claude/skills && curl -L https://github.com/daht-mad/md2pdf/archive/refs/heads/master.tar.gz | tar -xz -C /tmp && mv /tmp/md2pdf-master .claude/skills/md2pdf
```

**사용:** Claude에게 "README.md를 PDF로 변환해줘" 라고 말하세요.

**결과:** 원본 파일과 같은 폴더에 PDF 생성 (예: `docs/guide.md` → `docs/guide.pdf`)

---

## 실행

의존성 설치 후 스크립트 실행:

```bash
npm install md-to-pdf && node scripts/md2pdf.mjs <파일명>
```

## 기능

### 파일 검색
- 파일명만 입력 시 프로젝트 전체 검색 (최대 5단계, 숨김폴더 제외)
- 동일 파일명 여러 개 발견 시 번호로 선택

### Obsidian 이미지 자동 지원
- `![[이미지.png]]` 형식의 Obsidian 이미지 문법 자동 변환
- Obsidian vault의 attachments 폴더 자동 탐지 (설정 불필요)
- 탐지 위치: iCloud, Documents, Desktop, Dropbox, OneDrive, Google Drive, 홈 디렉토리
- `.obsidian` 폴더가 있는 vault에서 attachments, images, assets 등 이미지 폴더 자동 검색

### 이미지 처리
- 이미지를 base64로 인코딩하여 PDF에 직접 삽입
- 이미지 크기 자동 조절 (페이지 너비에 맞춤)

## 스타일

- A4, 여백 20mm
- 헤딩: 파란색 (#2563eb)
- 코드: 회색 배경 (#f3f4f6)
- 한글 폰트: 맑은 고딕, Apple Gothic
- 이미지: 최대 너비 100%, 자동 비율 유지

## 스크립트

실행 스크립트: [md2pdf.mjs](scripts/md2pdf.mjs)
