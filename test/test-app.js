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

  it('creates correct properties based on default input', function () {
    assert.equal(generator.generator.props.app_namespace, generator.generator.appname);
    assert.equal(generator.generator.props.php_classname, generator.generator.default_command);
    assert.equal(generator.generator.props.class_command_namespace, generator.generator.class_command_namespace);
    assert.equal(generator.generator.props.cli_command_namespace, cc.paramCase(generator.generator.cli_command_namespace));
    assert.equal(generator.generator.props.default_command, 'example');
    assert.equal(generator.generator.props.app_version, '1.0');
    assert.equal(generator.generator.props.appname, cc.titleCase(generator.generator.appname));
    assert.equal(generator.generator.props.entrypoint, cc.paramCase(generator.generator.appname));
  });

  // test scaffolding/copying of files
  it('creates project files', function () {
    assert.file(['composer.json', 'README.md']);
  });

  it('creates app entrypoint', function () {
    assert.file(generator.generator.props.entrypoint);
  });
});
