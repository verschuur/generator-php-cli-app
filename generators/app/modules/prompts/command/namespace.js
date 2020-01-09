const _ = require("lodash");

/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {
    type: "question",
    name: "app.command.namespace",
    message: "Command namespace",
    default: function(answers) {
      return _.kebabCase(answers.app.name);
    }
  }
}