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
  },

  /**
   * Running context priorities
   * http://yeoman.io/authoring/running-context.html
   */
  initializing: function () {},

  prompting: function () {    
    var done = this.async();
    var self = this;

    var prompts = [
      {
        type    : 'input',
        name    : 'app_name',
        message : 'Your app name (this will be used as default in the various namespaces)',
        default: this.appname,
        filter: function(response) {
          return cc.ucFirst(cc.camelCase(response));
        }
      }, 
      {
        type    : 'input',
        name    : 'app_namespace',
        message : 'The PHP namespace for your app (the namespace will be automatically prepended with your github name)',
        default: function(answers) {
          return answers.app_name;
        },
        filter: function(response) {
          return cc.ucFirst(cc.camelCase(response));
        }
      },
      {
        type    : 'input',
        name    : 'entrypoint',
        message : 'App entry point name',
        default: function(answers) {
          return cc.lower(answers.app_name);
        },
        filter: function(response) {
          return cc.paramCase(cc.lower(response));
        }
      },
      {
        type    : 'input',
        name    : 'cli_command_namespace',
        message : 'The command namespace (e.g. the "mypackage" in "mypackage:mycommand")',
        default: function(answers) {
          return cc.lower(answers.app_name);
        },
        filter: function(response) {
          return cc.paramCase(cc.lower(response));
        }
      },
      {
        type    : 'input',
        name    : 'default_command',
        message : 'Default command name',
        default: 'example',
        filter: function(response) {
          return cc.paramCase(cc.lower(response));
        }
      },
      {
        type    : 'input',
        name    : 'app_version',
        message : 'App version',
        default: 'v1.0.0'
      },
      {
        type    : 'input',
        name    : 'vendor_name',
        message : 'What\'s your Github vendor_name',
        default: 'vendor',
        store   : true
      }
    ];


    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  configuring: function () {
    this.props.php_classname = cc.ucFirst(cc.camelCase(this.props.default_command));
    this.props.class_command_namespace = cc.ucFirst(cc.camelCase(this.props.cli_command_namespace));
  }, 

  writing: function () {     
    this.fs.copyTpl(
      this.templatePath('_composer.json'),
      this.destinationPath('composer.json'), 
      { 
        VENDOR_NAME: this.props.vendor_name,
        PROJECT_NAME: this.props.entrypoint,
        APP_NAMESPACE: this.props.app_namespace,
        APPLICATION_VERSION: this.props.app_version,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), 
      { 
        APPLICATION_NAME: this.props.app_name,
        PROJECT_NAME: this.props.entrypoint
      }
    );
  
    this.fs.copyTpl(
      this.templatePath('_app'),
      this.destinationPath(this.props.entrypoint), 
      { 
        VENDOR_NAME: this.props.vendor_name,
        APP_NAMESPACE: this.props.app_namespace,
        CLI_COMMAND_NAMESPACE: this.props.cli_command_namespace,
        CLASS_COMMAND_NAMESPACE: this.props.class_command_namespace,
        APPLICATION_NAME: this.props.app_name,
        APPLICATION_VERSION: this.props.app_version,
        COMMAND_NAME: this.props.default_command,
        PHP_CLASSNAME: this.props.php_classname,
      }
    );
console.log(this.props.cli_command_namespace);
    this.fs.copyTpl(
      this.templatePath('src/Command/StubCommand.php'),
      this.destinationPath('src/' 
        + this.props.vendor_name 
        + '/' 
        + this.props.app_namespace 
        + '/Command/' 
        + this.props.class_command_namespace
        + '/'
        + this.props.php_classname 
        + '.php'), 
      { 
        VENDOR_NAME: this.props.vendor_name,
        APP_NAMESPACE: this.props.app_namespace,
        PHP_CLASSNAME: this.props.php_classname,
        CLI_COMMAND_NAMESPACE: this.props.cli_command_namespace,
        CLASS_COMMAND_NAMESPACE: this.props.class_command_namespace,
        COMMAND_NAME: this.props.default_command,
        COMMAND_DESCRIPTION: 'The command description goes here',
        COMMAND_HELP: 'The command help text goes here'
      }
    );
  },

  install: function () {
    if(typeof this.options.skipInstall === 'undefined') {
      this.spawnCommand('composer', ['install'])
        .on('exit', function (err) {
          if(err === 0) {
            this.log.write('Scaffolding complete. Run your app by calling ');
            this.log.write(chalk.green('php ' + this.props.entrypoint + '\n'));
            this.log.write(chalk.white('Don\'t forget to update the README.md and the rest of the composer.json settings (author, description etc).' + '\n'));
          }
        }.bind(this));    
      }
  },

});
