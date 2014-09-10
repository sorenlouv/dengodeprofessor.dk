<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeachersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('teachers', function($t) {
				$t->increments('id');
				$t->integer('school_id')->unsigned();
				$t->string('name');
				$t->boolean('approved');

				// created_at, updated_at DATETIME
				$t->timestamps();

				// foreign keys
				$t->foreign('school_id')->references('id')->on('schools');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('teachers');
	}

}
