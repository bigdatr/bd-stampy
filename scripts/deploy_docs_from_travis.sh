# #!/bin/bash
git config user.name "allanhortle"
git config user.email "allanhortle@gmail.com"
git subtree push --prefix docs "https://${GH_TOKEN}@github.com/bigdatr/bd-stampy.git" gh-pages
echo "Pushed new documentation successfully."
exit 0
