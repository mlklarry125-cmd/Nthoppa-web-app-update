const bcrypt = require('bcryptjs');

const password = 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('\n========================================');
  console.log('ADMIN PASSWORD HASH GENERATED SUCCESSFULLY');
  console.log('========================================\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this line to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('\n========================================\n');
});