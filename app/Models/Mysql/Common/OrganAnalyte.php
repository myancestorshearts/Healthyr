<?php

namespace App\Models\Mysql\Common;

use Auth;

class OrganAnalyte extends Base 
{
    public $table = 'organ_analyte';

    const SEARCH_PARAMETERS = [
        [
            'column' => 'active',
            'argument' => 'active', 
            'type' => 'EQUAL',
            'default' => 1
        ]
    ];

    const PROPERTIES = [
        [
            'key' => 'organ_id',
            'type' => 'MODEL_ID',
            'class' => Organ::class
        ],
        [
            'key' => 'analyte_id',
            'type' => 'MODEL_ID',
            'class' => Analyte::class
        ],
        
    ];
}
