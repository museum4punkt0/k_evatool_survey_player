#!/bin/sh
yarn version --patch --no-git-tag-version
git add ./package.json
