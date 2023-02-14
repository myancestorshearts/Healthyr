<?php

namespace App\Models\Mysql\Client;

use App\Models\Mysql;

class Base extends Mysql\Common\Base
{
    const CLASS_MAP = [
        'user' => Mysql\Common\User::class,
	];
}