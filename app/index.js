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

  showSettings: function () {
    this.log.write('phpNamespace: ' + this.settings.phpNamespace + '\n');
    this.log.write('phpClassName: ' + this.settings.phpClassName + '\n');
    this.log.write('commandNamespace: ' + this.settings.commandNamespace + '\n');
    this.log.write('commandName: ' + this.settings.commandName + '\n');
    this.log.write('appName: ' + this.settings.appName + '\n');
    this.log.write('appVersion: ' + this.settings.appVersion + '\n');
    this.log.write('entrypointName: ' + this.settings.entrypointName + '\n');
  },

  // prompting: function () {    
  //   var done = this.async();
 
  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the slick ' + chalk.red('SymfonyConsoleScaffolding') + ' generator!'
  //   ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someOption',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   this.prompt(prompts, function (props) {
  //     this.props = props;
  //     // To access props later use this.props.someOption;

  //     done();
  //   }.bind(this));
  // },

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

    }
  },

  install: function () {
    this.installDependencies();
  }
});
