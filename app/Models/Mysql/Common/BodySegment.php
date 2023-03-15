<?php

namespace App\Models\Mysql\Common;

use Auth;

class BodySegment extends Base 
{
    public $table = 'body_segments';

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
