<?php

namespace App\Models\Mysql\Admin;

use App\Models\Mysql;

class Base extends Mysql\Common\Base
{
    const CLASS_MAP = [
        'test' => Mysql\Common\Test::class,
        'testanalyte' => Mysql\Common\TestAnalyte::class,
        'analyte' => Mysql\Common\Analyte::class,
        'analyterange' => Mysql\Common\AnalyteRange::class,
        'analyterangeaffect' => Mysql\Common\AnalyteRangeAffect::class,
	];
}   
