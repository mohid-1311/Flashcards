import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

function run(cmd, cwd = '.') {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

function createEnvFile(dir, content) {
  const fullPath = join(dir, '.env');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Verzeichnis erstellt: ${dir}`);
  }
  writeFileSync(fullPath, content);
  console.log(`.env-Datei erstellt in: ${fullPath}`);
}

console.log('>>> Backend Pakete installieren...');
run('npm install', './Backend');

console.log('>>> Frontend Pakete installieren...');
run('npm install', './Frontend');

console.log('>>> Backend .env erstellen...');
const backendEnv = `# backend.env 
DATABASE_FILE="mysql://root:1234@flashcards-mysql:3306/flashcards"
# DATABASE_FILE="mysql://root:sEdUnWPaffCgZUtoKpJPqsLopQqBxrgt@gondola.proxy.rlwy.net:49849/railway"
`;
createEnvFile('./Backend', backendEnv);

console.log('>>> Frontend .env erstellen...');
const frontendEnv = `# frontend.env 
REACT_APP_BACKEND_URL="http://localhost:4000"
# REACT_APP_BACKEND_URL="https://flashcards-moritz.up.railway.app"
`;
createEnvFile('./Frontend', frontendEnv);

console.log('\n>>> Setup fertiggestellt! <<<');