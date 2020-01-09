const _ = require("lodash");

/**
* Prompt for <>
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {object} Object containing information for single prompt
*/

function classname(val) {
	return _.upperFirst(_.camelCase(val));
}

module.exports = function(generator) {
	return {
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
	}
}