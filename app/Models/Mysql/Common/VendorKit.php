<?php

namespace App\Models\Mysql\Common;

use Auth;

class VendorKit extends Base 
{
    public $table = 'vendor_kits';

    const SEARCH_PARAMETERS = [
        [
            'column' => 'analyte_id',
            'argument' => 'analyte_id',
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
            'class' => VendorKit::class
        ],
        [
            'key' => 'vendor_id',
            'type' => 'INTEGER',
            
        ],
        [
            'key' => 'masterpack_id',
            'type' => 'INTEGER'
        ],
        [
            'key' => 'kit_id',
            'type' => 'TEXT',
            
        ],
        [
            'key' => 'active',
            'type' => 'INTEGER',
           
        ],
       
    ];

}
