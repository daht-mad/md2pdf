#!/usr/bin/env node
/**
 * md2pdf - Markdown to PDF converter with Korean font support
 * Usage: node md2pdf.mjs <file.md>
 */
import { mdToPdf } from 'md-to-pdf';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

async function promptUserSelection(files, cwd) {
  console.log('\n📂 동일한 파일명이 여러 개 발견되었습니다:\n');
  files.forEach((file, index) => {
    const relativePath = path.relative(cwd, file);
    console.log(`  [${index + 1}] ${relativePath}`);
  });
  console.log('\n어떤 파일을 변환하시겠습니까?');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('번호를 입력하세요 (1-' + files.length + '): ', (answer) => {
      rl.close();
      const choice = parseInt(answer, 10);
      if (choice >= 1 && choice <= files.length) {
        resolve(files[choice - 1]);
      } else {
        console.error('\n❌ 잘못된 선택입니다.');
        resolve(null);
      }
    });
  });
}

function findFileRecursively(startDir, fileName, maxDepth = 5) {
  const queue = [{ dir: startDir, depth: 0 }];
  const visited = new Set();
  const foundFiles = [];

  while (queue.length > 0) {
    const { dir, depth } = queue.shift();
    if (depth > maxDepth || visited.has(dir)) continue;
    visited.add(dir);

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isFile() && entry.name === fileName) {
          foundFiles.push(fullPath);
        }
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          queue.push({ dir: fullPath, depth: depth + 1 });
        }
      }
    } catch (err) {
      continue;
    }
  }
  return foundFiles;
}

const CSS_CONTENT = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', '맑은 고딕', sans-serif;
  font-size: 12pt;
  line-height: 1.6;
  color: #1a1a1a;
}
h1 {
  color: #2563eb;
  font-size: 24pt;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}
h2 {
  color: #2563eb;
  font-size: 18pt;
  margin-top: 16px;
  margin-bottom: 8px;
}
h3 {
  color: #1a1a1a;
  font-size: 14pt;
  margin-top: 12px;
  margin-bottom: 6px;
}
code {
  background-color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 11pt;
}
pre {
  background-color: #f3f4f6;
  padding: 12px;
  border-radius: 6px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
pre code {
  background-color: transparent;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
blockquote {
  border-left: 4px solid #2563eb;
  padding-left: 16px;
  margin-left: 0;
  color: #666666;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 12px 0;
  page-break-inside: auto;
}
thead { display: table-header-group; }
tr { page-break-inside: avoid; page-break-after: auto; }
th, td {
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  text-align: left;
  word-wrap: break-word;
  word-break: keep-all;
  overflow-wrap: break-word;
}
th { background-color: #f3f4f6; font-weight: bold; }
td { vertical-align: top; }
ul, ol { margin: 8px 0; padding-left: 24px; }
li { margin: 4px 0; }
`;

async function convertMdToPdf(fileName) {
  try {
    const cwd = process.cwd();
    let mdPath = null;

    if (path.isAbsolute(fileName) && fs.existsSync(fileName)) {
      mdPath = fileName;
    } else if (fileName.includes('/') || fileName.includes('\\')) {
      const relativePath = path.join(cwd, fileName);
      if (fs.existsSync(relativePath)) {
        mdPath = relativePath;
      }
    } else {
      console.log(`🔍 프로젝트에서 "${fileName}" 파일 검색 중...`);
      const foundFiles = findFileRecursively(cwd, fileName);

      if (foundFiles.length === 0) {
        console.error(`❌ 파일을 찾을 수 없습니다: ${fileName}`);
        console.log('\n현재 디렉토리:', cwd);
        console.log('\n사용법:');
        console.log('  - 파일명만: md2pdf "README.md" (프로젝트 전체에서 검색)');
        console.log('  - 상대 경로: md2pdf "./docs/guide.md"');
        console.log('  - 절대 경로: md2pdf "/Users/username/file.md"');
        process.exit(1);
      } else if (foundFiles.length === 1) {
        mdPath = foundFiles[0];
      } else {
        mdPath = await promptUserSelection(foundFiles, cwd);
        if (!mdPath) process.exit(1);
      }
    }

    if (!mdPath) {
      console.error(`❌ 파일을 찾을 수 없습니다: ${fileName}`);
      process.exit(1);
    }

    console.log(`📄 파일 발견: ${mdPath}`);

    const mdDir = path.dirname(mdPath);
    const baseName = path.basename(mdPath, '.md');
    const pdfPath = path.join(mdDir, `${baseName}.pdf`);

    console.log(`🔄 PDF 변환 중...`);

    const cssPath = path.join(mdDir, '.temp-pdf-style.css');
    fs.writeFileSync(cssPath, CSS_CONTENT);

    const pdf = await mdToPdf(
      { path: mdPath },
      {
        basedir: mdDir,
        dest: pdfPath,
        pdf_options: {
          format: 'A4',
          margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        },
        stylesheet: [cssPath],
      }
    );

    if (fs.existsSync(cssPath)) {
      fs.unlinkSync(cssPath);
    }

    if (pdf) {
      console.log(`✅ PDF 생성 완료: ${pdfPath}`);
    }
  } catch (error) {
    console.error('❌ PDF 변환 실패:', error);
    process.exit(1);
  }
}

const fileName = process.argv[2];
if (!fileName) {
  console.error('❌ 파일명을 입력해주세요.');
  console.log('\n사용법: node md2pdf.mjs <파일명>');
  console.log('예시: node md2pdf.mjs "README.md"');
  process.exit(1);
}

convertMdToPdf(fileName);
