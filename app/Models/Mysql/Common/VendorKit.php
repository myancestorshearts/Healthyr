<?php

namespace App\Models\Mysql\Common;

use Auth;

class VendorKit extends Base 
{
    public $table = 'vendor_kits';

    const SEARCH_PARAMETERS = [
        [
            'column' => 'vendor_id',
            'argument' => 'vendor_id',
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
            'key' => 'vendor_id',
            'type' => 'MODEL_ID',
            'class' => Vendor::class
        ],
       
    ];

}
