<?php

namespace App\Models\Mysql\Common;

use Auth;

class Organ extends Base 
{
    public $table = 'organs';

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
        
    ];
}
