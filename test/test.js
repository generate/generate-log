'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var merge = require('mixin-deep');
var npm = require('npm-install-global');
var del = require('delete');
var generator = require('..');
var app;

var isTravis = process.env.CI || process.env.TRAVIS;
var fixtures = path.resolve.bind(path, __dirname, '../templates');
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  return function(err) {
    if (err) return cb(err);
    var filepath = actual(name);

    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      assert(stat);
      del(actual(), cb);
    });
  };
}

describe('generate-log', function() {
  this.slow(250);

  if (isTravis) {
    before(function(cb) {
      npm.maybeInstall('generate', cb);
    });
  }

  beforeEach(function() {
    app = generate({silent: true});
    app.cwd = actual();
    app.option('dest', actual());
    app.option('askWhen', 'not-answered');
    app.data(require('../package'));
    app.data('owner', 'foo');
  });

  afterEach(function(cb) {
    del(actual(), cb);
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'generate-log') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });

    it('should extend tasks onto the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('changelog'));
    });

    it('should run the `default` task with .build', function(cb) {
      app.use(generator);
      app.build('default', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `default` task with .generate', function(cb) {
      app.use(generator);
      app.generate('default', exists(fixtures('changelog.md'), cb));
    });
  });

  describe('generator (CLI)', function() {
    it('should run the default task using the `generate-log` name', function(cb) {
      if (isTravis) return this.skip();
      app.use(generator);
      app.generate('generate-log', exists(fixtures('changelog.md'), cb));
    });

    it('should run the default task using the `generator` generator alias', function(cb) {
      if (isTravis) return this.skip();
      app.use(generator);
      app.generate('changelog', exists(fixtures('changelog.md'), cb));
    });
  });

  describe('generator (API)', function() {
    it('should run the default task on the generator', function(cb) {
      app.register('changelog', generator);
      app.generate('changelog', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `changelog` task', function(cb) {
      app.register('changelog', generator);
      app.generate('changelog:changelog', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('changelog', generator);
      app.generate('changelog:default', exists(fixtures('changelog.md'), cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      app.register('foo', function(foo) {
        foo.register('changelog', generator);
      });
      app.generate('foo.changelog', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `default` task by default', function(cb) {
      app.register('foo', function(foo) {
        foo.register('changelog', generator);
      });
      app.generate('foo.changelog', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `changelog:default` task when defined explicitly', function(cb) {
      app.register('foo', function(foo) {
        foo.register('changelog', generator);
      });
      app.generate('foo.changelog:default', exists(fixtures('changelog.md'), cb));
    });

    it('should run the `changelog:changelog` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('changelog', generator);
      });
      app.generate('foo.changelog:changelog', exists(fixtures('changelog.md'), cb));
    });

    it('should work with nested sub-generators', function(cb) {
      app
        .register('foo', generator)
        .register('bar', generator)
        .register('baz', generator)

      app.generate('foo.bar.baz', exists(fixtures('changelog.md'), cb));
    });
  });
});
