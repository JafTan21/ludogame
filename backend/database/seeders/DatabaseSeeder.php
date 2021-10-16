<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name' => 'def admin',
            'email' => 'create-admin@gmail.com',
            'password' => Hash::make('create-admin@gmail.com'),
            'is_admin' => true,
        ]);

        User::create([
            'name' => 'tanvir',
            'email' => 'tanvir@gmail.com',
            'password' => Hash::make('tanvir@gmail.com'),
        ]);
    }
}