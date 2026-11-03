<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();

            // Content
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category')->default('Forms')->index();

            // File metadata
            // Relative path on the "public" disk, e.g. "documents/form-1.pdf".
            $table->string('file_path');
            $table->string('file_type', 20)->default('pdf');
            $table->string('file_size', 20)->nullable();
            $table->string('version', 20)->nullable();

            // Stats
            $table->unsignedBigInteger('download_count')->default(0);

            // Presentation
            $table->boolean('is_featured')->default(false);
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->boolean('is_published')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('downloads');
    }
};