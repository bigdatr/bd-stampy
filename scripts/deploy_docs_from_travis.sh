# #!/bin/bash
git config user.name "allanhortle"
git config user.email "allanhortle@gmail.com"
git push "https://${GH_TOKEN}@github.com/bigdatr/bd-stampy.git" `git subtree split --prefix docs master`:gh-pages --force
echo "Pushed new documentation successfully."
exit 0

