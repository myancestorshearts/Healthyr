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
        Schema::create('advertisments', function (Blueprint $table) {
            
            $table->id('id');
            $table->string('type')->index();
            $table->string('title');
            $table->string('description');
            $table->string('link_text');
            $table->string('link');
            $table->string('image_file_id');
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
