<?php


class SeedSchoolsTable extends Seeder
{

	public function run()
	{
		DB::table('schools')->delete();

		DB::table('schools')->insert(array(
			array('name' => 'ITU'),
			array('name' => 'KU'),
			array('name' => 'DTU'),
			array('name' => 'RUC'),
			array('name' => 'AAU'),
			array('name' => 'CBS')
		));
	}
}
