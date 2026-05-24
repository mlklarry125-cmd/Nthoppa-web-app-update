const { execSync } = require('child_process');
try {
  execSync('husky install', { stdio: 'inherit' });
} catch (e) {
  // Not a git repo or husky not needed - skip silently
  process.exit(0);
}
