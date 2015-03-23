# #!/bin/bash
# echo "Setting up git origin"
# curl -H 'Authorization: token ${GH_TOKEN}' https://${GH_TOKEN}@${GH_REF}
# git remote add travis "https://${GH_TOKEN}@${GH_REF}"
# git subtree push --prefix docs travis gh-pages
# echo "Pushed new documentation successfully."
# exit 0

git config user.name "allanhortle"
git config user.email "allanhortle@gmail.com"
git subtree push --prefix docs "https://${GH_TOKEN}@github.com/bigdatr/bd-stampy.git" gh-pages > /dev/null 2>&1
echo "Pushed new documentation successfully."
exit 0

