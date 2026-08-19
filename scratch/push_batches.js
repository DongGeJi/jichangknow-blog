import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batchIndex = parseInt(process.argv[2] || '1', 10);

const batches = [
  ['muguang', 'tiziyun', 'yinxingren', 'flyv'],
  ['lingdongyun', 'langwang', 'yuzhouyun', 'quanqiuyun'],
  ['guangshuyun', 'u1s1', 'jilianyun', 'guangnianti'],
  ['yifanyun', 'ermaoyun', 'sogoyun', 'edgenova']
];

const targetBatch = batches[batchIndex - 1];
const reposBaseDir = path.join(__dirname, '..', 'scratch', 'standalone_airports');

console.log(`=== Executing Push for Batch ${batchIndex} ===`);

targetBatch.forEach(slug => {
  const repoDir = path.join(reposBaseDir, slug);
  try {
    const output = execSync('git push origin main -f', { cwd: repoDir, encoding: 'utf8' });
    console.log(`✅ [${slug}] Push Success:\n${output}`);
  } catch (err) {
    console.log(`⚠️ [${slug}] Push Note/Error: ${err.message}`);
  }
});
