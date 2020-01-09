/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {        
    type: "question",
    name: "app.license",
    message: "License",
    default: "MIT"   
  }
}