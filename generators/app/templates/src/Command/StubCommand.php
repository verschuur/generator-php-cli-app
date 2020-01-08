<?php

namespace <%=VENDOR_NAMESPACE_PHP%>\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class <%=COMMAND_CLASSNAME%> extends Command {
    
    protected function configure()
    {
        $this
        ->setName('<%=COMMAND_NAMESPACE%>:<%=COMMAND_NAME%>')
        ->setDescription('')
        ->setHelp('');
        
        // Extra command line arguments and options go here.          
    }
    
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('<%=COMMAND_NAMESPACE%>:<%=COMMAND_NAME%> called');
        // Your command code goes here.
    }
}
