import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImagePath = 'C:/Users/USER/.gemini/antigravity/brain/e1b56cc6-a521-4994-8da2-44a157beebae/.user_uploaded/media_1787124478519.png';
const publicDir = path.join(__dirname, '..', 'docs', 'public');

if (fs.existsSync(sourceImagePath)) {
  const imageBuffer = fs.readFileSync(sourceImagePath);
  
  // 覆盖所有公共头像、Logo 与 Icon 文件
  fs.writeFileSync(path.join(publicDir, 'logo.png'), imageBuffer);
  fs.writeFileSync(path.join(publicDir, 'avatar.png'), imageBuffer);
  fs.writeFileSync(path.join(publicDir, 'avatar.jpg'), imageBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), imageBuffer);
  
  console.log('Successfully updated logo.png, avatar.png, avatar.jpg, favicon.png with User Image 1!');
} else {
  console.error('Source image not found:', sourceImagePath);
}
