/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {
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
  }
}