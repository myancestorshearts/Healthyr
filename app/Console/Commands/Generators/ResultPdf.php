<?php
namespace App\Console\Commands\Generators;

use Illuminate\Console\Command;

use App\Common;
use App\Libraries;

use App\Models\Mysql;

class ResultPdf extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:resultspdf';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Custom script';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {  

    }
}   
