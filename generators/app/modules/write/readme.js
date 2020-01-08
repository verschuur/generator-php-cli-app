/**
* Copies the README.md file from the generator templates to the target dir
* @param  {yeoman-generator} generator The Yeoman generator instance
*/
module.exports = function(generator) {
  generator.fs.copyTpl(
    generator.templatePath("_README.md"),
    generator.destinationPath("README.md"),
    {
      APP_NAME: generator.props.app.name,
      APP_SLUG: generator.props.app.slug,
      VENDOR_NAMESPACE_PHP: generator.props.app.namespace.php,
      VENDOR_NAMESPACE_COMPOSER: generator.props.app.namespace.composer
    }
  );
};