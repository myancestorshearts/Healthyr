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
        //
        Schema::create('platform_users', function (Blueprint $table) {
            $table->id();
            $table->string('platform_user_id')->index();
            $table->string('patient_id')->index();
            $table->string('first_name')->index();
            $table->string('last_name')->index();
            $table->string('date_of_birth')->index();
            $table->string('phone')->index();
            $table->string('gender')->index();
            $table->boolean('active')->index();
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
