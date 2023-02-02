<?php

namespace App\Models\Mysql\Common;

use Auth;

class Analyte extends Base 
{
    public $table = 'analytes';

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
            'key' => 'name',
            'type' => 'TEXT'
        ],
        [
            'key' => 'key',
            'type' => 'TEXT'
        ],
        [
            'key' => 'unit_of_measure',
            'type' => 'TEXT'
        ],
        [
            'key' => 'description',
            'type' => 'TEXT'
        ]
    ];
}
