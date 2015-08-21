/* globals describe: false, before: false, it: false */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var cc = require('change-case');

describe('php-commandline-app', function () {

  var generator;

  before(function (done) {
    this.generator = helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);

    generator = this.generator;
  });

  // test settings
  it('creates correct settings', function () {
    assert.equal(generator.generator.settings.phpNamespace, cc.pascalCase(generator.generator.appname));
    assert.equal(generator.generator.settings.phpClassName, cc.pascalCase(generator.generator.appname) + 'Command');
    assert.equal(generator.generator.settings.commandNamespace, cc.paramCase(generator.generator.appname));
    assert.equal(generator.generator.settings.commandName, 'example');
    assert.equal(generator.generator.settings.appVersion, '1.0');
    assert.equal(generator.generator.settings.appName, cc.titleCase(generator.generator.appname));
    assert.equal(generator.generator.settings.entrypointName, cc.paramCase(generator.generator.appname));
  });

  // test scaffolding/copying of files
  it('creates project files', function () {
    assert.file(['composer.json', 'README.md']);
  });

  it('creates app entrypoint', function () {
    assert.file(generator.generator.settings.entrypointName);
  });
});
