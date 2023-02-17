<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('kit_batches', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('unit_of_measure');
            $table->string('description', 2048);
            $table->string('vendor_id')->index();
            $table->boolean('active')->index()->default(1);
            $table->timestamps();
        });

        Schema::create('user_kits', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->index();
            $table->string('kit_id')->index();
            $table->string('vendor_id')->index();
            $table->string('result_file_id');
            $table->boolean('hubspot_synced')->index()->default(0);
            $table->boolean('active')->index()->default(1);
            $table->timestamps();
        });
        

        Schema::table('users', function (Blueprint $table) {
            $table->string('platform_user_id')->index()->after('id');
            $table->string('patient_id')->index()->after('platform_user_id');
            $table->datetime('date_of_birth')->index()->nullable()->default(null)->after('salt');
            $table->string('gender')->index()->after('date_of_birth');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('batch_and_link_vendor');
    }
};


//add kit batches
//id
//name
//batch info
//vendor id
//active

//add vendor to platform user

//platform_kits add batch ID