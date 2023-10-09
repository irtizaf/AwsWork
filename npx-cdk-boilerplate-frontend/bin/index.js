#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const repoUrl = process.argv[2] || "https://github.com/Wasifnazeer11/Next-js-Cognito-Configuration-auth.git";
const repoName = path.basename(repoUrl, '.git');

if (!repoUrl) {
  console.error('Usage: npx npx-cdk-boilerplate-frontend <repo-url>');
  process.exit(1);
}

const gitCheckoutCommand = `git clone ${repoUrl} ${repoName}`;

try {
  // Clone the entire repository
  execSync(gitCheckoutCommand, { stdio: 'inherit' });

  //  Installing the packages
  const cdkInitCommand = `cd ${repoName} && npm install`;
  execSync(cdkInitCommand, { stdio: 'inherit' });

  console.log(`Successfully cloned and initialized NextJS project from repository: ${repoUrl}`);
} catch (error) {
  console.error(`Failed to clone or initialize NextJS project from repository: ${repoUrl}`, error);
  process.exit(1);
}