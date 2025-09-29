<?php

use App\Models\Cabin;
use App\Models\Guest;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->integer('num_nights');
            $table->integer('num_guests');
            $table->float('cabin_price');
            $table->float('extras_price');
            $table->float('total_price');
            $table->string('status');
            $table->boolean('has_breakfast');
            $table->boolean('is_paid')->default(false);
            $table->text('observation');
            $table->foreignIdFor(Cabin::class);
            $table->foreignIdFor(Guest::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
