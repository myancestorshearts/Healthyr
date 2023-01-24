<?php

namespace App\Models\Mysql\Common;

use Auth;

class AnalyteRange extends Base 
{
    public $table = 'analyte_ranges';



    const PROPERTIES = [
        [
            'key' => 'analyte_id',
            'type' => 'MODEL_ID',
            'class' => Analyte::class
        ],
        [
            'key' => 'gender',
            'type' => 'ENUM',
            'options' => ['M', 'F', 'O'] // M - Male, F - Female, O - Other
        ],
        [
            'key' => 'pregnant',
            'type' => 'BOOLEAN'
        ],
        [
            'key' => 'age_min_months',
            'type' => 'INTEGER',
            'min' => 0
        ],
        [
            'key' => 'age_max_months',
            'type' => 'INTEGER',
            'min' => 0,
            'nullable' => true
        ],
        [
            'key' => 'report_min',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'low_min',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'healthy_min',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'healthy_max',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'high_max',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'report_max',
            'type' => 'FLOAT',
            'nullable' => true
        ]
    ];
}
