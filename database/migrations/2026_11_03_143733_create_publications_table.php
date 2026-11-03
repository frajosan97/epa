<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();

            // Type / classification
            $table->string('type')->default('public-notice'); // public-notice, press-release, circular, statement
            $table->string('reference_no')->nullable()->unique(); // optional doc reference e.g. EPA/PN/2025/001

            // Headline metadata
            $table->string('title');
            $table->string('subtitle')->nullable();   // e.g. "EXPANSION OF EPA COUNTY OFFICES ACROSS KENYA"
            $table->string('organization')->default('Economic Patriotic Alliance (EPA)');

            // Body
            $table->longText('body');                 // main content (HTML or plain text)
            $table->text('summary')->nullable();      // short teaser for listings

            // Issuer / signatory
            $table->string('issued_by')->nullable();           // "Economic Patriotic Alliance (EPA)"
            $table->string('signatory_name')->nullable();      // "David M. Sunduah"
            $table->string('signatory_title')->nullable();     // "Secretary General"
            $table->string('tagline')->nullable();             // "A Strong Economy, A United People..."

            // Presentation
            $table->string('image')->nullable();      // optional cover image
            $table->string('file_path')->nullable();  // optional PDF attachment
            $table->string('location')->nullable();   // place issued (e.g. Nairobi)

            // Publishing
            $table->timestamp('published_at')->nullable()->index();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};