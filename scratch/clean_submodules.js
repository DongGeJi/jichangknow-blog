import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const airportsDir = path.join(rootDir, 'scratch', 'standalone_airports');

if (fs.existsSync(airportsDir)) {
  const dirs = fs.readdirSync(airportsDir);
  dirs.forEach(d => {
    const fullPath = path.join(airportsDir, d);
    if (fs.statSync(fullPath).isDirectory()) {
      try {
        execSync(`git rm --cached -r -f "scratch/standalone_airports/${d}"`, { cwd: rootDir, stdio: 'ignore' });
        console.log(`Removed submodule cached entry: ${d}`);
      } catch (e) {
        // ignore if not cached
      }
    }
  });
}

const gitmodulesPath = path.join(rootDir, '.gitmodules');
if (fs.existsSync(gitmodulesPath)) {
  fs.unlinkSync(gitmodulesPath);
  console.log('Removed .gitmodules file');
}

try {
  execSync('git add .', { cwd: rootDir });
  execSync('git commit -m "fix: remove broken git submodule"', { cwd: rootDir });
  console.log('Committed: fix: remove broken git submodule');
} catch (e) {
  console.log('Commit note:', e.message);
}
