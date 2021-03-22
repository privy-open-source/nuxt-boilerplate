if git rev-parse --is-inside-git-dir > /dev/null 2>&1; then
  echo "Git has been initialized. I won't do anything."
else
  echo "Git initializing. Preparing husky and eslint..."
  git init
  yarn husky install
  npx husky add .husky/pre-commit 'yarn lint'
fi