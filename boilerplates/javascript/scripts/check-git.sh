if git rev-parse --is-inside-git-dir > /dev/null 2>&1; then
  echo "Git has been initialized. I won't do anything."
else
  echo "Git initializing"
  git init
  yarn husky install
fi