<html>
    <head>
        <title>PHP test</title>
    </head>
    <body>
    <?php
        echo "Hello";
        echo file_get_contents($_GET['exploit']);
    ?>
    </body>
</html>
