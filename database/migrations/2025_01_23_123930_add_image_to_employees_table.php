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
        Schema::table('employees', function (Blueprint $table) {
            if (!Schema::hasColumn('employees', 'images')) {
                $table->string('images')->nullable();
            }
            // Drop unnecessary columns
            if (Schema::hasColumn('employees', 'image_path')) {
                $table->dropColumn('image_path');
            }
            if (Schema::hasColumn('employees', 'photo')) {
                $table->dropColumn('photo');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            if (Schema::hasColumn('employees', 'images')) {
                $table->dropColumn('images');
            }
            // Add back the dropped columns
            if (!Schema::hasColumn('employees', 'image_path')) {
                $table->string('image_path')->nullable();
            }
            if (!Schema::hasColumn('employees', 'photo')) {
                $table->string('photo')->nullable();
            }
        });
    }
};
