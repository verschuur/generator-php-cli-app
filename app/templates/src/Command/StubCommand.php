<?php

namespace <%=PHP_NAMESPACE%>\Command\<%=PHP_NAMESPACE%>;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class <%=PHP_CLASSNAME%> extends Command {

	protected function configure() {
        $this
			->setName('<%=COMMAND_NAMESPACE%>:<%=COMMAND_NAME%>')
            ->setDescription('<%=COMMAND_DESCRIPTION%>')
            ->setHelp('<%=COMMAND_HELP%>');
		
		// extra command line arguments and options go here.          
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$output->writeln('<%=COMMAND_NAMESPACE%>:<%=COMMAND_NAME%> called');
        // your command code goes here.
    }
}