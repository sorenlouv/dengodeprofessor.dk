<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ratings', function($t) {
				$t->increments('id');
				$t->bigInteger('user_id');
				$t->integer('teacher_id')->unsigned();
				$t->integer('score');

				// created_at, updated_at DATETIME
				$t->timestamps();

				// Indexes
				$t->unique(array('user_id', 'teacher_id'));

				// foreign keys
				$t->foreign('user_id')->references('id')->on('users');
				$t->foreign('teacher_id')->references('id')->on('teachers');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ratings');
	}

}
