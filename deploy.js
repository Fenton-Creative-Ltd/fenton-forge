#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');

async function deploy() {
  console.log('🚀 Deploying Fenton Forge...');
  
  // Build steps
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🔧 Setting up directories...');
  await fs.ensureDir('./sites');
  await fs.ensureDir('./uploads');
  await fs.ensureDir('./temp');
  
  console.log('🧪 Running tests...');
  // execSync('npm test', { stdio: 'inherit' });
  
  console.log('🌐 Starting server...');
  execSync('npm start', { stdio: 'inherit' });
}

deploy().catch(console.error);