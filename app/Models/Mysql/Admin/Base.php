<?php

namespace App\Models\Mysql\Admin;

use App\Models\Mysql;

class Base extends Mysql\Common\Base
{
    const CLASS_MAP = [
        'test' => Mysql\Common\Test::class,
        'testanalyte' => Mysql\Common\TestAnalyte::class,
        'analyte' => Mysql\Admin\Analyte::class,
        'analyterange' => Mysql\Common\AnalyteRange::class,
        'analyterangeeffect' => Mysql\Common\AnalyteRangeEffect::class,
        'advertisment' => Mysql\Common\Advertisment::class,
        'vendor' => Mysql\Common\Vendor::class,
        'vendorkit' => Mysql\Common\VendorKit::class
	];
}