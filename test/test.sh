#!/usr/bin/env bash
set -eux
declare currentDir=$(cd $(dirname $0);pwd)
declare dirName=$(basename "${currentDir}")
declare parentDir=$(dirname "${currentDir}")
declare exampleDir="${parentDir}/example"
# rm
rm -rf ${currentDir}/clone-tmp
# test
git clone https://github.com/azu/textlint-rule-no-empty-section.git ${currentDir}/clone-tmp
cd ${currentDir}/clone-tmp
git checkout -b 1.1.0 refs/tags/1.1.0
node ${parentDir}/bin/migrate-textlint-scripts.js
# success if exit 0
rm -rf ${currentDir}/clone-tmp
