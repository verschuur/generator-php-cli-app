const appName = require("./prompts/app/name.js");
const vendorName = require("./prompts/vendor/name.js");
const license = require("./prompts/app/license.js");
const phpNamespace = require("./prompts/php/namespace.js");
const commandNamespace = require("./prompts/command/namespace.js");
const commandName = require("./prompts/command/name.js");
const authorName = require("./prompts/author/name.js");
const authorEmail = require("./prompts/author/email.js");

/**
*
* @param  {yeoman-generator} generator The Yeoman generator instance
* @return {array} Array of question prompts
*/

module.exports = function(generator) {
  return [
    appName(generator),
    vendorName(generator),
    phpNamespace(generator),
    commandNamespace(generator),
    commandName(generator),
    authorName(generator),
    authorEmail(generator),
    license(generator)
  ];
};