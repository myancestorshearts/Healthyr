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
        Schema::table('analytes', function (Blueprint $table) {
            //
            $table->string('type')->after('name')->default('RANGE');
            $table->string('binary_false_effect')->after('description')->default('');
            $table->string('binary_true_effect')->after('binary_false_effect')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('analytes', function (Blueprint $table) {
            //
        });
    }
};
