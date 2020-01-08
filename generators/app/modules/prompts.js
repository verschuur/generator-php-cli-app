const _ = require("lodash");

/**
* Copies the config file from the generator templates to the target dir,
* changing the name of the file to the slugged version of the package name
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {array} Array of question prompts
*/

function classname(val) {
  return _.upperFirst(_.camelCase(val));
}

module.exports = function(generator) {
  return [
    {
      type: "question",
      name: "app.name",
      message: "App name",
      default: generator.appname,
      validate: function(input, answers) {
        if (!input) {
          return 'App name is required.';
        }
        return true;
      }
    },
    {
      type: "question",
      name: "vendor.name",
      message: "Vendor name",
      default: generator.props.vendor.name,
      validate: function(input, answers) {
        if (!input) {
          return 'Vendor name is required.';
        }
        return true;
      }
    },
    {
      type: "question",
      name: "app.php.namespace",
      message: "PHP namespace",
      default: function(answers) {
        return `${classname(answers.vendor.name)}\\${classname(answers.app.name)}`;
      },
      validate: function(input, answers) {
        if (!input) {
          return 'PHP namespace is required.';
        }
        return true;
      }
    },
    {
      type: "question",
      name: "app.command.namespace",
      message: "Command namespace",
      default: function(answers) {
        return _.kebabCase(answers.app.name);
      }
    },
    {
      type: "question",
      name: "app.command.name",
      message: "Command name",
      default: function(answers) {
        return 'run';
      },
      validate: function(input, answers) {
        if (!input) {
          return 'At least one command name is required.';
        }
        return true;
      }
    },
    {
      type: "question",
      name: "app.license",
      message: "License",
      default: "MIT"
    },
    {
      type: "question",
      name: "author.name",
      message: "Author name",
      default: generator.user.git.name()
    },
    {
      type: "question",
      name: "author.email",
      message: "Author email",
      default: generator.user.git.email()
    }
  ];
};