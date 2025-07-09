import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
// Build & Start - Database, Backend and Frontend
function run(cmd, cwd = '.') {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

function networkExists(name) {
  try {
    const result = execSync(`docker network ls --filter name=^${name}$ --format "{{.Name}}"`).toString().trim();
    return result === name;
  } catch {
    return false;
  }
}

function containerExists(name) {
  try {
    const result = execSync(`docker ps -a --filter "name=^/${name}$" --format "{{.Names}}"`).toString().trim();
    return result === name;
  } catch {
    return false;
  }
}

// Netzwerk erstellen, falls nicht bereits vorhanden
if(!networkExists('flashcards-network')) {
  console.log('>>> Flashcards Netzwerk erstellen...');
  run('docker network create flashcards-network');
}

// Database
if (containerExists('flashcards-mysql')) {
  console.log('>>> Frontend Docker-Container neustarten...');
  run('docker restart flashcards-mysql');
} else {
  console.log('>>> Datenbank Docker-Container builden...');
  run('docker build -f Docker_Build/Dockerfile.database -t flashcards-db .');
  console.log('>>> Datenbank Docker-Container starten...');
  run('docker run -d --name flashcards-mysql --network flashcards-network -p 3306:3306 flashcards-db');
}

// Backend
if (containerExists('flashcards-backend')) {
  console.log('>>> Backend Docker-Container stoppen und löschen...');
  run('docker stop flashcards-backend');
  run('docker rm flashcards-backend');
}
console.log('>>> Backend Docker-Container builden...');
run('docker build -f Docker_Build/Dockerfile.backend -t react-backend .');
console.log('>>> Backend Docker-Container starten...');
run('docker run -d --name flashcards-backend --network flashcards-network -p 4000:4000 react-backend');

// Frontend
if (containerExists('flashcards-frontend')) {
  console.log('>>> Frontend Docker-Container stoppen und löschen...');
  run('docker stop flashcards-frontend');
  run('docker rm flashcards-frontend');
}
console.log('>>> Frontend Docker-Container builden...');
run('docker build -f Docker_Build/Dockerfile.frontend -t react-frontend .');
console.log('>>> Frontend Docker-Container starten...');
run('docker run -d --name flashcards-frontend --network flashcards-network -p 80:80 react-frontend');

console.log('\n>>> Setup fertiggestellt! <<<');