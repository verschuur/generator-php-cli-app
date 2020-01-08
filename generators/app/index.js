"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const _ = require("lodash");
const username = require("username");
var cc = require('change-case');

const prompts = require("./modules/prompts");
const readmeWriter = require("./modules/write/readme");

module.exports = class extends Generator {

  initializing() {  
    this.log(`Welcome to the ${chalk.green('PHP CLI app Scaffolder!')}`);
    this.log(chalk.bgRed(`Before starting, make sure you are in the directory where you want to scaffold the app!`));
    this.props = {};

    this.settings = {
      // phpNamespace: cc.pascalCase(this.appname),
      // phpClassName: cc.pascalCase(this.appname) + 'Command', // PHP file and classname (with the 'Command' suffix)
      // commandNamespace: cc.paramCase(this.appname), // command namespace, e.g. foobar:example (foobar)
      // commandName: cc.paramCase('example'), // command name, e.g. foobar:example (example)
      // appName: cc.titleCase(this.appname), // app name used in composer and app settings
      // entrypointName: cc.paramCase(this.appname), // app entry point / php executable
    };
  }
  
  /**
   * Prompt for the package settings, and set the generator properties
   * for the scaffolding values.
   */
  prompting() {
    this.log(chalk.green("Fetching GitHub info, please wait..."));
    
    return this.user.github.username().then(
      vendor => {
        // set the vendor name here so the answers prompts can use it
        this.props.vendor = {
          name: vendor
        };
      },
      error => {
        this.props.vendor = {
          name: username.sync()
        };
      }
    ).finally(() => {
      return this.prompt(prompts(this)).then(props => {
        _.merge(this.props, props);
          
        // set the rest of the properties based on the answers
        this.props.vendor.slug = _.kebabCase(this.props.vendor.name);
        this.props.app.slug = _.kebabCase(this.props.app.name);
        this.props.app.version = '1.0';
        //this.props.app.namespace.php = 
        //this.props.app.namespace.composer = 

      });
    });
  }

    /**
   * Scaffold the various files and directories
   */
  writing() {
    readmeWriter(this);
  }

  // prompting() {    
  //   var done = this.async();
    
  //   var prompts = [
  //     {
  //       type    : 'input',
  //       name    : 'username',
  //       message : 'What\'s your Github username',
  //       default: 'vendor'
  //     }
  //   ];
      
      
  //   this.prompt(prompts, function (props) {
  //     this.props = props;
        
  //     done();
  //   }.bind(this));
  // }
    
  // configuring() {
  //   this.fs.copyTpl(
  //     this.templatePath('_composer.json'),
  //     this.destinationPath('composer.json'), 
  //     { 
  //       VENDOR_NAME: this.props.username,
  //       PROJECT_NAME: this.settings.entrypointName,
  //       PHP_NAMESPACE: this.settings.phpNamespace,
  //       APPLICATION_VERSION: this.settings.appVersion,
  //     }
  //   );
      
  //   this.fs.copyTpl(
  //     this.templatePath('_README.md'),
  //     this.destinationPath('README.md'), 
  //     { 
  //       APPLICATION_NAME: this.settings.appName,
  //       COMMAND_NAMESPACE: this.settings.commandNamespace,
  //       COMMAND_NAME: this.settings.commandName,
  //       PROJECT_NAME: this.settings.entrypointName
  //     }
  //   );
  // }
        
  // writing() {
  //   this.fs.copyTpl(
  //     this.templatePath('_app'),
  //     this.destinationPath(this.settings.entrypointName), 
  //     { 
  //       PHP_NAMESPACE: this.settings.phpNamespace,
  //       APPLICATION_NAME: this.settings.appName,
  //       APPLICATION_VERSION: this.settings.appVersion,
  //       PHP_CLASSNAME: this.settings.phpClassName
  //     }
  //   );
      
  //   this.fs.copyTpl(
  //     this.templatePath('src/Command/StubCommand.php'),
  //     this.destinationPath('src/Command/' + this.settings.phpNamespace + '/' + this.settings.phpClassName + '.php'), 
  //     { 
  //       PHP_NAMESPACE: this.settings.phpNamespace,
  //       PHP_CLASSNAME: this.settings.phpClassName,
  //       COMMAND_NAMESPACE: this.settings.commandNamespace,
  //       COMMAND_NAME: this.settings.commandName,
  //       COMMAND_DESCRIPTION: 'The command description goes here',
  //       COMMAND_HELP: 'The command help text goes here'
  //     }
  //   );
  // },
            
  // install() {
  //   if(typeof this.options.skipInstall === 'undefined') {
  //     this.spawnCommand('composer', ['install'])
  //     .on('exit', function (err) {
  //       if(err === 0) {
  //         this.log.write('Scaffolding complete. Run your app by calling ');
  //         this.log.write(chalk.green('php ' + this.settings.entrypointName + '\n'));
  //         this.log.write(chalk.white('Don\'t forget to update the README.md and the rest of the composer.json settings (author, description etc).' + '\n'));
  //       }
  //     }.bind(this));    
  //   }
  // }          
};      