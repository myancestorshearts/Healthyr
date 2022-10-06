<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

use Auth;

class PlatformUserKit extends Model 
{
    public $table = 'platform_user_kits';

    const PANEL_DIABETES = 'diabetes_panel';
}
