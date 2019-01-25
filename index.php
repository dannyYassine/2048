<?php
$directory = '/2048/src/website/public';
?>

<!DOCTYPE html>
<html lang="en" ng-app="twentyFortyEight">
<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="7Av-pmwFq0pu5Kv0iSFichAIDu1Q4N75kpcAXRjGHog" />
    <title>2048</title>
    <link rel="stylesheet" href="<?=$directory?>/css/main.css"/>
    <link rel="stylesheet" href="<?=$directory?>/css/fontawesome-all.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/2048/">
</head>
<body>
<app></app>
<script src="<?=$directory?>/js/bundle.js" type="text/javascript"></script>

<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-111413894-2', 'auto');
    ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
</body>
</html>