<?php namespace <%=VENDOR_NAME%>\<%=APP_NAMESPACE%>\Command\<%=CLASS_COMMAND_NAMESPACE%>;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class <%=PHP_CLASSNAME%> extends Command {

	protected function configure() {
        $this
			->setName('<%=CLI_COMMAND_NAMESPACE%>:<%=COMMAND_NAME%>')
            ->setDescription('<%=COMMAND_DESCRIPTION%>')
            ->setHelp('<%=COMMAND_HELP%>');
		
		// extra command line arguments and options go here.          
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		// your command code goes here.
		$output->writeln('<%=CLI_COMMAND_NAMESPACE%>:<%=COMMAND_NAME%> called');
    }
}