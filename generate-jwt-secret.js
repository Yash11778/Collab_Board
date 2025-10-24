// Generate a secure JWT secret for your .env file
// Run this with: node generate-jwt-secret.js

const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('\n🔐 Your secure JWT Secret:\n');
console.log(jwtSecret);
console.log('\n📋 Add this to your Vercel Environment Variables:');
console.log('Variable: JWT_SECRET');
console.log(`Value: ${jwtSecret}`);
console.log('\n✅ Copy the value above and paste it in Vercel!\n');
