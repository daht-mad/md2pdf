---
name: md2pdf
version: 1.0.2
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

## 파일 검색

- 파일명만 입력 시 프로젝트 전체 검색 (최대 5단계, 숨김폴더 제외)
- 동일 파일명 여러 개 발견 시 번호로 선택

## 스타일

- A4, 여백 20mm
- 헤딩: 파란색 (#2563eb)
- 코드: 회색 배경 (#f3f4f6)
- 한글 폰트: 맑은 고딕, Apple Gothic

## 스크립트

실행 스크립트: [md2pdf.mjs](scripts/md2pdf.mjs)

## 자동 업데이트 & 기여

스킬 실행 전 업데이트 확인 및 버그 수정 기여 (create-tool 필요):

```bash
# 업데이트 확인
python3 .claude/skills/create-tool/scripts/check_update.py .claude/skills/md2pdf --auto

# 버그 수정 PR 제출
python3 .claude/skills/create-tool/scripts/contribute_fix.py .claude/skills/md2pdf --message "버그 설명"
```