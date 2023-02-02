<?php

namespace App\Models\Mysql\Common;

use Auth;

class AnalyteRangeEffect extends Base 
{
    public $table = 'analyte_range_effects';

    const SEARCH_PARAMETERS = [
        [
            'column' => 'analyte_range_id',
            'argument' => 'analyte_range_id',
            'type' => 'EQUAL'  
        ],
        [
            'column' => 'active',
            'argument' => 'active', 
            'type' => 'EQUAL',
            'default' => 1
        ]
    ];

    const PROPERTIES = [
        [
            'key' => 'analyte_range_id',
            'type' => 'MODEL_ID',
            'class' => AnalyteRange::class
        ],
        [
            'key' => 'min',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'max',
            'type' => 'FLOAT',
            'nullable' => true
        ],
        [
            'key' => 'effect',
            'type' => 'TEXT',
            
        ],
    ];
}


