#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const repoUrlCDK = process.argv[2] || "https://github.com/Wasifnazeer11/Cognito-Backend-Nextjs.git";
const repoNameCDK = path.basename(repoUrlCDK, '.git');

if (!repoUrlCDK) {
  console.error('Usage: npx npx-cdk-boilerplate-backend <repo-url>');
  process.exit(1);
}

const gitCheckoutCommand = `git clone ${repoUrlCDK} ${repoNameCDK}`;

try {
  // Clone the entire repository
  execSync(gitCheckoutCommand, { stdio: 'inherit' });

  //  Installing the packages
  const cdkInitCommand = `cd ${repoNameCDK} && npm install && npm run build && cdk bootstrap && cdk deploy`;
  execSync(cdkInitCommand, { stdio: 'inherit' });

  console.log(`Successfully cloned and initialized AWS CDK project from repository: ${repoUrlCDK}`);
} catch (error) {
  console.error(`Failed to clone or initialize AWS CDK project from repository: ${repoUrlCDK}`, error);
  process.exit(1);
}

const repoUrlNext = process.argv[2] || "https://github.com/Wasifnazeer11/Next-js-Cognito-Configuration-auth.git";
const repoNameNext = path.basename(repoUrlNext, '.git');

if (!repoUrlNext) {
  console.error('Usage: npx npx-cdk-boilerplate-frontend <repo-url>');
  process.exit(1);
}

const gitCheckoutCommandNext = `git clone ${repoUrlNext} ${repoNameNext}`;

try {
  // Clone the entire repository
  execSync(gitCheckoutCommandNext, { stdio: 'inherit' });

  //  Installing the packages
  const cdkInitCommandNext = `cd ${repoNameNext} && npm install`;
  execSync(cdkInitCommandNext, { stdio: 'inherit' });

  console.log(`Successfully cloned and initialized NextJS project from repository: ${repoUrlNext}`);
} catch (error) {
  console.error(`Failed to clone or initialize NextJS project from repository: ${repoUrlNext}`, error);
  process.exit(1);
}
