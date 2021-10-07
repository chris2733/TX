let mix = require('laravel-mix');

mix.disableNotifications();

mix.js('js/main.js', 'public/js')
    .sass('sass/main.scss', 'public/css')
    .options({processCssUrls: false})
    .sourceMaps(true, 'source-map');