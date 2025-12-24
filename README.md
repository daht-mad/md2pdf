# md2pdf

Markdown 파일을 한글 지원 PDF로 변환하는 Claude Code 스킬입니다.

## 주요 기능

- 한글 폰트 완벽 지원 (맑은 고딕, Apple Gothic)
- 깔끔한 스타일링 (파란색 헤딩, 표 스타일링, 코드 블록 하이라이팅)
- 프로젝트 전체 재귀 검색
- 중복 파일 처리 지원
- 원본 MD 파일과 같은 디렉토리에 PDF 생성

## 설치

### 방법 1: tar.gz 다운로드 (권장)

```bash
curl -L https://github.com/daht-mad/md2pdf/raw/master/md2pdf.tar.gz | tar -xz -C .claude/skills/
```

### 방법 2: Git clone

```bash
git clone https://github.com/daht-mad/md2pdf.git
cp -r md2pdf/.claude/skills/md2pdf .claude/skills/
```

## 의존성 설치

스킬 설치 후 최초 1회 실행:

```bash
npm install md-to-pdf
```

## 사용법

Claude Code에서:

```bash
/md2pdf README.md
```

또는 "README.md를 PDF로 변환해줘", "마크다운을 PDF로 만들어줘" 등으로 요청하세요.

## PDF 스타일

- 페이지: A4
- 여백: 상하좌우 20mm
- 폰트: 시스템 기본 폰트 (한글 지원)
- 헤딩: 파란색 (#2563eb)
- 표: 회색 테두리 및 헤더 배경
- 코드: 회색 배경 (#f3f4f6)

## 라이선스

MIT
