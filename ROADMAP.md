# Development roadmap

To avoid miscommunication, there needs to be a brief explanation regarding the use of the word *namespace* in this document. There a two namespaces: one for PHP and one for the commands.

**PHP namespace**
`App\Command\FoobarCommand`

**Command namespace**
`foobar:example` (in which *foobar* is the namespace and *example* is the command name).

Unless specified, *namespace* refers to the **command** namespace.
## v1.0
- [x] Generate an app with:
	- [x] Using the directory name (the yeoman app name) as the PHP namespace / app name.
	- [x] A single command file/class using the namespace as the file/class name (suffixed with *Command*).
	- [x] A single command named *example* using the namespace as the command namespace. 
	- [x] The entrypoint uses the (slugged) app name as it's name.
	- [x] Composer.json project name and autoload path settings.

## v1.1
- [ ] Extend the generator with:
	- [ ] Allow custom PHP and command namespacing.

## v1.2
- [ ] Extend the generator with:
	- [ ] Generating multiple commands, based on a space separated input. For example:

## v1.3
- [ ] Extend the generator with:
	- [ ] Adding options and arguments to the commands through a interactive dialog.

## v1.4
- [ ] Extend the generator with:
	- [ ] Generate an app based on a config json file which defines the namespace, commands, options etc.

