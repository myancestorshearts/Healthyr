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

        Schema::create('email_links', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('external_id');
            $table->boolean('active');
            $table->timestamps();
        });

        Schema::create('email_link_codes', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('external_id');
            $table->string('code');
            $table->datetime('expire');
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
