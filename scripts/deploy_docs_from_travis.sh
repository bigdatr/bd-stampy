#!/bin/bash
echo "Setting up git origin"
git remote add travis "https://${GH_TOKEN}@${GH_REF}" docs > /dev/null 2>&1 || exit 1
git subtree push --prefix docs travisorigin gh-pages > /dev/null 2>&1 || exit 1
echo "Pushed new documentation successfully."
exit 0
