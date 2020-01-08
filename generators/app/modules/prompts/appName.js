/**
* Copies the config file from the generator templates to the target dir,
* changing the name of the file to the slugged version of the package name
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {array} Array of question prompts
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