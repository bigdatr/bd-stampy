# #!/bin/bash
rm -rf docs || exit 0;
mkdir docs;
stalactite build
cd docs
git init
git config user.name "allanhortle"
git config user.email "allanhortle@gmail.com"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/bigdatr/bd-stampy.git" master:gh-pages > /dev/null 2>&1
echo "Pushed new documentation successfully."
exit 0
