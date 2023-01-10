<?php

namespace App\Models\Mysql\Common;

use Auth;

class Test extends Base 
{
    public $table = 'tests';

    const PROPERTIES = [
        [
            'key' => 'name',
            'type' => 'TEXT'
        ],
        [
            'key' => 'key',
            'type' => 'TEXT'
        ]
    ];
}
