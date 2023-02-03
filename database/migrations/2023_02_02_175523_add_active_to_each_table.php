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
        Schema::table('tests', function (Blueprint $table) {
            //
            $table->boolean('active')->after('name')->default(1);
        });
        Schema::table('analytes', function (Blueprint $table) {
            //
            $table->boolean('active')->after('description')->default(1);
        });
        Schema::table('analyte_ranges', function (Blueprint $table) {
            //
            $table->boolean('active')->after('report_max')->default(1);
        });
    Schema::table('analyte_range_effects', function (Blueprint $table) {
            //
            $table->boolean('active')->after('affect')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('each', function (Blueprint $table) {
            //
        });
    }
};
