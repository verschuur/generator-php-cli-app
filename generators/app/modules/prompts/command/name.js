/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {
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
  }
}