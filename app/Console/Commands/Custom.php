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
        //$this->checkKits();

        //$this->createAnalyteRanges();

        $this->seedPanels();
    }

    private function seedPanels() {

        Common\Functions::setMysqlDatabaseConfig($this->DB_HOST, $this->DB_PORT, $this->DB_DATABASE, $this->DB_USERNAME, $this->DB_PASSWORD);

        $csv_locations = [  
            'panels' => 'C:\\Work\\delicious\\Healthier\\imports\\panel-permutations.csv'
        ];

        $csv_models = [];
        ini_set('memory_limit','1G');
        ini_set('auto_detect_line_endings', TRUE);

        foreach ($csv_locations as $key => $location) {
            $csv_models[$key] = [];

            $handle = fopen($location, 'r');

            $headers = [];  
            $header_data = fgetcsv($handle);

            while (($data = fgetcsv($handle)) !== FALSE) {

                $model = [];
                for ($i = 0; $i < count($header_data); $i++)
                {
                    $model[trim($header_data[$i])] = isset($data[$i]) ? $data[$i] : '';
                }
                $csv_models[$key][] = $model;
            }
            fclose($handle);
        }

        ini_set('auto_detect_line_endings', FALSE);  


        $index = 0;
        $count = count($csv_models['panels']);
        foreach($csv_models['panels'] as $panel) {
            echo ++$index . ' / ' . $count . ' - ' . $panel['key'];

            if (!Common\Functions::isEmpty($panel['key']) &&
                !Common\Functions::isEmpty($panel['gender']) &&
                !Common\Functions::isEmpty($panel['age min']) &&
                !Common\Functions::isEmpty($panel['age max']) &&
                !Common\Functions::isEmpty($panel['pregnant']) &&
                !Common\Functions::isEmpty($panel['report min']) &&
                !Common\Functions::isEmpty($panel['low min']) &&
                !Common\Functions::isEmpty($panel['healthy min']) &&
                !Common\Functions::isEmpty($panel['healthy max']) &&
                !Common\Functions::isEmpty($panel['high max']) &&
                !Common\Functions::isEmpty($panel['report max']) &&
                !Common\Functions::isEmpty($panel['definition']) &&
                !Common\Functions::isEmpty($panel['low response']) &&
                !Common\Functions::isEmpty($panel['low normal response']) &&
                !Common\Functions::isEmpty($panel['normal response']) &&
                !Common\Functions::isEmpty($panel['high normal response']) &&
                !Common\Functions::isEmpty($panel['high response'])) {

                $analyte = Models\Analyte::where('key', '=', $panel['key'])->limit(1)->get()->first();
                if (isset($analyte)) {

                    $age_min_months = $panel['age min'] * 12;
                    $age_max_months = $panel['age max'] == 120 ? null : $panel['age max'] * 12;

                    $analyte_range = Models\AnalyteRange::where([
                        ['analyte_id', '=', $analyte->id],
                        ['gender', '=', $panel['gender']],
                        ['pregnant', '=', $panel['pregnant'] == '-' ? '0' : $panel['pregnant']],
                        ['age_min_months', '=', $age_min_months],
                        ['age_max_months', '=', $age_max_months]
                    ])->limit(1)->get()->first();

                    if (isset($analyte_range)) {

                        echo ' - found range';
                    }
                    else {

                        echo ' - could not find range - creating';
                        $analyte_range = new Models\AnalyteRange;
                        $analyte_range->analyte_id = $analyte->id;
                        $analyte_range->gender = $panel['gender'];
                        $analyte_range->pregnant = $panel['pregnant'] == '-' ? '0' : $panel['pregnant'];
                        $analyte_range->age_min_months = $age_min_months;
                        $analyte_range->age_max_months = $age_max_months;
                    }

                    $analyte_range->report_min = $panel['report min'] == '-' ? null : $panel['report min'];
                    $analyte_range->low_min = $panel['low min'] == '-' ? null : $panel['low min'];
                    $analyte_range->healthy_min = $panel['healthy min'] == '-' ? null : $panel['healthy min'];
                    $analyte_range->healthy_max = $panel['healthy max'] == '-' ? null : $panel['healthy max'];
                    $analyte_range->high_max = $panel['high max'] == '-' ? null : $panel['high max'];
                    $analyte_range->report_max = $panel['report max'] == '-' ? null : $panel['report max'];

                    echo ' - saving';
                    $analyte_range->save();

                    echo ' - saving def';
                    $analyte->description = $panel['definition'];
                    $analyte->save();
                    

                    $ranges_effects = [];
                    if (isset($analyte_range->low_min)) $ranges_effects[] = [
                        'description' => $panel['low response'],
                        'min' => 0,
                        'max' => $analyte_range->low_min,
                    ];
                    if (isset($analyte_range->healthy_min)) $ranges_effects[] = [
                        'description' => $panel['low normal response'],
                        'min' => isset($analyte_range->low_min) ? $analyte_range->low_min : 0,
                        'max' => $analyte_range->healthy_min
                    ];
                    if (isset($analyte_range->healthy_max) || isset($analyte_range->healthy_min)) $ranges_effects[] = [
                        'description' => $panel['normal response'],
                        'min' => isset($analyte_range->healthy_min) ? $analyte_range->healthy_min : 0,
                        'max' => isset($analyte_range->healthy_max) ? $analyte_range->healthy_max : null
                    ];
                    if (isset($analyte_range->healthy_max)) $ranges_effects[] = [
                        'description' => $panel['high normal response'],
                        'min' => $analyte_range->healthy_max,
                        'max' => isset($analyte_range->high_max) ? $analyte_range->high_max : null
                    ];
                    if (isset($analyte_range->high_max)) $ranges_effects[] = [
                        'description' => $panel['high response'],
                        'min' => $analyte_range->high_max,
                        'max' => null
                    ];

                    foreach ($ranges_effects as $range_effect) {
                        // find analyte range affect
                        $analyte_range_effect = Models\AnalyteRangeEffect::where([
                            ['analyte_range_id', '=', $analyte_range->id],
                            ['min', '=', $range_effect['min']],
                            ['max', '=', $range_effect['max']]
                        ])->limit(1)->get()->first();

                        if (!isset($analyte_range_effect)) {
                            $analyte_range_effect = new Models\AnalyteRangeEffect;
                            $analyte_range_effect->analyte_range_id = $analyte_range->id;
                            $analyte_range_effect->min = $range_effect['min'];
                            $analyte_range_effect->max = $range_effect['max'];
                        }

                        echo ' - saving effect';
                        $analyte_range_effect->effect = $range_effect['description'];
                        $analyte_range_effect->save();
                    }
                }
                else echo ' - could not find analyte';
            }

            echo "\n";
        }
    }

    private function createAnalyteRanges() {
        
        Common\Functions::setMysqlDatabaseConfig($this->DB_HOST, $this->DB_PORT, $this->DB_DATABASE, $this->DB_USERNAME, $this->DB_PASSWORD);

        $analytes = Models\Analyte::all();

    
        $index = 0;
        $count = count($analytes);

        foreach($analytes as $analyte) {
            echo ++$index . ' / ' . $count  . ' - ' . $analyte->key;

            $genders = ['M', 'F', 'O'];

            $pregnants = [0, 1];

            foreach($genders as $gender) {
                foreach($pregnants as $pregnant) {

                    if ($gender == 'M' && $pregnant == 1) continue;

                    $analyte_range = Models\AnalyteRange::where([
                        ['gender', '=', $gender],
                        ['analyte_id', '=', $analyte->id],
                        ['pregnant', '=', $pregnant]
                    ])->limit(1)->get()->first();

                    if (!isset($analyte_range)) {

                        echo ' creating default for ' . $gender . ' - ' . $pregnant;
                        $analyte_range = new Models\AnalyteRange;

                        $analyte_range->analyte_id = $analyte->id;
                        $analyte_range->pregnant = $pregnant;
                        $analyte_range->gender = $gender;
                        $analyte_range->age_min_months = 0;
                        $analyte_range->report_min = 0;
                        $analyte_range->low_min = 0;
                        $analyte_range->healthy_min = 0;
                        $analyte_range->healthy_max = 0;
                        $analyte_range->high_max = 0;
                        $analyte_range->report_max = 0;
                        $analyte_range->save();
                    }

                }
            }

            echo "\n";
        }
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
