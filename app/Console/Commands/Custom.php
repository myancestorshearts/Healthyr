<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models;

use App\Common;

class Custom extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'custom';

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

    private $DB_HOST = 'healthier.cluster-cvibhcnhzbpd.us-west-2.rds.amazonaws.com';
    private $DB_PORT = '3306';
    private $DB_DATABASE = 'healthyr';
    private $DB_USERNAME = 'healthyr-app';
    private $DB_PASSWORD = 'Sxh8B6bjHNsf6daJq2QucYryznKlS4zK';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        echo 'Custom';


        Common\Functions::setMysqlDatabaseConfig($this->DB_HOST, $this->DB_PORT, $this->DB_DATABASE, $this->DB_USERNAME, $this->DB_PASSWORD);

        $kits = Models\PlatformUserKit::all();


        dd($kits);

    }

}
