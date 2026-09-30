import { spawn } from 'node:child_process';

const isWin = process.platform === 'win32';
const npm = isWin ? 'npm.cmd' : 'npm';
const children = [
  spawn(process.execPath, ['server.js'], { stdio: 'inherit' }),
  spawn(npm, ['run', 'vite'], { stdio: 'inherit', shell: isWin })
];

const shutdown = (code = 0) => { for (const child of children) child.kill('SIGTERM'); process.exit(code); };
children.forEach(child => child.on('exit', code => { if (code && code !== 0) shutdown(code); }));
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
