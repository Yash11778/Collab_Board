// Pre-deployment verification script
// Run this before deploying: node pre-deploy-check.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-deployment checks...\n');

let allPassed = true;

// Check 1: Required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  'backend/vercel.json',
  'hackathon/vercel.json',
  'backend/server.js',
  'hackathon/package.json',
  'backend/package.json'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
    allPassed = false;
  }
});

// Check 2: Backend vercel.json configuration
console.log('\n⚙️  Checking backend vercel.json...');
try {
  const backendVercel = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend/vercel.json'), 'utf8'));
  if (backendVercel.builds && backendVercel.builds[0].src === 'server.js') {
    console.log('  ✅ Backend build configuration correct');
  } else {
    console.log('  ❌ Backend build configuration incorrect');
    allPassed = false;
  }
} catch (e) {
  console.log('  ❌ Error reading backend/vercel.json');
  allPassed = false;
}

// Check 3: Frontend vercel.json configuration
console.log('\n⚙️  Checking frontend vercel.json...');
try {
  const frontendVercel = JSON.parse(fs.readFileSync(path.join(__dirname, 'hackathon/vercel.json'), 'utf8'));
  if (frontendVercel.rewrites) {
    console.log('  ✅ Frontend rewrites configured (SPA routing)');
  } else {
    console.log('  ❌ Frontend rewrites missing');
    allPassed = false;
  }
} catch (e) {
  console.log('  ❌ Error reading hackathon/vercel.json');
  allPassed = false;
}

// Check 4: Environment variable examples
console.log('\n🔑 Checking environment variable examples...');
if (fs.existsSync(path.join(__dirname, '.env.example'))) {
  console.log('  ✅ Root .env.example exists');
} else {
  console.log('  ⚠️  Root .env.example missing (optional)');
}

if (fs.existsSync(path.join(__dirname, 'backend/.env.example'))) {
  console.log('  ✅ Backend .env.example exists');
} else {
  console.log('  ⚠️  Backend .env.example missing (recommended)');
}

// Check 5: Package.json dependencies
console.log('\n📦 Checking critical dependencies...');
try {
  const backendPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend/package.json'), 'utf8'));
  const criticalDeps = ['express', 'socket.io', 'mongoose', 'cors'];
  criticalDeps.forEach(dep => {
    if (backendPkg.dependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} missing from backend/package.json`);
      allPassed = false;
    }
  });
} catch (e) {
  console.log('  ❌ Error reading backend/package.json');
  allPassed = false;
}

// Check 6: Git status
console.log('\n📝 Checking Git status...');
if (fs.existsSync(path.join(__dirname, '.git'))) {
  console.log('  ✅ Git repository initialized');
} else {
  console.log('  ⚠️  Git not initialized - run "git init"');
  allPassed = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All checks passed! Ready for deployment.');
  console.log('\n📖 Next steps:');
  console.log('1. Generate JWT secret: node generate-jwt-secret.js');
  console.log('2. Set up MongoDB Atlas');
  console.log('3. Push to GitHub');
  console.log('4. Follow DEPLOYMENT_CHECKLIST.md');
  console.log('5. Deploy to Vercel');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.');
}
console.log('='.repeat(50) + '\n');
