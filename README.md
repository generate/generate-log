# generate-changelog [![NPM version](https://img.shields.io/npm/v/generate-changelog.svg?style=flat)](https://www.npmjs.com/package/generate-changelog) [![NPM downloads](https://img.shields.io/npm/dm/generate-changelog.svg?style=flat)](https://npmjs.org/package/generate-changelog) [![Build Status](https://img.shields.io/travis/jonschlinkert/generate-changelog.svg?style=flat)](https://travis-ci.org/jonschlinkert/generate-changelog)

Generate a CHANGELOG.md file, using defaults from keep-a-changelog.

## Table of Contents

## What is generate?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md). Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

**Example**

Templates are [customizable](#customization) and can be overridden.

![generate-changelog demo](https://raw.githubusercontent.com/jonschlinkert/generate-changelog/master/docs/demo.gif)

<br>
<br>

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md). Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

<br>
<br>

## Command line usage

### Install globally

**Installing the CLI**

To run the `changelog` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-changelog**

You may now install this module with the following command:

```sh
$ npm install --global generate-changelog
```

### Running generate-changelog

You should now be able to run `generate-changelog` with the following command:

```sh
$ gen changelog
```

**What will happen?**

Running `$ gen changelog` will run the generator's [default task](#default), which will:

1. prompt you for any information that's missing
2. render templates using your answers
3. write [the resulting files](#available-tasks) to the current working directory

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

### Running tasks

Tasks on `generate-changelog` are run by passing the name of the task to run after the generator name, delimited by a comma:

```sh
$ gen changelog:foo
       ^       ^
generator     task
```

**Example**

The following will run generator `foo`, task `bar`:

```sh
$ gen foo:bar
```

**Default task**

If a task is not explicitly passed Generate's CLI will run the `default` task.

<br>
<br>

## Available tasks

Visit Generate's [documentation for tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

<br>
<br>

## Examples

### Running multiple generators

Generate supports running multiple generators at once. Here are some examples of other generators that work well with `generate-changelog`.

#### generate-install

Run [generate-install](https://github.com/generate/generate-install) **after** this generator to prompt to install any `dependencies` or `devDependencies` necessary for the generated files.

**Example**

![generate-changelog generate-install example](https://raw.githubusercontent.com/jonschlinkert/generate-changelog/master/docs/demo-install.gif)

#### generate-dest

Run [generate-dest](https://github.com/generate/generate-dest) **before** this generator to prompt for the destination directory to use for generated files.

**Example**

![generate-changelog generate-dest example](https://raw.githubusercontent.com/jonschlinkert/generate-changelog/master/docs/demo-dest.gif)

## API usage

Use `generate-changelog` as a [plugin](https://github.com/generate/generate/blob/master/docs/plugins.md) in your own [generator](https://github.com/generate/generate/blob/master/docs/generators.md).

### Install locally

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-changelog
```

### Register as a plugin

Inside your own [generator](https://github.com/generate/generate/blob/master/docs/generators.md):

```js
module.exports = function(app) {
  // register generate-changelog as a plugin
  app.use(require('generate-changelog'));
};
```

### Run tasks

Programmatically run tasks from `generate-changelog`:

```js
module.exports = function(app) {
  // register generate-changelog as a plugin
  app.use(require('generate-changelog'));

  // run the `default` task on generate-changelog
  app.task('foo', function(cb) {
    app.generate('generate-changelog', cb);
  });

  // or run a specific task on generate-changelog
  // (where `foo` is the name of the task to run)
  app.task('bar', function(cb) {
    app.generate('generate-changelog:foo', cb);
  });
};
```

Visit the [generator docs](https://github.com/generate/generate/blob/master/docs/generators.md) to learn more about creating, installing, using and publishing generators.

<br>
<br>

## Customization

The following instructions can be used to override settings in `generate-changelog`. Visit the [Generate documentation](https://github.com/generate/generate/blob/master/docs/overriding-defaults.md) to learn about other ways to override defaults.

### Destination directory

To customize the destination directory, install [generate-dest](https://github.com/generate/generate-dest) globally, then in the command line prefix `dest` before any other generator names.

For example, the following will prompt you for the destination path to use, then pass the result to `generate-changelog`:

```sh
$ gen dest changelog
```

### Overriding templates

You can override a template by adding a template of the same name to the `templates` directory in user home. For example, to override the `package.json` template, add a template at the following path `~/generate/generate-changelog/templates/package.json`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.

## CLI

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `changelog` generator**

Once both [generate](https://github.com/generate/generate) and `generate-changelog` are installed globally, you can run the generator with the following command:

```sh
$ gen changelog
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

## API

### Install locally

If you want to use `generate-changelog` as a plugin or sub-generator to extend the features and settings in your own generator, you must first install it locally:

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-changelog
```

### Use as a plugin

Use as a [plugin](https://github.com/generate/generate/blob/master/docs/plugins.md) if you want to extend your own generator with the features, settings and tasks of `generate-changelog`, as if they were created on your generator:

```js
module.exports = function(app) {
  app.use(require('generate-changelog'));
};
```

Visit Generate's [plugin docs](https://github.com/generate/generate/blob/master/docs/plugins.md) to learn more about plugins.

### Use as a sub-generator

Use as a [sub-generator](https://github.com/generate/generate/blob/master/docs/generators.md) if you want to add `generate-changelog` to a  _namespace_ in your generator:

```js
module.exports = function(app) {
  // register the generate-changelog with whatever name you want
  app.register('foo', require('generate-changelog'));
};
```

Visit Generate's [sub-generator docs](https://github.com/generate/generate/blob/master/docs/sub-generators.md) to learn more about sub-generators.

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/generate-changelog/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 13, 2016._