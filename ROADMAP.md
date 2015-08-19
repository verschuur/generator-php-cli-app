# Development roadmap

To avoid miscommunication, there needs to be a brief explanation regarding the use of the word *namespace* in this document. There a two namespaces: one for PHP and one for the commands.

**PHP namespace**
`App\Command\FoobarCommand`

**Command namespace**
`foobar:example` (in which *foobar* is the namespace and *example* is the command name).

Unless specified, *namespace* refers to the **command** namespace.
## v1.0
- [ ] Generate an app with:
	- [ ] Using the directory name (the yeoman app name) as the PHP namespace / app name.
	- [ ] A single command file/class using the namespace as the file/class name (suffixed with *Command*).
	- [ ] A single command named *example* using the namespace as the command namespace. 
	- [ ] The entrypoint uses the (slugged) app name as it's name.
	- [ ] Composer.json project name and autoload path settings.

## v1.1
- [ ] Extend the generator with:
	- [ ] Allow custom PHP and command namespacing.

## v1.2
- [ ] Extend the generator with:
	- [ ] Generating multiple commands, based on a space separated input. For example:
	 `yo generate foo bar HelloWorld`
	 would create `FooCommand`, `BarCommand` and `HelloWorldCommand`.

## v1.3
- [ ] Extend the generator with:
	- [ ] Adding options and arguments to the commands through a interactive dialog.

## v1.4
- [ ] Extend the generator with:
	- [ ] Generate an app based on a config json file which defines the namespace, commands, options etc.

