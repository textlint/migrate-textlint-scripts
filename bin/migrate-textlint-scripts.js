#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const npeBin = require.resolve(".bin/npe");
const echo = function(message) {
    console.info(message);
};
const exec = function(command) {
    echo("Run: " + command);
    if (shelljs.exec(command).code !== 0) {
        throw new Error("Fail to execute:" + command);
    }
};
const npe = function(key, value) {
    exec(`${npeBin} "${key}" "${value}"`);
};
// Exist config files
const babelrcPath = path.join(process.cwd(), ".babelrc");
const mochaOptPath = path.join(process.cwd(), "test", "mocha.opts");
if (fs.existsSync(babelrcPath)) {
    echo(`rm ${babelrcPath}`);
    shelljs.rm(babelrcPath);
}
if (fs.existsSync(babelrcPath)) {
    echo(`rm ${mochaOptPath}`);
    shelljs.rm(mochaOptPath);
}
// Remove exist devDependencies
const removeDevDeps = [
    "babel-cli",
    "babel-preset-es2015",
    "babel-preset-latest",
    "babel-preset-env",
    "babel-register",
    "@babel/register",
    "@babel/cli",
    "@babel/preset-env",
    "mocha",
    "textlint-tester"
];
exec(`npm uninstall --save-dev ${removeDevDeps.join(" ")}`);
// Install textlint-scripts
exec(`npm install --save-dev textlint-scripts`);
// Modify package.json
npe("scripts.build", "textlint-scripts build");
npe("scripts.watch", "textlint-scripts build --watch");
npe("scripts.test", "textlint-scripts test");
// Complete

echo("✔ Complete!");
