<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class KenyaAdministrativeUnitsSeeder extends Seeder
{
    public function run()
    {
        $path = database_path('seeders/data/csv-Kenya-Counties-Constituencies-Wards.csv');
        $file = fopen($path, 'r');

        // Skip the header row
        fgetcsv($file);

        while (($data = fgetcsv($file)) !== false) {
            list($countyCode, $countyName, $constituencyCode, $constituencyName, $wardCode, $wardName) = $data;

            // Insert or retrieve the county
            DB::table('counties')->updateOrInsert(
                ['county_code' => $countyCode],
                ['county_name' => $countyName, 'updated_at' => now(), 'created_at' => now()]
            );

            // Retrieve the county ID
            $countyId = DB::table('counties')->where('county_code', $countyCode)->value('id');

            // Insert or retrieve the constituency
            DB::table('constituencies')->updateOrInsert(
                ['constituency_code' => $constituencyCode],
                ['constituency_name' => $constituencyName, 'county_id' => $countyId, 'updated_at' => now(), 'created_at' => now()]
            );

            // Retrieve the constituency ID
            $constituencyId = DB::table('constituencies')->where('constituency_code', $constituencyCode)->value('id');

            // Insert or retrieve the ward
            DB::table('wards')->updateOrInsert(
                ['ward_code' => $wardCode],
                ['ward_name' => $wardName, 'constituency_id' => $constituencyId, 'updated_at' => now(), 'created_at' => now()]
            );
        }

        fclose($file);

        // ===  ===  ===  ===  ===  ===  ===  ===  ===  =
        // Manually add KAVISUNI and location
        // ===  ===  ===  ===  ===  ===  ===  ===  ===  =

        $wardId = 350;

        // Check if the ward exists
        if (DB::table('wards')->where('id', $wardId)->exists()) {
            // Insert or retrieve the KAVISUNI location
            DB::table('locations')->updateOrInsert(
                ['location_code' => 1],
                [
                    'location_name' => 'KAVISUNI',
                    'ward_id' => $wardId
                ]
            );
        }
    }
}
