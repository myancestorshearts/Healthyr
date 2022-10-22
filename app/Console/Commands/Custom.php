<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models;

use App\Common;
use App\Libraries;

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
        $this->checkKits();
    }


    private function checkKits() {
        
        Common\Functions::setMysqlDatabaseConfig($this->DB_HOST, $this->DB_PORT, $this->DB_DATABASE, $this->DB_USERNAME, $this->DB_PASSWORD);

        $kits = Models\PlatformUserKit::where('active', '=', 1)->get();

        $kit_types = [];
        $resulted_kits_of_each_type = [];

        $index = 0;
        $count = count($kits);

        foreach($kits as $kit) {
            
            echo ++$index . ' / ' . $count . ' - ' . $kit->kit_id;

            $spot = new Libraries\Spot;
            $validated_kit_response = $spot->getKit($kit->kit_id);

            if ($validated_kit_response->has('kit')) {
                $spot_kit = $validated_kit_response->get('kit');

                echo ' - ' . $spot_kit->type;

                if (!isset($kit_types[$spot_kit->type])) $kit_types[$spot_kit->type] = [
                    'count' => 0,
                    'statusus' => [],
                    'analytes' => [],
                    'samples' => [],
                    'sample_types' => []
                ];
                $kit_types[$spot_kit->type]['count']++;
                if (!isset($kit_types[$spot_kit->type]['statusus'][$spot_kit->status])) $kit_types[$spot_kit->type]['statusus'][$spot_kit->status] = 0;
                $kit_types[$spot_kit->type]['statusus'][$spot_kit->status]++;


            
                foreach ($spot_kit->samples as $sample) {
                    echo ' - found sample';
                    if (!isset($kit_types[$spot_kit->type]['samples'][$sample->status])) $kit_types[$spot_kit->type]['samples'][$sample->status] = 0;
                    $kit_types[$spot_kit->type]['samples'][$sample->status]++;

                    
                    if (!isset($kit_types[$spot_kit->type]['sample_types'][$sample->type])) $kit_types[$spot_kit->type]['sample_types'][$sample->type] = 0;
                    $kit_types[$spot_kit->type]['sample_types'][$sample->type]++;
                    if ($sample->status == 'resulted') { 
                        //dd($sample);
                        echo ' - resulted';

                        $resulted_kits_of_each_type[$spot_kit->type] = $kit->kit_id;

                        echo  ' - ' . count($sample->report->results);

                        foreach($sample->report->results as $result) {
                            if (!isset($kit_types[$spot_kit->type]['analytes'][$result->name])) $kit_types[$spot_kit->type]['analytes'][$result->name] = [];
                            $kit_types[$spot_kit->type]['analytes'][$result->name][] = $result->unit_of_measure;
                        }


                    }
                }

            }

            echo "\n";
        }

        dd($kit_types);

        foreach ($kit_types as $key => $kit_type) {
            $test = Models\Test::where('key', '=', $key)->limit(1)->get()->first();
            echo ' - finding test';
            if (!isset($test)) {
                echo ' - created test';
                $test = new Models\Test;
            }

            $test->key = $key;
            $test->name = $key;
            $test->save();

            foreach($kit_type['analytes'] as $analyte_key => $unit_array) {

                echo ' - finding analyte';
                $analyte = Models\Analyte::where('key', '=', $analyte_key)->limit(1)->get()->first();
                if (!isset($analyte)) {
                    echo ' - creating analyte';
                    $analyte = new Models\Analyte;
                    $analyte->description = '';
                }

                $analyte->key = $analyte_key;
                $analyte->name = $analyte_key;
                $analyte->unit_of_measure = $unit_array[0];
                $analyte->save();

                // create the analyte test
                echo ' - finding test analyte';
                $test_analyte = Models\TestAnalyte::where([
                    ['analyte_id', '=', $analyte->id],
                    ['test_id', '=', $test->id]
                ])->limit(1)->get()->first();

                if (!isset($test_analyte)) {
                    echo ' - creating test analyte';
                    $test_analyte = new Models\TestAnalyte;
                }

                $test_analyte->test_id = $test->id;
                $test_analyte->analyte_id = $analyte->id;
                $test_analyte->save();
            }
        
            echo "\n";
        }

        $platform_user_ids = [
            '5689263882310',
            '5761094844486'
        ];

        foreach ($platform_user_ids as $platform_user_id) {
            foreach($resulted_kits_of_each_type as $key => $resulted_kit) {
                $platform_user_kit = Models\PlatformUserKit::where([
                    ['platform_user_id', '=', $platform_user_id],
                    ['kit_id', '=', $resulted_kit]
                ])->limit(1)->get()->first();

                if (!isset($platform_user_kit)) {
                    $platform_user_kit = new Models\PlatformUserKit;
                }

                $platform_user_kit->platform_user_id = $platform_user_id;
                $platform_user_kit->kit_id = $resulted_kit;
                $platform_user_kit->active = 1;
                $platform_user_kit->save();
            }
        }
    }
}
