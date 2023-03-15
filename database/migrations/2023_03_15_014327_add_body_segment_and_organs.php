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
        Schema::create('body_segments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active');
            $table->timestamps();
        });

        Schema::create('organs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active');
            $table->timestamps();
        });

        Schema::create('organ_analyte', function (Blueprint $table) {
            $table->id();
            $table->integer('organ_id');
            $table->integer('analyte_id');
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
