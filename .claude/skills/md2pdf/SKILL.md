---
name: md2pdf
description: |
  Markdown 파일을 PDF로 변환하는 도구. 한글 폰트를 완벽하게 지원하며 깔끔한 스타일링을 제공.
  다음과 같은 요청에 이 스킬을 사용하세요:
  - "README.md를 PDF로 변환해줘"
  - "이 마크다운 파일을 PDF로 만들어줘"
  - "md2pdf로 문서 변환해줘"
  - "/md2pdf 파일명"
---

# md2pdf

Markdown 파일을 한글 지원 PDF로 변환하는 스킬.

## 의존성 설치 (최초 1회)

```bash
npm install md-to-pdf
```

## 사용법

```bash
node scripts/md2pdf.mjs <파일명>
```

**예시:**

```bash
# 파일명만 (프로젝트 전체에서 검색)
node scripts/md2pdf.mjs README.md

# 상대 경로
node scripts/md2pdf.mjs ./docs/guide.md

# 절대 경로
node scripts/md2pdf.mjs /Users/username/file.md
```

## 주요 기능

- 프로젝트 전체 재귀 검색: 파일명만 입력하면 하위 디렉토리까지 자동 검색
- 중복 파일 처리: 동일한 파일명이 여러 개 있을 경우 선택 가능
- 한글 폰트 지원 (맑은 고딕, Apple Gothic)
- 깔끔한 스타일링 (파란색 헤딩, 표 스타일링, 코드 블록 하이라이팅)
- 원본 MD 파일과 같은 디렉토리에 PDF 생성

## PDF 스타일

- 페이지: A4
- 여백: 상하좌우 20mm
- 폰트: 시스템 기본 폰트 (한글 지원)
- 헤딩: 파란색 (#2563eb)
- 표: 회색 테두리 및 헤더 배경
- 코드: 회색 배경 (#f3f4f6)
