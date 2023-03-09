<!DOCTYPE html>
<html style='height:100%' lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="{{env('APP_FAVICON', '/global/assets/images/branding/favicon.png')}}">
        <title>Healthyr</title>
		<link rel="stylesheet" type="text/css" href="/global/assets/fonts/font-awesome/all.min.css">
        <link href="/global/assets/fonts/fontawesome-free/css/fontawesome.css" rel="stylesheet">
        <link href="/global/assets/fonts/fontawesome-free/css/brands.css" rel="stylesheet">
        <link href="/global/assets/fonts/fontawesome-free/css/solid.css" rel="stylesheet">
        @include ('/styles/base')
    </head>
    <body style='margin:0px;display:flex;height:100%;width:100%;'>
        <div style='flex:1;display:flex;height:100%;max-width:100%;max-height:100%' id='healthyr'></div>
		<script src="/global/assets/js/views/authentication.min.js"></script>  
    </body>
</html>
    