

let mix = require('laravel-mix');

mix.js(['resources/js/views/admin/index'], 'public/global/assets/js/views/admin.min.js');
mix.js(['resources/js/views/authentication/index'], 'public/global/assets/js/views/authentication.min.js');
mix.js(['resources/js/views/portal/index'], 'public/global/assets/js/views/portal.min.js');