'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');
var cc = require('change-case');

module.exports = yeoman.generators.Base.extend({
  
  settings: function () {
    this.settings = {
      phpNamespace: cc.pascalCase(this.appname),
      phpClassName: cc.pascalCase(this.appname) + 'Command', // PHP file and classname (with the 'Command' suffix)
      commandNamespace: cc.paramCase(this.appname), // command namespace, e.g. foobar:example (foobar)
      commandName: cc.paramCase('example'), // command name, e.g. foobar:example (example)
      appName: cc.titleCase(this.appname), // app name used in composer and app settings
      appVersion: '1.0', // app version used in composer and app settings
      entrypointName: cc.paramCase(this.appname), // app entry point / php executable
    };
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
