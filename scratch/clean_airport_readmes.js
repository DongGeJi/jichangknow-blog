import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToDelete = [
  'edgenova', 'ermaoyun', 'flyv', 'guangnianti', 'guangshuyun',
  'jilianyun', 'langwang', 'lingdongyun', 'muguang', 'quanqiuyun',
  'sogoyun', 'tiziyun', 'u1s1', 'yifanyun', 'yinxingren', 'yuzhouyun'
];

const targetRepos = [
  path.join(__dirname, '..'), // c:\Users\USER\Desktop\donggeji
  path.join(__dirname, '..', '..', 'DongGeJi_profile') // c:\Users\USER\Desktop\DongGeJi_profile
];

targetRepos.forEach(repoDir => {
  if (!fs.existsSync(repoDir)) return;
  dirsToDelete.forEach(dirName => {
    const fullPath = path.join(repoDir, dirName);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted: ${fullPath}`);
    }
  });
});
