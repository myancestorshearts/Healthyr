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
        Schema::create('vendors', function (Blueprint $table) {
            
            $table->id('id');
            $table->string('name');
            $table->string('contact_name')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->boolean('active');
            $table->timestamps();

        });
        Schema::create('vendor_kits', function (Blueprint $table) {
            
            $table->id('id');
            $table->integer('vendor_id')->index();
            $table->string('masterpack_id')->nullable()->index();
            $table->string('kit_id')->index();
            $table->boolean('active');
            $table->timestamps();

        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
