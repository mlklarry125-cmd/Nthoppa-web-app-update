const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('ADMIN_PASSWORD_HASH="' + hash + '"');
  console.log('\nCopy this line into your .env file');
}

generateHash();