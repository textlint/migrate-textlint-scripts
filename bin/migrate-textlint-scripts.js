#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const npeBin = require.resolve(".bin/npe");

const USE_YARN = fs.existsSync(path.join(process.cwd(), "yarn.lock"));
const log = function (message) {
    console.info(message);
};
const exec = function (command) {
    log("Run: " + command);
    if (shelljs.exec(command).code !== 0) {
        throw new Error("Fail to execute:" + command);
    }
};
const npe = function (key, value) {
    exec(`${npeBin} "${key}" "${value}"`);
};
// Exist config files
const babelrcPath = path.join(process.cwd(), ".babelrc");
const mochaOptPath = path.join(process.cwd(), "test", "mocha.opts");
if (fs.existsSync(babelrcPath)) {
    log(`rm ${babelrcPath}`);
    shelljs.rm(babelrcPath);
}
if (fs.existsSync(mochaOptPath)) {
    const mochaOptsContent = fs.readFileSync(mochaOptPath, "utf-8");
    const replaced = mochaOptsContent
        .replace("--compilers js:babel-register", "--require textlint-scripts/register")
        .replace("--compilers js:@babel/register", "--require textlint-scripts/register")
        .replace("--require  babel-register", "--require textlint-scripts/register")
        .replace("--require @babel/register", "--require textlint-scripts/register");
    fs.writeFileSync(mochaOptPath, replaced, "utf-8");
    log(`✔ Rewrite ${mochaOptPath}`);
}
// Remove exist devDependencies
const removeDevDeps = [
    "babel-cli",
    "babel-preset-es2015",
    "babel-preset-latest",
    "babel-preset-env",
    "babel-preset-power-assert",
    "babel-plugin-transform-es2015-modules-commonjs",
    "babel-preset-jsdoc-to-assert",
    "babel-register",
    "@babel/register",
    "@babel/cli",
    "@babel/preset-env",
    "mocha",
    "textlint-tester"
];

log(`Package Manager: ${USE_YARN ? "yarn" : "npm"}`);
const INSTALL_COMMAND = USE_YARN ? "yarn install --dev" : "npm install --save-dev";
const UNINSTALL_COMMAND = USE_YARN ? "yarn remove --dev" : "npm uninstall --save-dev";
exec(`${UNINSTALL_COMMAND} ${removeDevDeps.join(" ")}`);
// Install textlint-scripts
exec(`${INSTALL_COMMAND} textlint-scripts`);
// Modify package.json
npe("scripts.build", "textlint-scripts build");
npe("scripts.watch", "textlint-scripts build --watch");
npe("scripts.test", "textlint-scripts test");
// Complete

log("✔ Complete!");
