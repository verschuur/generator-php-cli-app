/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {
    type: "question",
    name: "author.email",
    message: "Author email",
    default: generator.user.git.email()
  }
}