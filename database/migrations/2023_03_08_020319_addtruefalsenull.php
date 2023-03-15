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
        // Schema::table('analytes', function($table)
        // {
        //     $table->string('binary_false_effect')->nullable()->default(null)->change();
        //     $table->string('binary_true_effect')->nullable()->default(null)->change();
        //     $table->string('unit_of_measure')->nullable()->default(null)->change();

        // });
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
