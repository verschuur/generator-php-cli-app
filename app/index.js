'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');
var cc = require('change-case');

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // option to show the settings
    this.option('settings', {
      desc: 'Show the various names which will be used for namespacing etc.',
      //alias: 's', // aliases dont work at the moment. See https://github.com/yeoman/yo/issues/319
      type: Boolean,
      defaults: false,
      hide: false
    });
  },

  _showSettings: function () {
    this.log.write('PHP namespace: ' + this.settings.phpNamespace + '\n');
    this.log.write('PHP classname: ' + this.settings.phpClassName + '\n');
    this.log.write('Command namespace: ' + this.settings.commandNamespace + '\n');
    this.log.write('Command name: ' + this.settings.commandName + '\n');
    this.log.write('App name: ' + this.settings.appName + '\n');
    this.log.write('App version: ' + this.settings.appVersion + '\n');
    this.log.write('Entrypoint name: ' + this.settings.entrypointName + '\n');
  },

  /**
   * Running context priorities
   * http://yeoman.io/authoring/running-context.html
   */
  initializing: {
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

      if(this.options.settings) {
        this._showSettings();
        return;
      }
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

  
  },

  configuring: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_composer.json'),
        this.destinationPath('composer.json'), 
        { 
          PROJECT_NAME: this.settings.entrypointName,
          PHP_NAMESPACE: this.settings.phpNamespace
        }
      );

      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'), 
        { 
          APPLICATION_NAME: this.settings.appName,
          COMMAND_NAMESPACE: this.settings.commandNamespace,
          COMMAND_NAME: this.settings.commandName,
          PROJECT_NAME: this.settings.entrypointName
        }
      );

    }
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_app'),
        this.destinationPath(this.settings.entrypointName), 
        { 
          PHP_NAMESPACE: this.settings.phpNamespace,
          APPLICATION_NAME: this.settings.appName,
          APPLICATION_VERSION: this.settings.appVersion,
          PHP_CLASSNAME: this.settings.phpClassName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/App/Command/StubCommand.php'),
        this.destinationPath('src/' + this.settings.phpNamespace + '/Command/' + this.settings.phpClassName + '.php'), 
        { 
          PHP_NAMESPACE: this.settings.phpNamespace,
          PHP_CLASSNAME: this.settings.phpClassName,
          COMMAND_NAMESPACE: this.settings.commandNamespace,
          COMMAND_NAME: this.settings.commandName,
          COMMAND_DESCRIPTION: 'The command description goes here',
          COMMAND_HELP: 'The command help text goes here'
        }
      );
    },

    projectfiles: function () {
      
    }
  },

  install: function () {
    this.spawnCommand('composer', ['install'])
      .on('exit', function (err) {
        if(err === 0) {
          this.log.write('Scaffolding complete. Run your app by calling ');
          this.log.write(chalk.green('php ' + this.settings.entrypointName + '\n'));
        }
      }.bind(this));    
  }

});
