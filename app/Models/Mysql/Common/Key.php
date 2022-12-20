<?php

namespace App\Models\Mysql\Common;

use Auth;

class Key extends Base 
{
    public $table = 'keys';

    const TYPE_HUBSPOT = 'HUBSPOT';
}
