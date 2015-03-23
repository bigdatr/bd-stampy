#!/bin/bash
echo "Setting up git origin"
git remote add travis "https://${GH_TOKEN}@${GH_REF}"
git subtree push --prefix docs travis gh-pages
echo "Pushed new documentation successfully."
exit 0
