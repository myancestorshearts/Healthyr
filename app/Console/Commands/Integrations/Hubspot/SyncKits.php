<?php
namespace App\Console\Commands\Integrations\Hubspot;

use Illuminate\Console\Command;

use App\Common;
use App\Libraries;

use App\Models\Mysql;

class SyncKits extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'integrations:hubspot:synckits';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Custom script';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {  

        $kit_registrations = Mysql\Common\PlatformUserKit::where('hubspot_synced', '=', 0)->get();
        
        $hubspot = new Libraries\HubSpot;

        $index = 0;
        $count = count($kit_registrations);
        foreach ($kit_registrations as $kit_registration) {
            echo ++$index . ' / ' . $count;

            $platform_user = Mysql\Common\PlatformUser::where('platform_user_id', '=', $kit_registration->platform_user_id)->limit(1)->get()->first();
            if (isset($platform_user)) {
                $hubspot_client = $hubspot->getClient($platform_user);
                
                $spot = new Libraries\Spot;
                $kit_information = $spot->getKit($kit_registration->kit_id);
                $kit_type = '-';
                if (isset($kit_information->data['kit'])) $kit_type = $kit_information->data['kit']->type;
                $vendor_name = '-';
                $vendor = Mysql\Common\Vendor::join('vendor_kits', 'vendor_kits.vendor_id', '=', 'vendors.id')->where('vendor_kits.kit_id', '=', $kit_registration->kit_id)->limit(1)->get()->first();

                if (isset($vendor)) {
                    $vendor_name = $vendor->name;
                }

                $hubspot->addKitRegistrationEvent($platform_user->email, $kit_registration->kit_id, $kit_type, $vendor_name, strtotime($kit_registration->created_at));
            }

            $kit_registration->hubspot_synced = 1;
            $kit_registration->save();
            echo "\n";
        }
    
    }
}   
