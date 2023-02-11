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


        
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('key')->index();
            $table->string('name')->index();
            $table->timestamps();
        });

          
        Schema::create('analytes', function (Blueprint $table) {
            $table->id();
            $table->string('key')->index();
            $table->string('name')->index();
            $table->string('unit_of_measure');
            $table->string('description', 2048);
            $table->timestamps();
        });

        Schema::create('test_analytes', function (Blueprint $table) {
            $table->id();
            $table->integer('test_id')->index();
            $table->integer('analyte_id')->index();
            $table->timestamps();
        });

        Schema::create('analyte_ranges', function (Blueprint $table) {
            $table->id();
            $table->integer('analyte_id')->index();
            $table->string('gender')->index();
            $table->boolean('pregnant')->index();
            $table->integer('age_min_months');
            $table->integer('age_max_months')->nullable();
            $table->decimal('report_min', 8, 2)->nullable();
            $table->decimal('low_min', 8, 2)->nullable();
            $table->decimal('healthy_min', 8, 2)->nullable();
            $table->decimal('healthy_max', 8, 2)->nullable();
            $table->decimal('high_max', 8, 2)->nullable();
            $table->decimal('report_max', 8, 2)->nullable();
            $table->timestamps();
        });
        
        Schema::create('analyte_range_effects', function (Blueprint $table) {
            $table->id();
            $table->integer('analyte_range_id')->index();
            $table->decimal('min', 8, 2)->nullable();
            $table->decimal('max', 8, 2)->nullable();
            $table->string('effect', 2048);
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
