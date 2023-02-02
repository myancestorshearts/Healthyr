<?php

namespace App\Models\Mysql\Common;

use Auth;

class Test extends Base 
{
    public $table = 'tests';

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
            'key' => ' ',
            'type' => 'TEXT'
        ]
    ];
}
