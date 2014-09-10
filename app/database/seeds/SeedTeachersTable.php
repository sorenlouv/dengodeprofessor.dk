<?php


class SeedTeachersTable extends Seeder
{

	public function run()
	{
		DB::table('teachers')->delete();

		$itu_id = DB::table('schools')->select('id')->where('name', 'ITU')->first()->id;
		$cbs_id = DB::table('schools')->select('id')->where('name', 'CBS')->first()->id;

		DB::table('teachers')->insert(array(
			array(
				'school_id' => $cbs_id,
				'name' => 'Tamas Vermosi',
				'approved' => true
			),
			array(
				'school_id' => $itu_id,
				'name' => 'Lene Pries-Heje',
				'approved' => true
			),
			array(
				'school_id' => $itu_id,
				'name' => 'Laura Watts',
				'approved' => true
			)
		));
	}
}
