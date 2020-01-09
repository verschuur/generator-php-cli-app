/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

module.exports = function(generator) {
  return {
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
  }
}