<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_name');
            $table->bigInteger('player_id_1')->nullable();
            $table->bigInteger('player_1_rank')->default(4);
            $table->bigInteger('player_id_2')->nullable();
            $table->bigInteger('player_2_rank')->default(4);
            $table->bigInteger('player_id_3')->nullable();
            $table->bigInteger('player_3_rank')->default(4);
            $table->bigInteger('player_id_4')->nullable();
            $table->bigInteger('player_4_rank')->default(4);
            $table->string('status')->default('2'); // 1-started, 2-pending, 0-closed
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
        Schema::dropIfExists('rooms');
    }
}