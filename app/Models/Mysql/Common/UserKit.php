<?php

namespace App\Models\Mysql\Common;

use App\Common\Functions;

use Auth;

class UserKit extends Base 
{
    public $table = 'user_kits';

    const PANEL_DIABETES = 'diabetes_panel';

    public function getResultPdfUrl() {
        return Functions::getHost() . '/api/platform/user/' . $this->user_id . '/kit/' . $this->id . '/result.pdf';
    }
}
