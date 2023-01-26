<?php

namespace App\Models\Mysql\Common;

use App\Common\Functions;

use Auth;

class PlatformUserKit extends Base 
{
    public $table = 'platform_user_kits';

    const PANEL_DIABETES = 'diabetes_panel';

    public function getResultPdfUrl() {
        return Functions::getHost() . '/api/platform/user/' . $this->platform_user_id . '/kit/' . $this->id . '/result.pdf';
    }
}
