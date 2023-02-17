<?php

namespace App\Models\Mysql\Common;

use Auth;

class Vendor extends Base 
{
    public $table = 'vendors';

    const PROPERTIES = [
        [
            'key' => 'id',
            'type' => 'MODEL_ID',
            'class' => Vendor::class
        ],
        [
            'key' => 'name',
            'type' => 'TEXT'
        ],
        [
            'key' => 'contact_name',
            'type' => 'TEXT',
            
        ],
        [
            'key' => 'contact_email',
            'type' => 'TEXT',
            
        ],
        [
            'key' => 'contact_phone',
            'type' => 'TEXT',
            
        ],
       
    ];
}
