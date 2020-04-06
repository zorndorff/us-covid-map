#!/bin/sh

BUILD_TIME=`date`

echo Syncing deploy repo changes
npm run build
rm -rf docs
mv dist docs

git add -A
git commit -am "Content Update $BUILD_TIME"
git pull origin master
git push origin master
