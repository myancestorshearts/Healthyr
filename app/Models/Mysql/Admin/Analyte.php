<?php

namespace App\Models\Mysql\Admin;

use Auth;

use App\Models\Mysql\Common\Analyte as CommonAnalyte;

class Analyte extends CommonAnalyte 
{
    public static function applyFilters($request, &$query)
    {
        if ($request->has('test_id')) {
            $query->join('test_analytes', 'test_analytes.analyte_id', '=', 'analytes.id')
                ->where('test_analytes.test_id', '=', $request->get('test_id'));
        }
        return parent::applyFilters($request, $query);
    }
}
