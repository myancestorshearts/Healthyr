<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Services;

use App;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //

        App::bind('apiauth', function() {
            return new Services\ApiAuth;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        
    }
}
