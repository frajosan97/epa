<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Table: counties - Stores all counties
        Schema::create('counties', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('county_code', 10)->unique();
            $table->string('county_name');
            $table->timestamps();
        });

        // Table: constituencies - Stores constituencies mapped to counties
        Schema::create('constituencies', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('county_id')
                ->constrained('counties')
                ->onDelete('cascade');
            $table->string('constituency_code', 10)->unique();
            $table->string('constituency_name');
            $table->timestamps();
        });

        // Table: wards - Stores wards mapped to constituencies
        Schema::create('wards', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('constituency_id')
                ->constrained('constituencies')
                ->onDelete('cascade');
            $table->string('ward_code', 10)->unique();
            $table->string('ward_name');
            $table->timestamps();
        });

        // Table: locations - Stores locations mapped to wards
        Schema::create('locations', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('ward_id')
                ->constrained('wards')
                ->onDelete('cascade');
            $table->string('location_code', 10)->unique();
            $table->string('location_name');
            $table->timestamps();
        });

        // Table: users - Main user table with relationships to geographical tables
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('id_number')->unique();
            $table->string('sir_name');
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob');
            $table->string('sex');
            $table->string('ethnicity');
            $table->json('membership_categories');
            $table->string('pwd_number')->nullable();
            $table->string('reside_in_kenya');
            $table->string('country_of_residence')->nullable();
            $table->string('religion');

            // Geographical relationships
            $table->foreignId('county_id')->constrained('counties')->onDelete('cascade');
            $table->foreignId('constituency_id')->constrained('constituencies')->onDelete('cascade');
            $table->foreignId('ward_id')->constrained('wards')->onDelete('cascade');
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('cascade');

            $table->enum('prefered_channel', ['phone', 'email']);
            $table->string('phone')->unique()->nullable();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('privacy_acceptance');
            $table->string('status')->default('pending');
            $table->rememberToken();
            $table->timestamps();
        });

        // Table: password_reset_tokens - For password resets
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Table: sessions - User session management
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('wards');
        Schema::dropIfExists('constituencies');
        Schema::dropIfExists('counties');
    }
};
