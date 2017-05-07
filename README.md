# migrate-textlint-scripts

[![Greenkeeper badge](https://badges.greenkeeper.io/textlint/migrate-textlint-scripts.svg)](https://greenkeeper.io/)

Migration tool for using [textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts").

**Before**:

Your devDependencies:

- "babel-cli"
- "babel-preset-es2015" or "babel-preset-latest"
- "babel-register"
- "mocha"
- "textlint-tester

`package.json`:

```js
  "scripts": {
    "test": "mocha test/",
    "build": "NODE_ENV=production babel src --out-dir lib --source-maps",
    "watch": "babel src --out-dir lib --watch --source-maps",
    "prepublish": "npm run --if-present build"
  },
```

**After**:

Simply to use one devDependencies:

- [textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts")

`package.json`:

```js
  "scripts": {
    "test": "textlint-scripts test",
    "build": "textlint-scripts build",
    "watch": "textlint-scripts build --watch",
    "prepublish": "npm run --if-present build"
  },
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install migrate-textlint-scripts -g

## Usage

Simply run `migrate-textlint-scripts`:

    $ migrate-textlint-scripts
    # Migrating...

## Changelog

See [Releases page](https://github.com/textlint/migrate-textlint-scripts/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/migrate-textlint-scripts/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
